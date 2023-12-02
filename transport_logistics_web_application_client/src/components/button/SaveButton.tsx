import {Button} from "@mui/material";
import type {SxProps, Theme} from "@mui/material";

interface Props {
    text: string;
    type?: string;
    onClick?: () => void;
    disabled?: boolean;
}

const SaveButton = ({ text, type, onClick, disabled }: Props) => {
    return (
        <Button
            type={type}
            data-testid='save-button'
            sx={{
                fontWeight: 'regular',
                fontSize: '14px',
                color: '#ffffff',
                backgroundColor: '#DD1C13',
                borderRadius: '31px',
                marginLeft: '20px',
                marginRight: '20px',
                marginTop: '20px',
                marginBottom: '20px',
                paddingTop: '4px',
                paddingBottom: '4px',
                paddingLeft: '30px',
                paddingRight: '30px',
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

export default SaveButton;