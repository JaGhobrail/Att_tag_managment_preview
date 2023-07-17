import NavLinkAdapter from '@common/core/NavLinkAdapter';
import { useDispatch } from 'react-redux';
import IconButton from '@mui/material/IconButton';
import { Outlet } from 'react-router-dom';
import CommonSvgIcon from '@common/core/CommonSvgIcon';

function ContactsSidebarContent(props) {
    const dispatch = useDispatch();

    return (
        <div className="flex flex-col flex-auto">
            <IconButton
                className="absolute top-0 right-0 my-16 mx-32 z-10 text-primary"
                sx={{ color: 'white' }}
                component={NavLinkAdapter}
                to="/business-units"
                size="large"
                color='secondary'
            >
                <CommonSvgIcon>heroicons-outline:x</CommonSvgIcon>
            </IconButton>

            <Outlet />
        </div>
    );
}

export default ContactsSidebarContent;
