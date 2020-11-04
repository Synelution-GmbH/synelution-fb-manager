import React, { useState } from 'react';
import { Box, Button } from '@material-ui/core';
import { postCode } from 'services';
import { AwesomeIcon } from 'ui/components/Icons/Icon';
import { useQueryCache } from 'react-query';
import { CodeDialog } from './CodeDialog';

export const rngNum = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
};

export const CreateCode = ({ onSubmit, slug }) => {
  const cache = useQueryCache();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (state) => {
    if (!state.email || !state.name) return;
    setLoading(true);
    try {
      const code = await postCode({ slug, data: state });
      console.log(code);
      cache.invalidateQueries(['clients', { slug }]);
      setLoading(false);
      setOpen(false);
      return true;
    } catch (e) {
      console.log(e);
      setLoading(false);
      return false;
    }
  };

  return (
    <>
      <Box mt={2}>
        <Button
          color="primary"
          variant="contained"
          size="large"
          onClick={() => setOpen(true)}
          startIcon={<AwesomeIcon icon="plus" style={{ fontSize: '100%' }} />}
        >
          Add Code
        </Button>
      </Box>
      <CodeDialog
        open={open}
        setOpen={setOpen}
        onSubmit={handleSubmit}
        initialState={{ name: '', email: '' }}
      />
    </>
  );
};
