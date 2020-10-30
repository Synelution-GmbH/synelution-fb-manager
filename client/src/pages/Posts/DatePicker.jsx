import React, { useEffect, useState } from 'react';
import { DateRangePicker, DateRangeDelimiter } from '@material-ui/pickers';
import { Avatar, Grid, makeStyles, TextField } from '@material-ui/core';
import { AwesomeIcon } from 'ui/components/Icons/Icon';
import { getErrorText } from 'utils';

const useStyles = makeStyles((theme) => {
  console.log(theme);
  return {
    avatar: {
      cursor: 'pointer',
      backgroundColor: 'transparent',
      color: theme.palette.text.primary,
      transition: '0.3s',
      border: '1px solid rgba(0,0,0,0.23)',

      '&:hover': {
        borderColor: theme.palette.primary.dark,
        color: '#fff',
        backgroundColor: theme.palette.primary.dark,
      },
    },
  };
});

export const DatePicker = ({ value, handleClose, setValue }) => {
  const classes = useStyles();
  const [date, setDate] = useState(value);
  const [error, setError] = useState([null, null]);

  useEffect(() => {
    console.log(value);
    if (value[0] === date[0] && value[1] === date[1]) return;
    setDate(value);
  }, [value]);

  useEffect(() => {
    if (error[0] || error[1]) return;
    setValue(date);
  }, [date, error]);

  const handleDateForward = () => {
    const [from, to] = value;
    if (!to || !from) return;
    const diff = to.diff(from, 'h');
    const endOfMonth = to.endOf('month').date();

    const newFrom = to.add(1, 'day');
    const newTo =
      endOfMonth === to.date() && from.date() === 1
        ? to.add(1, 'month').endOf('month')
        : to.add(diff, 'h').add(1, 'day');
    const newValue = [newFrom, newTo];
    setValue(newValue);
    handleClose(newValue);
  };

  const handleDateBackwards = () => {
    const [from, to] = value;
    if (!to || !from) return;
    const diff = to.diff(from, 'h');
    const endOfMonth = to.endOf('month').date();

    const newFrom =
      endOfMonth === to.date() && from.date() === 1
        ? from.subtract(1, 'month').startOf('month')
        : from.subtract(diff, 'h').subtract(1, 'day');
    const newTo = from.subtract(1, 'day');
    const newValue = [newFrom, newTo];
    setValue(newValue);
    handleClose(newValue);
  };

  console.log(date, value);

  return (
    <Grid container alignItems="center" style={{ width: 'auto' }}>
      <Avatar
        className={classes.avatar}
        variant="rounded"
        style={{ marginRight: '8px' }}
        onClick={handleDateBackwards}
      >
        <AwesomeIcon icon="chevron-left" />
      </Avatar>
      <DateRangePicker
        startText="Start-date"
        endText="End-date"
        value={date}
        defaultValue={value}
        inputFormat="DD.MM.YYYY"
        disableCloseOnSelect
        mask="__.__.____"
        onClose={() => {
          if (error) return;
          // handleClose(value);
        }}
        onChange={(newValue) => setDate(newValue)}
        onError={(e) => setError(e.map((err) => getErrorText(err)))}
        renderInput={(startProps, endProps) => (
          <React.Fragment>
            <TextField {...startProps} helperText={error[0]} />
            <DateRangeDelimiter> to </DateRangeDelimiter>
            <TextField {...endProps} helperText={error[1]} />
          </React.Fragment>
        )}
      />
      <Avatar
        className={classes.avatar}
        variant="rounded"
        style={{ marginLeft: '8px' }}
        onClick={handleDateForward}
      >
        <AwesomeIcon icon="chevron-right" />
      </Avatar>
    </Grid>
  );
};
