import {Button} from "@mui/material";
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
    return (
        <Button
            data-testid='new-button'
            sx={{
                backgroundColor: '#DD1C13',
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