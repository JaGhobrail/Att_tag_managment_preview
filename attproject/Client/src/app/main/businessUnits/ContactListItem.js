import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import NavLinkAdapter from '@common/core/NavLinkAdapter';
import CommonSvgIcon from '@common/core/CommonSvgIcon/CommonSvgIcon';

function ContactListItem(props) {
    const { contact } = props;
    return (
        <>
            <ListItem
                className="px-32 py-16"
                button
                component={NavLinkAdapter}
                to={`/business-units/${contact.id}`}
            >
                <CommonSvgIcon className="text-grey-500 mx-4">material-solid:apartment</CommonSvgIcon>
                <ListItemText
                    classes={{ root: 'm-0', primary: 'font-medium leading-5 truncate' }}
                    primary={contact.name}
                    secondary={
                        <>
                            <Typography
                                className="inline"
                                component="span"
                                variant="body2"
                                color="text.secondary"
                            >
                                {/* {contact.title} */}
                                number of users and data
                            </Typography>
                        </>
                    }
                />
            </ListItem>
            <Divider />
        </>
    );
}

export default ContactListItem;
