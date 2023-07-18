import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React, { useState } from 'react';

const items = ['Investigate', 'Request', 'Remove', 'Approve', 'Functional']
function SelectResult(props) {
  const { selectedResult, setSelectedResult } = props
  return (
    <FormControl
      size='small'
      className="flex w-min-160" variant="outlined">
      <InputLabel>Result</InputLabel>
      <Select
        labelId="account-select-label"
        id="Result-select"
        label="Result"
        title='Result'
        value={selectedResult}
        onChange={(event) => setSelectedResult(event.target.value)}
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

export default SelectResult;
