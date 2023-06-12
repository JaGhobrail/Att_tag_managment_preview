import Button from '@mui/material/Button';
import clsx from 'clsx';
import CommonSvgIcon from '@common/core/CommonSvgIcon';

function PurchaseButton({ className }) {
  return (
    <Button
      component="a"
      href="https://1.envato.market/zDGL6"
      target="_blank"
      rel="noreferrer noopener"
      role="button"
      className={clsx('', className)}
      variant="contained"
      color="secondary"
      startIcon={<CommonSvgIcon size={16}>heroicons-outline:shopping-cart</CommonSvgIcon>}
    >
      Purchase  React
    </Button>
  );
}

export default PurchaseButton;
