import {Button, SxProps, Theme} from "@mui/material";
import AddRoundedIcon from '@mui/icons-material/AddRounded';

const buttonStyle: SxProps<Theme> = {
    backgroundColor: '#DD1C13',
    borderRadius: '10px',
    paddingTop: '10px',
    paddingBottom: '10px',
    paddingLeft: '8px',
    paddingRight: '8px',
    width: 50,
    height: 50
}

const iconStyle: SxProps<Theme> = {
    fontWeight: 'regular',
    fontSize: 40,
    color: '#ffffff',
}

const NewButton = () => {
    return (
        <Button sx={buttonStyle}>
            <AddRoundedIcon sx={iconStyle} />
        </Button>
    );
};

export default NewButton;