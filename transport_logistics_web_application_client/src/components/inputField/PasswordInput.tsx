import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { IconButton, InputAdornment } from '@mui/material';
import { MouseEvent, useState } from 'react';
import { FieldValues } from 'react-hook-form';

import TextFieldElement, { TextFieldElementProps } from './TextFieldInput.tsx';

export type PasswordElementProps<T extends FieldValues> = TextFieldElementProps<T>;

export default function PasswordElement<T extends FieldValues>(props: PasswordElementProps<T>): JSX.Element {
    const [password, setPassword] = useState<boolean>(true);
    return (
        <TextFieldElement
            {...props}
            InputProps={{
                ...props.InputProps,
                endAdornment: (
                    <InputAdornment position={'end'}>
                        <IconButton
                            onMouseDown={(e: MouseEvent<HTMLButtonElement>) => e.preventDefault()}
                            onClick={() => setPassword(!password)}
                            tabIndex={-1}
                        >
                            {password ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                    </InputAdornment>
                ),
            }}
            type={password ? 'password' : 'text'}
        />
    );
}
