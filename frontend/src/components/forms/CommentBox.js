import * as React from 'react';
import TextField from '@mui/material/TextField';
import { Controller } from 'react-hook-form';

export default function CommentBox(props) {
    const { label, placeholder, name, control, width } = props;
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
                    id="standard-multiline-static"
                    label={label}
                    sx={{ width: { width } }}
                    multiline
                    rows={1}
                    variant="standard"
                    placeholder={placeholder}
                    onChange={onChange}
                    value={value}
                    error={!!error}
                    helperText={error?.message}
                />


            }

        />

    );
}
