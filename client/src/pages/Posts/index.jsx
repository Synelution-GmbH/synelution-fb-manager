import React, { useEffect, useMemo, useState } from 'react';
import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  makeStyles,
  TextField,
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
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import { NotifyProofreaderBtn } from './NotifyProofreaderBtn';

dayjs.extend(customParseFormat);
dayjs.locale('de');

const formatDateUrl = ({ from, to, client, type }) =>
  `/${client}/posts/${type}/from/${from}/to/${to}`;

const useStyles = makeStyles((theme) => ({
  toolbar: { paddingLeft: '0px', paddingRight: '0' },
  ml: {
    marginLeft: theme.spacing(1),
    maxWidth: '140px',
  },
  mr: {
    marginRight: theme.spacing(1),
  },
  toggleButton: {
    background: '',
    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
    '&.Mui-selected': {
      color: '#fff',
      '&[value="fb"]': {
        background: theme.palette.fb,
      },
      '&[value="ig"]': {
        background: theme.palette.ig,
      },
    },
  },
}));

const Posts = () => {
  const { pathname } = useLocation();
  const history = useHistory();
  const params = useParams();
  let dateParams = useRouteMatch('/:client/posts/:type/from/:from/to/:to');
  const [value, setValue] = useState([null, null]);
  const [date, setDate] = useState([null, null]);
  const [dateInterval, setDateInteral] = useState(7);
  const [type, setType] = useState(params.type);

  const classes = useStyles();

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

  useEffect(() => {
    if (type === params.type) return;
    const [from, to] = date;
    const url = formatDateUrl({
      ...params,
      type,
      from,
      to,
    });

    if (pathname === url) return;
    history.push(url);
  }, [type]);

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
      <div
        style={{ position: 'sticky', top: 0, zIndex: 100, background: '#fafafa' }}
      >
        <Container maxWidth="lg">
          <Box pt={2} pb={2} clone>
            <Toolbar className={classes.toolbar}>
              <Grid container justify="space-between">
                <Grid container style={{ flexGrow: 1, width: 'auto' }}>
                  <ToggleButtonGroup
                    className={classes.mr}
                    value={type}
                    exclusive
                    onChange={(e, newType) => {
                      if (e.target.value === type) return;
                      setType(newType);
                    }}
                  >
                    <ToggleButton className={classes.toggleButton} value="fb">
                      <AwesomeIcon prefix="fab" icon="facebook" />
                    </ToggleButton>
                    <ToggleButton className={classes.toggleButton} value="ig">
                      <AwesomeIcon prefix="fab" icon="instagram" />
                    </ToggleButton>
                  </ToggleButtonGroup>
                  <DatePicker
                    value={value}
                    handleClose={handleClose}
                    setValue={setValue}
                  />
                  <TextField
                    className={classes.ml}
                    value={dateInterval}
                    variant="outlined"
                    label="Post Interval"
                    type="number"
                    onChange={(e) => setDateInteral(e.target.value)}
                  />
                </Grid>
                <NotifyProofreaderBtn data={{ url: pathname }} />
              </Grid>
            </Toolbar>
          </Box>
        </Container>
      </div>
      <Box clone p={2}>
        <Container maxWidth="lg">
          {date[0] && date[1] ? (
            <PostList
              dateInterval={dateInterval}
              from={date[0]}
              to={date[1]}
              {...params}
            />
          ) : (
            <></>
          )}
        </Container>
      </Box>
    </LocalizationProvider>
  );
};

const PostList = ({ dateInterval, from, to, client, type }) => {
  const [warning, setWarning] = useState({ toggle: false, text: '' });
  const cache = useQueryCache();
  const QUERY = useMemo(() => ['posts', { client, type, from, to }], [
    client,
    type,
    from,
    to,
  ]);

  const { isLoading, data } = useQuery(
    QUERY,
    getPosts
    // { refetchOnWindowFocus: false }
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
      cache.setQueryData(QUERY, (old) => [...old, data]);
    },
    onSuccess: (data) => {
      const posts = cache.getQueryData(QUERY);
      cache.setQueryData(QUERY, (old) => {
        // return [...old, data];
        return [...old.slice(0, old.length - 1), data];
      });
    },
  });

  const [removePost] = useMutation(deletePost, {
    onMutate: (id) => {
      const previousValue = cache.getQueryData(QUERY);
      cache.setQueryData(QUERY, (old) => {
        return old.filter((item) => item._id !== id);
      });
      return previousValue;
    },
    onSettled: () => {
      cache.invalidateQueries(QUERY);
    },
    onError: (err, variables, previousValue) =>
      cache.setQueryData(QUERY, previousValue),
  });

  if (isLoading) return null;

  const handleAddPost = () => {
    const lastPost =
      data.length > 0
        ? data.sort((a, b) => a.date - b.date)[data.length - 1]
        : null;
    console.log(data);
    const dateFrom = lastPost
      ? dayjs(lastPost.date).add(dateInterval, 'days')
      : dayjs(from, FORMAT);
    let newDate = dateFrom.valueOf();
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
                  QUERY={QUERY}
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
