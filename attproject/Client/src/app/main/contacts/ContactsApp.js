import CommonPageSimple from '@common/core/CommonPageSimple';
import withReducer from 'app/store/withReducer';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useDeepCompareEffect } from '@common/hooks';
import { styled } from '@mui/material/styles';
import useThemeMediaQuery from '@common/hooks/useThemeMediaQuery';
import ContactsSidebarContent from './ContactsSidebarContent';
import ContactsHeader from './ContactsHeader';
import ContactsList from './ContactsList';
import reducer from './store';
import { getContacts } from './store/contactsSlice';

const Root = styled(CommonPageSimple)(({ theme }) => ({
    '& .CommonPageSimple-header': {
        backgroundColor: theme.palette.background.paper,
    },
}));

function UsersApp(props) {
    const dispatch = useDispatch();
    const pageLayout = useRef(null);
    const routeParams = useParams();
    const [rightSidebarOpen, setRightSidebarOpen] = useState(false);
    const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));

    useDeepCompareEffect(() => {
        dispatch(getContacts());
    }, [dispatch]);

    useEffect(() => {
        setRightSidebarOpen(Boolean(routeParams.id));
    }, [routeParams]);

    return (
        <Root
            header={<ContactsHeader pageLayout={pageLayout} />}
            content={<ContactsList />}
            ref={pageLayout}
            rightSidebarContent={<ContactsSidebarContent />}
            rightSidebarOpen={rightSidebarOpen}
            rightSidebarOnClose={() => setRightSidebarOpen(false)}
            rightSidebarWidth={640}
            scroll={isMobile ? 'normal' : 'content'}
        />
    );
}

export default withReducer('usersApp', reducer)(UsersApp);
