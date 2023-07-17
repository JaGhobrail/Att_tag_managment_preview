import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import NavLinkAdapter from '@common/core/NavLinkAdapter';

function ContactListItem(props) {
    const { contact } = props;
    return (
        <>
            <ListItem
                className="px-32 py-16"
                sx={{ bgcolor: 'background.paper' }}
                button
                component={NavLinkAdapter}
                to={`/users/${contact.id}`}
            >
                <ListItemAvatar>
                    <Avatar alt={contact.name} src={contact.avatar}
                        sx={{ bgcolor: contact.color ? contact.color : '' }} />
                </ListItemAvatar>
                <ListItemText
                    classes={{ root: 'm-0', primary: 'font-medium leading-5 truncate' }}
                    primary={contact.name}
                    secondary={
                        <>
                            {
                                contact?.roles?.map(item => (
                                    <Typography
                                        className="inline mx-2"
                                        component="span"
                                        variant="body2"
                                        color="text.secondary">
                                        {item?.name}
                                    </Typography>)
                                )
                            }

                        </>
                    }
                />
            </ListItem>
            <Divider />
        </>
    );
}

export default ContactListItem;
