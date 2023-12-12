import {Box, SxProps, Theme, useTheme} from "@mui/material";
import {ReactNode} from "react";

interface Props {
    children: ReactNode;
}

const DataCard = ({ children }: Props) => {
    const theme = useTheme();

    return (
        <Box sx={{
            backgroundColor: `${theme.palette.component.medium}`,
            paddingLeft: '10px',
            paddingRight: '10px',
            paddingTop: '10px',
            paddingBottom: '40px',
            marginBottom: '40px',
            marginTop: '5px',
            marginLeft: '5px',
            marginRight: '5px',
            height: '100%',
            borderRadius: '19px'
        }}>
            {children}
        </Box>
    );
};

export default DataCard;