import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React, { useState } from 'react';
const accounts = [
  {
    key: 'admin',
    title: 'Admin'
  },
  {
    key: 'investigator',
    title: 'Investigator'
  },
  {
    key: 'reviewer',
    title: 'Reviewer'
  },
  {
    key: 'partnerPublic',
    title: 'Partner & Public'
  },

]
function ChangeAccount(props) {
  const [selectedAccount, setSelectedAccount] = useState()
  return (

    <FormControl
      size='small'
      className="flex w-full sm:w-136" variant="outlined">
      <InputLabel id="category-select-label">Account</InputLabel>
      <Select
        className='w-160'
        labelId="account-select-label"
        id="account-select"
        label="Category"
        value={selectedAccount}
        onChange={(event) => setSelectedAccount(event.target.value)}
        title='Rule'
        name='Rule'
      >
        {accounts.map((acc) => (
          <MenuItem value={acc.key} key={acc.key}>
            {acc.title}
          </MenuItem>
        ))}
      </Select>
    </FormControl>


  );
}

export default ChangeAccount;
