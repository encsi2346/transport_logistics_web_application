import type { TextFieldProps } from '@mui/material';
import type { DatePickerProps } from '@mui/x-date-pickers';
import { DatePicker } from '@mui/x-date-pickers';
import { parseISO } from 'date-fns';
import { Control, Controller, ControllerProps, FieldError, FieldValues, Path } from 'react-hook-form';
import { DatePickerContext } from './context/DatePickerContext';

import DatePickerTextField from './DatePickerTextField';
import {useTheme} from "@mui/material";

export declare type ParseableDate<TDate> = string | number | Date | null | undefined | TDate;

export type DatePickerInputProps<T extends FieldValues, TDate> = Omit<
    DatePickerProps<TDate>,
    'value' | 'onChange' | 'renderInput'
    > & {
    name: Path<T>;
    required?: boolean;
    parseError?: (error: FieldError) => string;
    onChange?: (value?: ParseableDate<TDate>) => void;
    validation?: ControllerProps['rules'];
    parseDate?: (date: ParseableDate<TDate>) => string | null;
    control: Control<T>;
    inputProps?: TextFieldProps;
    helperText?: TextFieldProps['helperText'];
    showErrorMessage?: boolean;
};

export default function DatePickerInput<TFieldValues extends FieldValues>({
  parseError,
  name,
  required,
  parseDate,
  validation = {},
  inputProps,
  control,
  showErrorMessage = true,
  ...rest
}: DatePickerInputProps<TFieldValues, any>): JSX.Element {
    const theme = useTheme();

    return (
        <Controller
            name={name}
            rules={validation}
            control={control}
            render={({ field: { onChange, onBlur, value }, fieldState: { error, invalid } }) => (
                <DatePickerContext.Provider
                    value={{
                        inputProps,
                        testId: `datepicker-${name}`,
                        onBlur,
                        required: !!required,
                        error: invalid,
                        helperText: showErrorMessage
                            ? error
                                ? typeof parseError === 'function'
                                    ? parseError(error)
                                    : error.message
                                : inputProps?.helperText || rest.helperText
                            : null,
                    }}
                >
                    <DatePicker
                        {...rest}
                        value={value ? value : null}
                        onClose={onBlur}
                        sx={{
                            disableUnderline: 'true',
                            textDecoration: 'none',
                            backgroundColor: `${theme.palette.component.lightMin}`,
                            borderRadius: '13px',
                            border: 'none',
                            color: `#000000`,
                            height: 40,
                            width: 250,
                            fontSize: "15px",
                            "& .MuiOutlinedInput-notchedOutline": {
                                border: 'none'
                            }
                        }}
                        onChange={(date: Date, validation) => {
                            onChange(date);
                        }}
                        slots={{
                            textField: DatePickerTextField,
                        }}
                    />
                </DatePickerContext.Provider>
            )}
        />
    );
}
