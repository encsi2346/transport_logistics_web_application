import {ReactNode} from "react";
import {Box, SxProps, Theme} from "@mui/material";

const backgroundStyle: SxProps<Theme> = {
    backgroundColor: '#ffffff',
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
}

interface Props {
    children: ReactNode;
}

const SmallBackgroundCard = ({ children }: Props) => {
    return (
        <Box sx={backgroundStyle}>
            {children}
        </Box>
    );
};

export default SmallBackgroundCard;