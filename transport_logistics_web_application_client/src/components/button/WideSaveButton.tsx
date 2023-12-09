import {Button, useTheme} from "@mui/material";

interface Props {
    text: string;
    type?: string;
    onClick?: () => void;
    disabled?: boolean;
}

const WideSaveButton = ({ text, type, onClick, disabled }: Props) => {
    const theme = useTheme();

    return (
        <Button
            type={type}
            data-testid='wide-save-button'
            sx={{
                fontWeight: 'regular',
                fontSize: '14px',
                color: `${theme.palette.component.lightMin}`,
                backgroundColor: `${theme.palette.component.dark}`,
                borderRadius: '31px',
                marginLeft: '20px',
                marginRight: '20px',
                marginTop: '20px',
                marginBottom: '20px',
                paddingTop: '4px',
                paddingBottom: '4px',
                paddingLeft: '100px',
                paddingRight: '100px',
                textTransform: 'none',
            }}
            onClick={() => {
                if(!disabled && onClick) {
                    onClick();
                }
            }}
        >
            {text}
        </Button>
    );
};

export default WideSaveButton;