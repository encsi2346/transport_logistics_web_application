import { FormControl, FormHelperText, InputLabel } from '@mui/material';
import { useId } from 'react';
import { Control, Controller, ControllerProps, FieldError, FieldValues, Path } from 'react-hook-form';

export type NumberInputFieldProps<T extends FieldValues> = Omit<NumberInputProps, 'name'> & {
    validation?: ControllerProps['rules'];
    name: Path<T>;
    parseError?: (error: FieldError) => string;
    control: Control<T>;
    showErrorMessage?: boolean;
};

export default function NumberInputField<T extends FieldValues>({
  validation = {},
  parseError,
  type,
  required,
  name,
  control,
  showErrorMessage = true,
  ...rest
}: NumberInputFieldProps<T>): JSX.Element {
    const id = useId();

    if (required) {
        validation.required = 'REQUIRED';
    }

    return (
        <Controller
            name={name}
            control={control}
            rules={validation}
            render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
                <FormControl error={!!error} disabled={rest.disabled} fullWidth>
                    <InputLabel
                        htmlFor={`number-input-${id}`}
                        required={!!rest.label && required}
                        sx={{
                            '&:not(.MuiFormLabel-filled):not(.Mui-focused)': {
                                transform: 'translate(14px, 9px) scale(1)',
                            },
                        }}
                    >
                        {rest.label}
                    </InputLabel>
                    <NumberInput
                        max={rest.precision ? Number.MAX_VALUE : Number.MAX_SAFE_INTEGER}
                        {...rest}
                        id={`number-input-${id}`}
                        name={name}
                        value={value ?? undefined}
                        onChange={(value) => {
                            if (typeof value === 'number') {
                                onChange(value);
                            } else if (value === undefined) {
                                onChange(null);
                            }
                        }}
                        onBlur={onBlur}
                        required={required}
                        type={type}
                        precision={rest.precision ?? 0}
                    />
                    <FormHelperText id={`number-input-helper-${id}`}>
                        {showErrorMessage && error ? (typeof parseError === 'function' ? parseError(error) : error.message) : null}
                    </FormHelperText>
                </FormControl>
            )}
        />
    );
}
