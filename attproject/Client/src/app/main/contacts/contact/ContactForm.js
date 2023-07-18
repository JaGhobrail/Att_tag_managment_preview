import Button from '@mui/material/Button';
import NavLinkAdapter from '@common/core/NavLinkAdapter';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import CommonLoading from '@common/core/CommonLoading';
import _ from '@lodash';
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import Box from '@mui/system/Box';
import CommonSvgIcon from '@common/core/CommonSvgIcon';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Autocomplete from '@mui/material/Autocomplete/Autocomplete';
import Checkbox from '@mui/material/Checkbox/Checkbox';

import {
    addContact,
    getContact,
    newContact,
    removeContact,
    selectContact,
    updateContact,
} from '../store/contactSlice';
import { getUnits, selectUnits, getUserRoles, selectUserRoles } from 'app/store/common/sharedSlice';
import { userColors } from '@common/colors/userColors';
/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
    name: yup.string().required('You must enter a name'),
});

const ContactForm = (props) => {
    const contact = useSelector(selectContact);
    const units = useSelector(selectUnits);
    const userRoles = useSelector(selectUserRoles);
    const routeParams = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { control, watch, reset, handleSubmit, formState, getValues } = useForm({
        mode: 'onChange',
        resolver: yupResolver(schema),
    });

    const { isValid, dirtyFields, errors } = formState;

    const form = watch();

    useEffect(() => {
        if (routeParams.id === 'new') {
            dispatch(newContact());
        } else {
            dispatch(getContact(routeParams.id));
        }
        dispatch(getUserRoles())
    }, [dispatch, routeParams]);

    useEffect(() => {
        reset({ ...contact });
    }, [contact, reset]);


    /**
     * Form Submit
     */
    function onSubmit(data) {
        if (routeParams.id === 'new') {
            dispatch(addContact(data)).then(({ payload }) => {
                navigate(`/users`);
            });
        } else {
            dispatch(updateContact(data));
        }
    }

    function handleRemoveContact() {
        dispatch(removeContact(contact.id)).then(() => {
            navigate('/users');
        });
    }

    if (_.isEmpty(form) || !contact) {
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

            <div className="relative flex flex-col flex-auto items-center px-24 sm:px-48">
                <div className="w-full">
                    <div className="flex flex-auto items-end -mt-64">
                        <Controller
                            control={control}
                            name="avatar"
                            render={({ field: { onChange, value } }) => (
                                <Box
                                    sx={{
                                        borderWidth: 4,
                                        borderStyle: 'solid',
                                        borderColor: 'background.paper',
                                    }}
                                    className="relative flex items-center justify-center w-128 h-128 rounded-full overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-black bg-opacity-50 z-10" />
                                    <div className="absolute inset-0 flex items-center justify-center z-20">
                                        <div>
                                            <label htmlFor="button-avatar" className="flex p-8 cursor-pointer">
                                                <input
                                                    accept="image/*"
                                                    className="hidden"
                                                    id="button-avatar"
                                                    type="file"
                                                    onChange={async (e) => {
                                                        function readFileAsync() {
                                                            return new Promise((resolve, reject) => {
                                                                const file = e.target.files[0];
                                                                if (!file) {
                                                                    return;
                                                                }
                                                                const reader = new FileReader();

                                                                reader.onload = () => {
                                                                    resolve(`data:${file.type};base64,${btoa(reader.result)}`);
                                                                };

                                                                reader.onerror = reject;

                                                                reader.readAsBinaryString(file);
                                                            });
                                                        }

                                                        const newImage = await readFileAsync();

                                                        onChange(newImage);
                                                    }}
                                                />
                                                <CommonSvgIcon className="text-white">heroicons-outline:camera</CommonSvgIcon>
                                            </label>
                                        </div>
                                        <div>
                                            <IconButton
                                                onClick={() => {
                                                    onChange('');
                                                }}
                                            >
                                                <CommonSvgIcon className="text-white">heroicons-solid:trash</CommonSvgIcon>
                                            </IconButton>
                                        </div>
                                    </div>
                                    <Avatar
                                        sx={{
                                            backgroundColor: 'background.default',
                                            color: 'text.secondary',
                                        }}
                                        className="object-cover w-full h-full text-64 font-bold"
                                        src={value}
                                        alt={contact.name}
                                    >
                                        {contact.name.charAt(0)}
                                    </Avatar>
                                </Box>
                            )}
                        />
                    </div>
                </div>

                <Controller
                    control={control}
                    name="name"
                    render={({ field }) => (
                        <TextField
                            className="mt-32"
                            {...field}
                            label="Name"
                            placeholder="Name"
                            id="name"
                            error={!!errors.name}
                            helperText={errors?.name?.message}
                            variant="outlined"
                            required
                            fullWidth
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <CommonSvgIcon size={20}>heroicons-solid:user-circle</CommonSvgIcon>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    )}
                />


                <Controller
                    control={control}
                    name="email"

                    render={({ field }) => (
                        <TextField
                            className="mt-32"
                            {...field}
                            label="Email"
                            placeholder="Email"
                            variant="outlined"
                            fullWidth
                            error={!!errors.email}
                            helperText={errors?.email?.message}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <CommonSvgIcon size={20}>heroicons-solid:mail</CommonSvgIcon>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    )}
                />

                <Controller
                    control={control}
                    name="password"
                    render={({ field }) => (
                        <TextField
                            className="mt-32"
                            {...field}
                            label="Password"
                            placeholder="Password"
                            id="Password"
                            error={!!errors.password}
                            helperText={errors?.password?.message}
                            variant="outlined"
                            fullWidth
                            type='password'
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <CommonSvgIcon size={20}>material-solid:password</CommonSvgIcon>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="color"
                    render={({ field }) => (
                        <>
                            <div className='flex space-x-1 mt-32'>
                                {
                                    userColors.map(item => {
                                        return <Avatar onClick={() => field.onChange(item)} style={{ backgroundColor: item }} />
                                    })
                                }
                            </div>
                            <TextField
                                className="mt-32"
                                style={{ backgroundColor: field.value }}
                                {...field}
                                label="Color"
                                placeholder="color"
                                id="color"
                                error={!!errors.color}
                                helperText={errors?.color?.message}
                                variant="outlined"
                                fullWidth
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <CommonSvgIcon size={20}>material-solid:password</CommonSvgIcon>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </>
                    )}
                />


                <Controller
                    control={control}
                    name="units"
                    render={({ field: { onChange, value } }) => (
                        <Autocomplete
                            multiple
                            id="units"
                            className="mt-32"
                            options={units}
                            disableCloseOnSelect
                            getOptionLabel={(option) => option.name}
                            renderOption={(_props, option, { selected }) => (
                                <li {..._props}>
                                    <Checkbox style={{ marginRight: 8 }} checked={selected} />
                                    {option.name}
                                </li>
                            )}
                            value={value ? value.map((id) => _.find(units, { id })) : []}
                            onChange={(event, newValue) => {
                                onChange(newValue.map((item) => item.id));
                            }}
                            fullWidth
                            renderInput={(params) => <TextField {...params}
                                InputProps={{
                                    ...params.InputProps,
                                    startAdornment: (
                                        <>
                                            <InputAdornment position="start">
                                                <CommonSvgIcon size={20}>material-solid:apartment</CommonSvgIcon>
                                            </InputAdornment>
                                            {params.InputProps.startAdornment}
                                        </>
                                    ),
                                }}

                                label="Business units"
                                placeholder="Business units" />}
                        />
                    )}
                />

                <Controller
                    control={control}
                    name="role"
                    render={({ field: { onChange, value } }) => (
                        <Autocomplete
                            id="role"
                            multiple={false}
                            className="mt-32"
                            options={userRoles}
                            getOptionLabel={(option) => option.name}
                            renderOption={(_props, option, { selected }) => (
                                <li {..._props}>
                                    <Checkbox style={{ marginRight: 8 }} checked={selected} />
                                    {option.name}
                                </li>
                            )}
                            value={value ? _.find(userRoles, { id: value }) : ''}
                            onChange={(event, newValue) => {
                                onChange(newValue.id);
                            }}
                            fullWidth
                            renderInput={(params) => <TextField {...params}
                                InputProps={{
                                    ...params.InputProps,
                                    startAdornment: (
                                        <>
                                            <InputAdornment position="start">
                                                <CommonSvgIcon size={20}>material-solid:verified_user</CommonSvgIcon>
                                            </InputAdornment>
                                            {params.InputProps.startAdornment}
                                        </>
                                    ),
                                }}

                                label="User Role"
                                placeholder="User Role" />}
                        />
                    )}
                />


            </div>

            <Box
                className="flex items-center mt-40 py-14 pr-16 pl-4 sm:pr-48 sm:pl-36 border-t"
                sx={{ backgroundColor: 'background.default' }}
            >
                {routeParams.id !== 'new' && (
                    <Button color="error" onClick={handleRemoveContact}>
                        Delete
                    </Button>
                )}
                <Button className="ml-auto" component={NavLinkAdapter} to={-1}>
                    Cancel
                </Button>
                <Button
                    className="ml-8"
                    variant="contained"
                    color="secondary"
                    disabled={_.isEmpty(dirtyFields) || !isValid}
                    onClick={handleSubmit(onSubmit)}
                >
                    Save
                </Button>
            </Box>
        </>
    );
};

export default ContactForm;
