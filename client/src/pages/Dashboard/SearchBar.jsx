import React, { useState, useEffect } from 'react';
import { FormControl, Input, InputAdornment, InputLabel } from '@material-ui/core';
import { AwesomeIcon } from 'ui/components/Icons/Icon';

export const SearchBar = ({
  setFilteredList = () => {},
  searchProperty = '',
  list = [],
}) => {
  const [value, setValue] = useState('');
  useEffect(() => {
    if (!list) return;
    const filteredList = list.filter(
      (item) =>
        item[searchProperty].toLowerCase().search(value.toLowerCase()) !== -1
    );
    setFilteredList(filteredList);
  }, [value, list, searchProperty, setFilteredList]);

  const onChange = (e) => {
    setValue(e.target.value);
  };
  return (
    <FormControl>
      <InputLabel htmlFor="search">search</InputLabel>
      <Input
        type="text"
        id="search"
        onChange={onChange}
        endAdornment={
          <InputAdornment position="end">
            <AwesomeIcon icon="search" />
          </InputAdornment>
        }
      />
    </FormControl>
  );
};
