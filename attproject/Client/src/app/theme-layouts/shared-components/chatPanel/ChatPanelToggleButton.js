import IconButton from '@mui/material/IconButton';
import { useDispatch } from 'react-redux';
import CommonSvgIcon from '@common/core/CommonSvgIcon';
import { toggleChatPanel } from './store/stateSlice';

const ChatPanelToggleButton = (props) => {
  const dispatch = useDispatch();

  return (
    <IconButton className="w-40 h-40" onClick={(ev) => dispatch(toggleChatPanel())} size="large">
      {props.children}
    </IconButton>
  );
};

ChatPanelToggleButton.defaultProps = {
  children: <CommonSvgIcon>heroicons-outline:chat</CommonSvgIcon>,
};

export default ChatPanelToggleButton;
