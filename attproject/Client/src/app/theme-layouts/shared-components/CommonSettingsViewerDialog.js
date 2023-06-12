import { useState } from 'react';
import clsx from 'clsx';
import Button from '@mui/material/Button';
import CommonSvgIcon from '@common/core/CommonSvgIcon';
import Dialog from '@mui/material/Dialog';
import { useSelector } from 'react-redux';
import { selectCurrentSettings } from 'app/store/common/settingsSlice';
import CommonHighlight from '@common/core/CommonHighlight';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import qs from 'qs';
import Typography from '@mui/material/Typography';

function CommonSettingsViewerDialog(props) {
  const { className } = props;
  const [openDialog, setOpenDialog] = useState(false);
  const settings = useSelector(selectCurrentSettings);

  function handleOpenDialog() {
    setOpenDialog(true);
  }

  function handleCloseDialog() {
    setOpenDialog(false);
  }

  return (
    <div className={clsx('', className)}>
      <Button
        variant="contained"
        color="secondary"
        className="w-full"
        onClick={handleOpenDialog}
        startIcon={<CommonSvgIcon>heroicons-solid:code</CommonSvgIcon>}
      >
        View settings as json/query params
      </Button>

      <Dialog open={openDialog} onClose={handleCloseDialog} aria-labelledby="form-dialog-title">
        <DialogTitle className="">React Admin Settings Viewer</DialogTitle>
        <DialogContent className="">
          <Typography className="text-16 font-bold mt-24 mb-16">JSON</Typography>

          <CommonHighlight component="pre" className="language-json">
            {JSON.stringify(settings, null, 2)}
          </CommonHighlight>

          <Typography className="text-16 font-bold mt-24 mb-16">Query Params</Typography>

          {qs.stringify({
            defaultSettings: JSON.stringify(settings, { strictNullHandling: true }),
          })}
        </DialogContent>
        <DialogActions>
          <Button color="secondary" variant="contained" onClick={handleCloseDialog}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CommonSettingsViewerDialog;
