import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { selectUnits, selectVendorsName } from 'app/store/common/sharedSlice';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
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
    const units = useSelector(selectUnits)
    // const [selectedAccount, setSelectedAccount] = useState(accounts[0].key)
    return (

        <FormControl
            size='small'
            className="flex justify-start w-120 text-white border-white" variant="outlined">
            <Select
                style={{}}
                className='border-white bg-white overflow-hidden'
                labelId="account-select-label"
                id="account-select"
                label=""
                // value={selectedAccount}
                onChange={(event) => { }
                    // setSelectedAccount(event.target.value)
                }
                title='Role'
                name='Role'
            >

                {units?.map((acc) => (
                    <MenuItem className='' value={acc.key} key={acc.key}>
                        {acc.name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>


    );
}

export default ChangeAccount;
