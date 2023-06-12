import Dialog from '@mui/material/Dialog';
import { useDispatch, useSelector } from 'react-redux';
import {
  closeDialog,
  selectCommonDialogOptions,
  selectCommonDialogState,
} from 'app/store/common/dialogSlice';

function CommonDialog(props) {
  const dispatch = useDispatch();
  const state = useSelector(selectCommonDialogState);
  const options = useSelector(selectCommonDialogOptions);

  return (
    <Dialog
      open={state}
      onClose={(ev) => dispatch(closeDialog())}
      aria-labelledby="common-dialog-title"
      classes={{
        paper: 'rounded-8',
      }}
      {...options}
    />
  );
}

export default CommonDialog;
