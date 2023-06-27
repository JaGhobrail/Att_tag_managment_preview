import CommonSelect from '@common/core/CommonSelect';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React, { useState } from 'react';
import { selectVendros } from '../store/Slice';
import { useSelector } from 'react-redux';

export default function SelectVendor(props) {

  const vendors = useSelector(selectVendros);
  const [selecVendor, setSelecVendor] = useState()
  return (
    <CommonSelect
      items={vendors ?? []}
      selectedItem={selecVendor}
      setSelectedItme={setSelecVendor}
      title="Vendor Name" />
  );
}
