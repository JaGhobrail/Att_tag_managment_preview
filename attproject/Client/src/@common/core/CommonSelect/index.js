import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React, { useState } from 'react';

function CommonSelect({ items = [], selectedItem, setSelectedItme, title = "" }) {
  return (
    <FormControl
      size='small'
      className="flex min-w-160"
      variant="outlined">
      <InputLabel>{title}</InputLabel>
      <Select
        value={selectedItem}
        label={title}
        onChange={(event) => setSelectedItme(event.target.value)}
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

export default CommonSelect;
