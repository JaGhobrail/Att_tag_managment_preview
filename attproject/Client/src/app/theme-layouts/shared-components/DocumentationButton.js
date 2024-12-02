import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import CommonSvgIcon from '@common/core/CommonSvgIcon';

function DocumentationButton({ className }) {
  return (
    <Button
      component={Link}
      to="/documentation"
      role="button"
      className={className}
      variant="contained"
      color="primary"
      startIcon={<CommonSvgIcon size={16}>heroicons-outline:book-open</CommonSvgIcon>}
    >
      Documentation
    </Button>
  );
}

export default DocumentationButton;
