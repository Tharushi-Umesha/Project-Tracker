import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Controller } from 'react-hook-form';

export default function Calendar(props) {
    const { label, name, control, width } = props;

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Controller
                name={name}
                control={control}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <DatePicker
                        label={label}
                        value={value || null}
                        onChange={onChange}
                        slotProps={{
                            textField: {
                                error: !!error,
                                helperText: error ? error.message : null,
                                fullWidth: true,
                            },
                        }}
                        sx={{ width: width }}
                    />
                )}
            />
        </LocalizationProvider>
    );
}
