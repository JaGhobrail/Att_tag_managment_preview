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
import moment from 'moment';

function UserCard({ user, updated_at }) {

    return (
        <div className='flex flex-row'>
            <Avatar sx={{ bgcolor: user.color ?? '' }} className="md:mx-4 text-black">{user?.name[0]}</Avatar>
            <div className="flex flex-col flex-auto mx-4">
                <Typography component="span" className="flex">
                    {user?.name}
                </Typography>
                <Typography className="text-11 font-medium capitalize" color="text.secondary">
                    {user?.roles[0]?.name}
                    {(!user?.roles || (Array.isArray(user?.roles) && user.roles.length === 0)) && 'Guest'}
                </Typography>
            </div>
            <Typography className="text-11" color="text.secondary">
                {moment(updated_at).format("YYYY/MM/DD HH:mm")}
            </Typography>
        </div>
    );
}

export default UserCard;
