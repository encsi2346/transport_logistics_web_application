import {Box, SxProps, Theme} from "@mui/material";
import {ReactNode} from "react";

const backgroundStyle: SxProps<Theme> = {
    paddingLeft: '10px',
    paddingRight: '10px',
    paddingTop: '10px',
    paddingBottom: '10px',
    marginBottom: '10px',
    marginTop: '10px',
    marginLeft: '20px',
    marginRight: '20px',
    height: '100%',
}

interface Props {
    children: ReactNode;
}

const ContentCard = ({ children }: Props) => {
    return (
        <Box sx={backgroundStyle}>
            {children}
        </Box>
    );
};

export default ContentCard;