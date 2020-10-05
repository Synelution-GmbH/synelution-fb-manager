import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Container,
  Grid,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { useHistory, useLocation, useParams, useRouteMatch } from 'react-router';
import dayjs from 'dayjs';
import DayjsUtils from '@material-ui/pickers/adapter/dayjs';
import 'dayjs/locale/de';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { LocalizationProvider } from '@material-ui/pickers';
import { DatePicker } from './DatePicker';
import { Post } from './Post';
import { useMutation, useQuery, useQueryCache } from 'react-query';
import { FORMAT } from 'config';
import { AwesomeIcon } from 'ui/components/Icons/Icon';
import { getPosts, createPost, deletePost } from 'services';
import { PostSkeleton } from './PostSkeleton';
import { MessageBox } from './MessageBox';

dayjs.extend(customParseFormat);
dayjs.locale('de');

const formatDateUrl = ({ from, to, client, type }) =>
  `/${client}/posts/${type}/from/${from}/to/${to}`;

const Posts = () => {
  const { pathname } = useLocation();
  const history = useHistory();
  const params = useParams();
  let dateParams = useRouteMatch('/:client/posts/:type/from/:from/to/:to');
  const [value, setValue] = useState([null, null]);
  const [date, setDate] = useState([null, null]);

  useEffect(() => {
    // set date from URL
    if (dateParams) {
      const { to, from } = dateParams.params;
      setDate([from, to]);
      return setValue([dayjs(from, FORMAT), dayjs(to, FORMAT)]);
    }

    const from = dayjs().startOf('month').format(FORMAT);
    const to = dayjs().endOf('month').format(FORMAT);
    setDate([from, to]);
    setValue([dayjs(from, FORMAT), dayjs(to, FORMAT)]);
  }, [pathname]);

  const handleClose = () => {
    const [vFrom, vTo] = value;
    const url = formatDateUrl({
      ...params,
      from: dayjs(vFrom).format(FORMAT),
      to: dayjs(vTo).format(FORMAT),
    });

    if (pathname === url) return;
    history.push(url);
  };

  if (!value) return null;
  return (
    <LocalizationProvider
      dateLibInstance={dayjs}
      dateAdapter={DayjsUtils}
      locale="de"
    >
      <Container maxWidth="lg">
        <Box p={2} pt={4} clone>
          <Toolbar>
            <Grid container justify="space-between">
              <DatePicker
                value={value}
                handleClose={handleClose}
                setValue={setValue}
              />
            </Grid>
          </Toolbar>
        </Box>
      </Container>

      <Box clone p={2}>
        <Container maxWidth="lg">
          {date[0] && date[1] ? (
            <PostList from={date[0]} to={date[1]} {...params} />
          ) : (
            <></>
          )}
        </Container>
      </Box>
    </LocalizationProvider>
  );
};

const PostList = ({ from, to, client, type }) => {
  const [dateInterval, setDateInteral] = useState(7);
  const [warning, setWarning] = useState({ toggle: false, text: '' });
  const cache = useQueryCache();
  const { isLoading, data } = useQuery(
    ['posts', { client, type, from, to }],
    getPosts,
    { refetchOnWindowFocus: false }
  );

  const [addPost] = useMutation(createPost, {
    // onMutate: (data) => {
    //   console.log(data);
    //   cache.setQueryData(['posts', { client, type, from, to }], (old) => [
    //     ...old,
    //     { ...data, _id: `temp-${data.date}` },
    //   ]);
    // },
    onMutate: () => {
      cache.setQueryData(['posts', { client, type, from, to }], (old) => [
        ...old,
        data,
      ]);
    },
    onSuccess: (data) => {
      const posts = cache.getQueryData(['posts', { client, type, from, to }]);
      cache.setQueryData(['posts', { client, type, from, to }], (old) => {
        // return [...old, data];
        return [...old.slice(0, old.length - 1), data];
      });
    },
  });
  const [removePost] = useMutation(deletePost, {
    onMutate: (id) => {
      const previousValue = cache.getQueryData('todos');
      cache.setQueryData(['posts', { client, type, from, to }], (old) => {
        return old.filter((item) => item._id !== id);
      });
      return previousValue;
    },
    onSettled: () => {
      cache.invalidateQueries(['posts', { client, type, from, to }]);
    },
    onError: (err, variables, previousValue) =>
      cache.setQueryData('todos', previousValue),
  });

  if (isLoading) return null;

  const handleAddPost = () => {
    const lastPost = data[data.length - 1];
    const dateFrom = lastPost ? dayjs(lastPost.date) : dayjs(from, FORMAT);
    let newDate = dateFrom.add(dateInterval, 'days').valueOf();
    if (newDate.valueOf() > dayjs(to, FORMAT).valueOf())
      return setWarning({
        toggle: !warning.toggle,
        text:
          'Das automatisch ausgewählte Datum hat die filtergrenze überschritten bitte Ändern Sie den Interval oder den Datum-Filter!',
      });
    addPost({
      date: newDate,
      client,
      type,
      budget: 0,
    });
  };

  return (
    <>
      {data && data.length > 0 ? (
        data
          .sort((a, b) => a.date - b.date)
          .map(({ _id, date, ...props }, i) =>
            _id ? (
              <Box mt={2} key={_id}>
                <Post
                  removePost={removePost}
                  {...props}
                  id={_id}
                  date={dayjs(date)}
                />
              </Box>
            ) : (
              <PostSkeleton key={i} />
            )
          )
      ) : (
        <Typography>No Posts found for this filter!</Typography>
      )}
      <Box mt={2}>
        <Button
          color="primary"
          variant="contained"
          size="large"
          onClick={handleAddPost}
          startIcon={<AwesomeIcon icon="plus" style={{ fontSize: '100%' }} />}
        >
          Add Post
        </Button>
      </Box>
      <MessageBox {...warning} />
    </>
  );
};

export default Posts;
