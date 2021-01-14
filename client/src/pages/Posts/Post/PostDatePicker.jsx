import React, { useEffect, useState, useMemo } from 'react';
import { DatePicker } from '@material-ui/pickers';
import dayjs from 'dayjs';
import { FORMAT } from 'config';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from '@material-ui/core';
import { getErrorText } from 'utils';
import { AwesomeIcon } from 'ui/components/Icons/Icon';

export const PostDatePicker = ({
  value: propValue,
  from,
  to,
  updatePost,
  ...props
}) => {
  const [value, setValue] = useState(propValue);
  const [error, setError] = useState();
  const [dialog, setDialog] = useState();

  useEffect(() => {
    if (value && value.isValid() && propValue.valueOf() !== value.valueOf()) {
      // if (
      //   minDate.valueOf() <= value.valueOf() &&
      //   maxDate.valueOf() >= value.valueOf()
      // ) {
      updatePost({ date: dayjs(value).valueOf() });
      // }
    }
    // eslint-disable-next-line
  }, [value]);

  const minDate = useMemo(() => dayjs(from, FORMAT), [from]);
  const maxDate = useMemo(() => dayjs(to, FORMAT), [to]);
  const handleClose = () => setDialog(null);
  // console.log(maxDate);
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
        // minDate={minDate}
        // maxDate={maxDate}
        onChange={(value) => {
          console.log(value);
          const minDiff = value.diff(minDate, 'day', true);
          const maxDiff = maxDate.diff(value, 'day', true);
          if (minDiff < 0 || maxDiff < 0) {
            setDialog(value);
            return;
          }

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
      <Dialog
        open={dialog ? true : false}
        onClose={handleClose}
        aira-labelledby="create-client-dialog"
      >
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogContent>
          <Typography>
            This Date is not in the current Date Range and will not be visible after
            this change.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>NO D:</Button>
          <Button
            color="primary"
            variant="contained"
            onClick={() => {
              setValue(dialog);
              handleClose();
            }}
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
