import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React, { useState } from 'react';

function TrackerDialog(props) {
    const { items = [], selectedDomin, setSelectedDomin, title = "Domain (s)" } = props
    return (
        <FormControl
            size='small'
            className="flex w-min-160" variant="outlined">
            <InputLabel>{title}</InputLabel>
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
