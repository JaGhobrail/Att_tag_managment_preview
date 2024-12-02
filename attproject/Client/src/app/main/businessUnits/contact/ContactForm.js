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

import {
    addContact,
    getContact,
    newContact,
    removeContact,
    selectContact,
    updateContact,
} from '../store/contactSlice';
import { getUnits, selectUnits, selectUserRoles } from 'app/store/common/sharedSlice';

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
                navigate(`/business-units`);
            });
        } else {
            dispatch(updateContact(data));
        }
    }

    function handleRemoveContact() {
        dispatch(removeContact(contact.id)).then(() => {
            navigate('/units');
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

                {/* <Controller
                    control={control}
                    name="url"
                    render={({ field }) => (
                        <TextField
                            className="mt-32"
                            {...field}
                            label="URL"
                            placeholder="URL"
                            id="url"
                            error={!!errors.url}
                            helperText={errors?.url?.message}
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
                /> */}

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
