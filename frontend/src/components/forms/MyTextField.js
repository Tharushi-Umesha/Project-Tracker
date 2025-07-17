import * as React from 'react';
import TextField from '@mui/material/TextField';
import { Controller } from 'react-hook-form';

export default function MyTextField(props) {
    const { label, placeholder, name, control, width } = props

    return (

        <Controller
            name={name}
            control={control}

            render={({
                field: { onChange, value },
                fieldState: { error },
                formState,
            }) =>
                <TextField
                    id="standard-basic"
                    sx={{ width: { width } }}
                    label={label}
                    variant="standard"
                    placeholder={placeholder}
                    onChange={onChange}
                    value={value}
                />


            }

        />

    );
}
