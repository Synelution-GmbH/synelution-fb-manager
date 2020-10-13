import React from 'react';
import { DateRangePicker, DateRangeDelimiter } from '@material-ui/pickers';
import { Avatar, Grid, makeStyles, TextField } from '@material-ui/core';
import { AwesomeIcon } from 'ui/components/Icons/Icon';
import dayjs from 'dayjs';

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
    setValue([newFrom, newTo]);
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
    setValue([newFrom, newTo]);
  };

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
        value={value}
        disableCloseOnSelect
        mask="__.__.____"
        onClose={handleClose}
        onChange={(newValue) => setValue(newValue)}
        renderInput={(startProps, endProps) => (
          <React.Fragment>
            <TextField {...startProps} helperText="" />
            <DateRangeDelimiter> to </DateRangeDelimiter>
            <TextField {...endProps} helperText="" />
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
