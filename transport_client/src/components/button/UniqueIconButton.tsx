import {Button, useTheme} from "@mui/material";

interface Props {
    type?: string;
    onClick?: () => void;
    disabled?: boolean;
    icon?: React.ReactNode;
    backgroundColor?: string;
    color?: string;
    width?: number;
}

const UniqueIconButton = ({ type, onClick, disabled, icon, backgroundColor, color, width }: Props) => {
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
                minWidth: width ?? '45px',
                height: width ?? '45px',
                // Responsive styles using MUI's breakpoints
                [theme.breakpoints.down("sm")]: {
                    minWidth: width ?? "40px", // Smaller width for small screens
                    height: "40px", // Smaller height for small screens
                    paddingTop: "4px", // Reduced padding for small screens
                    paddingBottom: "4px",
                    paddingLeft: "4px",
                    paddingRight: "4px",
                },
                [theme.breakpoints.down("xs")]: {
                    minWidth: width ?? "35px", // Even smaller width for extra small screens
                    height: width ?? "35px", // Smaller height for extra small screens
                    paddingTop: "3px", // Further reduced padding for extra small screens
                    paddingBottom: "3px",
                    paddingLeft: "3px",
                    paddingRight: "3px",
                },
            }}
            onClick={() => !disabled && onClick && onClick()}
        >
            {icon}
        </Button>
    );
};

export default UniqueIconButton;