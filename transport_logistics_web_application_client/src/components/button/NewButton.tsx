import {Button, useTheme} from "@mui/material";
import type {SxProps, Theme} from "@mui/material";
import AddRoundedIcon from '@mui/icons-material/AddRounded';

interface Props {
    onClick?: () => void;
    disabled?: boolean;
}

const iconStyle: SxProps<Theme> = {
    fontWeight: 'regular',
    fontSize: 40,
    color: '#ffffff',
}

const NewButton = ({ onClick, disabled }: Props) => {
    const theme = useTheme();

    return (
        <Button
            data-testid='new-button'
            sx={{
                backgroundColor: `${theme.palette.component.dark}`,
                borderRadius: '10px',
                paddingTop: '10px',
                paddingBottom: '10px',
                paddingLeft: '8px',
                paddingRight: '8px',
                width: 50,
                height: 50
            }}
            onClick={() => {
                if(!disabled && onClick) {
                    onClick();
                }
            }}
        >
            <AddRoundedIcon sx={iconStyle} />
        </Button>
    );
};

export default NewButton;