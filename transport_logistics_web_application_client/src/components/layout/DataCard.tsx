import {Box, SxProps, Theme} from "@mui/material";
import {ReactNode} from "react";

const backgroundStyle: SxProps<Theme> = {
    backgroundColor: '#E3E3E3',
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
}

interface Props {
    children: ReactNode;
}

const DataCard = ({ children }: Props) => {
    return (
        <Box sx={backgroundStyle}>
            {children}
        </Box>
    );
};

export default DataCard;