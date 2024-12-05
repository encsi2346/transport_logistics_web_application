import {Button, useTheme} from "@mui/material";

interface Props {
    type?: string;
    onClick?: () => void;
    disabled?: boolean;
    icon?: React.ReactNode;
}

const IconButton = ({ type, onClick, disabled, icon }: Props) => {
    const theme = useTheme();

    return (
        <Button
            type={type}
            data-testid='save-button'
            sx={{
                color: `${theme.palette.component.lightMin}`,
                backgroundColor: `${theme.palette.component.dark}`,
                borderRadius: '8px',
                marginLeft: '10px',
                paddingTop: '5px',
                paddingBottom: '5px',
                paddingLeft: '5px',
                paddingRight: '5px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minWidth: '50px',
                height: '50px',
            }}
            onClick={() => {
                if(!disabled && onClick) {
                    onClick();
                }
            }}
        >
            {icon}
        </Button>
    );
};

export default IconButton;