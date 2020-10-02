import React, { useEffect, useState } from 'react';
import { Box, Container, Grid, Toolbar } from '@material-ui/core';
import { useHistory, useLocation, useParams, useRouteMatch } from 'react-router';
import dayjs from 'dayjs';
import DayjsUtils from '@material-ui/pickers/adapter/dayjs';
import 'dayjs/locale/de';
import { LocalizationProvider } from '@material-ui/pickers';
import { DatePicker } from './DatePicker';
import { Post } from './Post';

dayjs.locale('de');

const FORMAT = 'DD-MM-YYYY';
const formatDateUrl = ({ from, to, customer, type }) =>
  `/${customer}/posts/${type}/from/${from}/to/${to}`;

const Posts = () => {
  const { pathname } = useLocation();
  const history = useHistory();
  const params = useParams();
  let dateParams = useRouteMatch('/:customer/posts/:type/from/:from/to/:to');
  const [value, setValue] = useState([null, null]);

  useEffect(() => {
    // set date from URL
    if (dateParams) {
      const { to, from } = dateParams.params;
      return setValue([dayjs(from, FORMAT), dayjs(to, FORMAT)]);
    }

    const from = dayjs().startOf('month').format(FORMAT);
    const to = dayjs().endOf('month').format(FORMAT);
    setValue([dayjs(from, FORMAT), dayjs(to, FORMAT)]);
  }, [pathname]);

  const handleClose = () => {
    const [vFrom, vTo] = value;
    const url = formatDateUrl({
      ...params,
      from: dayjs(vFrom).format(FORMAT),
      to: dayjs(vTo).format(FORMAT),
    });
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
          <Post />
        </Container>
      </Box>
    </LocalizationProvider>
  );
};

export default Posts;
