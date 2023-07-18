import Button from '@mui/material/Button';
import NavLinkAdapter from '@common/core/NavLinkAdapter';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CommonLoading from '@common/core/CommonLoading';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import CommonSvgIcon from '@common/core/CommonSvgIcon';
import Box from '@mui/system/Box';
import format from 'date-fns/format';
import _ from '@lodash';
import { getContact, selectContact } from '../store/contactSlice';

const ContactView = () => {
    const contact = useSelector(selectContact);
    const routeParams = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getContact(routeParams.id));
    }, [dispatch, routeParams]);


    if (!contact) {
        return <CommonLoading />;
    }

    return (
        <>
            <Box
                className="relative w-full h-160 sm:h-192 px-32 sm:px-48"
                sx={{
                    backgroundColor: 'background.default',
                }}
            >
                {contact.background && (
                    <img
                        className="absolute inset-0 object-cover w-full h-full"
                        src={contact.background}
                        alt="user background"
                    />
                )}
            </Box>
            <div className="relative flex flex-col flex-auto items-center p-24 pt-0 sm:p-48 sm:pt-0">
                <div className="w-full max-w-3xl">
                    <div className="flex flex-auto items-end -mt-64">
                        <Avatar
                            sx={{
                                borderWidth: 4,
                                borderStyle: 'solid',
                                borderColor: 'background.paper',
                                backgroundColor: 'background.default',
                                color: 'text.secondary',
                            }}
                            className="w-128 h-128 text-64 font-bold"
                            alt={contact?.name}
                        >
                            {contact?.name?.charAt(0)}
                        </Avatar>
                        <div className="flex items-center ml-auto mb-4">
                            <Button variant="contained" color="secondary" component={NavLinkAdapter} to="edit">
                                <CommonSvgIcon size={20}>heroicons-outline:pencil-alt</CommonSvgIcon>
                                <span className="mx-8">Edit</span>
                            </Button>
                        </div>
                    </div>

                    <Typography className="mt-12 text-4xl font-bold truncate">{contact?.name}</Typography>

                    <Divider className="mt-16 mb-24" />

                    <div className="flex flex-col space-y-32">
                        {contact?.email && (
                            <div className="flex items-center">
                                <CommonSvgIcon>heroicons-outline:briefcase</CommonSvgIcon>
                                <div className="ml-24 leading-6">{contact?.email}</div>
                            </div>
                        )}
                        {contact?.roles[0] && (
                            <div className="flex items-center">
                                <CommonSvgIcon>heroicons-outline:briefcase</CommonSvgIcon>
                                <div className="ml-24 leading-6">{contact?.roles[0]?.name}</div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ContactView;
