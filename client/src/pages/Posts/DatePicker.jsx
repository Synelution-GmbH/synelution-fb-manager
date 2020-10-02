import React from 'react';
import { DateRangePicker, DateRangeDelimiter } from '@material-ui/pickers';
import { TextField } from '@material-ui/core';
export const DatePicker = ({ value, handleClose, setValue }) => {
  return (
    <>
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
            <TextField {...startProps} />
            <DateRangeDelimiter> to </DateRangeDelimiter>
            <TextField {...endProps} />
          </React.Fragment>
        )}
      />
    </>
  );
};
