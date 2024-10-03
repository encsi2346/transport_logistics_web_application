import type { TextFieldProps } from '@mui/material';
import {ListSubheader, MenuItem, TextField, useTheme} from '@mui/material';
import { Control, Controller, ControllerProps, FieldError, FieldValues, Path } from 'react-hook-form';

export type SelectInputProps<T extends FieldValues> = Omit<TextFieldProps, 'name' | 'type' | 'onChange'> & {
    validation?: ControllerProps['rules'];
    name: Path<T>;
    options?: any[];
    valueKey?: string;
    labelKey?: string;
    type?: 'string' | 'number' | 'boolean';
    parseError?: (error: FieldError) => string;
    objectOnChange?: boolean;
    onChange?: (value: any) => void;
    control: Control<T>;
    showErrorMessage?: boolean;
};

export default function SelectInput<T extends FieldValues>({
   name,
   required,
   valueKey = 'id',
   labelKey = 'title',
   options = [],
   parseError,
   type,
   objectOnChange,
   validation = {},
   control,
   showErrorMessage = true,
   ...rest
}: SelectInputProps<T>): JSX.Element {
    const theme = useTheme();

    if (required) {
        validation.required = 'REQUIRED';
    }

    return (
        <Controller
            name={name}
            rules={validation}
            control={control}
            render={({ field: { onBlur, onChange, value }, fieldState: { invalid, error } }) => {
                // handle shrink on number input fields
                if (type === 'number' && value) {
                    rest.InputLabelProps = rest.InputLabelProps || {};
                    rest.InputLabelProps.shrink = true;
                }
                if (typeof value === 'object') {
                    value = value?.[valueKey] as any; // if value is object get key
                }
                return (
                    <TextField
                        {...rest}
                        name={name}
                        value={type === 'boolean' ? value : value ?? ''}
                        onBlur={onBlur}
                        onChange={(event) => {
                            let item: number | string | boolean = event.target.value;
                            if (type === 'number') {
                                item = Number(item);
                            }
                            onChange(item);
                            if (typeof rest.onChange === 'function') {
                                if (objectOnChange) {
                                    item = options.find((i) => i[valueKey] === item);
                                }
                                rest.onChange(item);
                            }
                        }}
                        select
                        required={required}
                        error={invalid}
                        InputProps={{
                            disableUnderline: 'true',
                            style: {
                                backgroundColor: `${theme.palette.component.lightMin}`,
                                borderRadius: '13px',
                                color: '#000000',
                                textDecoration: 'none',
                                height: 40,
                                width: 250,
                                fontSize: "15px",
                                paddingLeft: 10,
                                paddingBottom: 0,
                            }
                        }}
                        helperText={
                            showErrorMessage
                                ? error
                                    ? typeof parseError === 'function'
                                        ? parseError(error)
                                        : error.message
                                    : rest.helperText
                                : null
                        }
                    >
                        {options.map((item: any) => {
                            if (item.isGroup) {
                                return <ListSubheader key={`${name}_${item[valueKey]}_header`}>{item[labelKey]}</ListSubheader>;
                            } else {
                                return (
                                    <MenuItem key={`${name}_${item[valueKey]}`} value={item[valueKey]}>
                                        {item[labelKey]}
                                    </MenuItem>
                                );
                            }
                        })}
                    </TextField>
                );
            }}
        />
    );
}
