import React, { useEffect, useState, useMemo } from 'react';
import { DatePicker } from '@material-ui/pickers';
import dayjs from 'dayjs';
import { FORMAT } from 'config';
import { TextField, Typography } from '@material-ui/core';

const getErrorText = (error) => {
  switch (error) {
    case 'invalidDate':
      return 'Invalid Date';
    case 'minDate':
    case 'maxDate':
      return 'Date not in current range';

    default:
      return null;
  }
};

export const PostDatePicker = ({
  value: propValue,
  from,
  to,
  updatePost,
  ...props
}) => {
  const [value, setValue] = useState(propValue);
  const [error, setError] = useState();

  useEffect(() => {
    if (value && value.isValid()) {
      if (
        minDate.valueOf() <= value.valueOf() &&
        maxDate.valueOf() >= value.valueOf()
      ) {
        updatePost({ date: dayjs(value).valueOf() });
      }
    }
  }, [value]);

  const minDate = useMemo(() => dayjs(from, FORMAT), [from]);
  const maxDate = useMemo(() => dayjs(to, FORMAT), [to]);

  return (
    <>
      <DatePicker
        {...props}
        mask="__.__.____"
        disableToolbar
        label="Online am"
        variant="outlined"
        value={value}
        defaultValue={'Date'}
        inputFormat="DD.MM.YYYY"
        minDate={minDate}
        maxDate={maxDate}
        onChange={(value) => {
          setValue(value);
        }}
        onError={(e) => setError(getErrorText(e))}
        renderInput={(props) => (
          <TextField
            {...props}
            helperText={error}
            variant="outlined"
            style={{ marginLeft: '8px' }}
          />
        )}
      />
    </>
  );
};
