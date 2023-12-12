import {ReactNode} from "react";
import {Box, useTheme} from "@mui/material";

interface Props {
    children: ReactNode;
}

const SmallBackgroundCard = ({ children }: Props) => {
    const theme = useTheme();

    return (
        <Box sx={{
            backgroundColor: `${theme.palette.component.lightMin}`,
            paddingLeft: '10px',
            paddingRight: '10px',
            paddingTop: '10px',
            paddingBottom: '10px',
            marginBottom: '10px',
            marginTop: '10px',
            marginLeft: '20px',
            marginRight: '20px',
            height: '100%',
            width: 400,
            borderRadius: '19px'
        }}>
            {children}
        </Box>
    );
};

export default SmallBackgroundCard;