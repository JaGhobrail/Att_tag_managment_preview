import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React, { useState } from 'react';

function SelectDomain(props) {
  const { items = [], selectedDomin, setSelectedDomin } = props
  return (
    <FormControl
      size='small'
      className="flex w-min-160" variant="outlined">
      <InputLabel>Domain (s)</InputLabel>
      <Select
        labelId="account-select-label"
        id="Domain-select"
        label="Domain (s)"
        title='Domain (s)'
        value={selectedDomin}
        onChange={(event) => setSelectedDomin(event.target.value)}
      >
        {items.map((item) => (
          <MenuItem value={item} key={item}>
            {item}
          </MenuItem>
        ))}
      </Select>
    </FormControl>


  );
}

export default SelectDomain;
