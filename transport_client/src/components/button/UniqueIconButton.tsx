import {Button, useTheme} from "@mui/material";

interface Props {
    type?: string;
    onClick?: () => void;
    disabled?: boolean;
    icon?: React.ReactNode;
    backgroundColor?: string;
    color?: string;
}

const UniqueIconButton = ({ type, onClick, disabled, icon, backgroundColor, color }: Props) => {
    const theme = useTheme();

    return (
        <Button
            type={type}
            data-testid='save-button'
            sx={{
                color: color || `${theme.palette.component.lightMin}`,
                backgroundColor: backgroundColor || `${theme.palette.component.dark}`,
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
            onClick={() => !disabled && onClick && onClick()}
        >
            {icon}
        </Button>
    );
};

export default UniqueIconButton;