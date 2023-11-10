import type { TextFieldProps } from '@mui/material';
import { TextField } from '@mui/material';
import { Control, Controller, ControllerProps, FieldError, FieldValues, Path } from 'react-hook-form';

export type TextFieldInputProps<T extends FieldValues> = Omit<TextFieldProps, 'name'> & {
    validation?: ControllerProps['rules'];
    name: Path<T>;
    parseError?: (error: FieldError) => string;
    control: Control<T>;
    showErrorMessage?: boolean;
    externalError?: boolean;
};

export default function TextFieldInput<T extends FieldValues>({
    validation = {},
    parseError,
    type,
    required,
    name,
    control,
    showErrorMessage = true,
    externalError = false,
    ...rest
}: TextFieldInputProps<T>): JSX.Element {

    if (required) {
        validation.required = 'REQUIRED';
    }

    return (
        <Controller
            name={name}
            control={control}
            rules={validation}
            render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
                <TextField
                    {...rest}
                    name={name}
                    value={value ?? ''}
                    onChange={(event) => {
                        let value: string | number | undefined = event.target.value;
                        if (type === 'number') {
                            value = value ? Number(value) : undefined;
                        }
                        onChange(value);
                    }}
                    onBlur={onBlur}
                    required={required}
                    type={type}
                    error={!!error || externalError}
                    helperText={
                        showErrorMessage
                            ? error
                                ? typeof parseError === 'function'
                                    ? parseError(error)
                                    : error.message
                                : rest.helperText
                            : null
                    }
                    onWheel={(e) => {
                        (e.target as HTMLInputElement).blur();
                    }}
                />
            )}
        />
    );
}
