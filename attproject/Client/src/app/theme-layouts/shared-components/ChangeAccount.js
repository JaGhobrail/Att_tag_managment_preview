import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React, { useState } from 'react';
const accounts = [
  {
    key: 'Consumer',
    title: 'Consumer - att.com'
  },
  {
    key: 'Consumer-google',
    title: 'Consumer - google.com'
  },
  {
    key: 'Consumer-Consumer2',
    title: 'Consumer - Consumer.com'
  }
]

function ChangeAccount(props) {
  const [selectedAccount, setSelectedAccount] = useState(accounts[0].key)
  return (

    <FormControl
      size='small'
      className="flex justify-start w-min-160 text-white border-white" variant="outlined">
      <Select
        style={{}}
        className='border-white bg-white overflow-hidden'
        labelId="account-select-label"
        id="account-select"
        label=""
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
