import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React from 'react';

function MultiSelect(props) {
    const { items = [], selectedItem, setSelectedItem, title = "Item" } = props

    const handleOptionChange = (event) => {
        const selectedValues = event.target.value;
        if (selectedValues.includes('all'))
            setSelectedItem(items)
        else
            setSelectedItem(selectedValues);
    };

    return (
        <FormControl
            size='small'
            className="flex w-min-160" variant="outlined">
            <InputLabel>{title}</InputLabel>
            <Select
                labelId="item-select-label"
                id="item-select"
                label={title}
                title={title}
                multiple
                value={selectedItem}
                onChange={handleOptionChange}
                renderValue={(selected) => selected.join(', ')}>
                {items.length > 1 && (<MenuItem value='all' key='all'>all</MenuItem>)}
                {items.map(item => (<MenuItem value={item} key={item}>{item}</MenuItem>))}
            </Select>
        </FormControl>
    );
}

export default MultiSelect;
