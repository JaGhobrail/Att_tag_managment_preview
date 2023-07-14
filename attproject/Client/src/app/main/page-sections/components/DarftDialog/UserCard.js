import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import CommonSvgIcon from '@common/core/CommonSvgIcon';
import { selectUser } from 'app/store/userSlice';

function UserCard(props) {
    const user = useSelector(selectUser);

    return (
        <div className='flex flex-row'>
            <Avatar
                sx={{ bgcolor: user.color ? contact.color : '' }} className="md:mx-4 text-black">{user.data.name[0]}</Avatar>
            <div className="flex flex-col flex-auto mx-4">
                <Typography component="span" className="flex">
                    {user.data.name}
                </Typography>
                <Typography className="text-11 font-medium capitalize" color="text.secondary">
                    {user.role.toString()}
                    {(!user.role || (Array.isArray(user.role) && user.role.length === 0)) && 'Guest'}
                </Typography>
            </div>
            <Typography className="text-11" color="text.secondary">
                update at 2:20 13/05/23
            </Typography>
        </div>
    );
}

export default UserCard;
