import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React, { useState } from 'react';

const items = ['Investigate', 'Request', 'Remove', 'Approve', 'Functional']
function SelectResult(props) {
  const [selectedItem, setSelectedItem] = useState(items[0])
  return (

    <FormControl
      size='small'
      nam
      className="flex w-min-160" variant="outlined">
      <InputLabel>Result</InputLabel>
      <Select
        labelId="account-select-label"
        id="account-select"
        label="Result"
        title='Result'

        value={selectedItem}
        onChange={(event) => setSelectedItem(event.target.value)}
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
