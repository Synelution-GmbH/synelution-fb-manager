import React, { useState } from 'react';
import {
  Button,
  Tooltip,
  makeStyles,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
} from '@material-ui/core';
import { AwesomeIcon } from 'ui/components/Icons/Icon';

const JobPostDialog = ({
  employmentType: initialEmploymentType,
  salary: initialSalary,
  handleEdit,
  buttonComponent,
}) => {
  const [open, setOpen] = useState(false);
  const [salary, setSalary] = useState(initialSalary || '');
  const [employmentType, setEmploymentType] = useState(initialEmploymentType || '');

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleSubmit = () => {
    console.log({ salary, employmentType });
    handleEdit({ salary, employmentType });
    handleClose();
  };

  return (
    <>
      {buttonComponent
        ? buttonComponent({
            onClick: (e) => {
              e.stopPropagation();
              handleOpen();
            },
            children: <AwesomeIcon icon="briefcase" />,
          })
        : null}
      <Dialog
        open={open}
        onClose={handleClose}
        onBackdropClick={(e) => {
          console.log(e);
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <DialogTitle>Job Post Content</DialogTitle>
        <DialogContent style={{ overflow: 'visible' }}>
          <TextField
            label="Employment Type (Full-Time / Part Time)"
            value={employmentType}
            fullWidth
            style={{ marginBottom: '16px' }}
            variant="outlined"
            onChange={(e) => {
              setEmploymentType(e.target.value);
            }}
          />

          <TextField
            label="Salary"
            value={salary}
            fullWidth
            variant="outlined"
            onChange={(e) => {
              setSalary(e.target.value);
            }}
          />

          {/* <TextField
            value={text}
            onChange={(e) => setText(e.target.value)}
            label="Änderungswünsche"
            multiline
            rows={3}
            fullWidth
            margin="dense"
            variant="outlined"
            focused
            autoFocus
          /> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export const JobPostButton = ({ handleEdit, employmentType, salary, ...props }) => {
  return (
    <JobPostDialog
      handleEdit={handleEdit}
      salary={salary}
      employmentType={employmentType}
      buttonComponent={(btnProps) => (
        <Tooltip {...props} title="Edit Job Post content" placement="top">
          <Button
            {...props}
            {...btnProps}
            variant="contained"
            color="primary"
            size="medium"
            style={{ padding: '10px', fontSize: 'inherit', minWidth: 'auto' }}
          ></Button>
        </Tooltip>
      )}
      {...props}
    />
  );
};
