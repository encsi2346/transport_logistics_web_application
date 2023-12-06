import {Box, Typography} from "@mui/material";
import {SxProps, Theme} from "@mui/material";


const titleStyle: SxProps<Theme> = {
    fontWeight: 'light',
    fontSize: '36px',
    lineHeight: '20px',
    color: '#DD1C13',
    marginTop: '70px',
    marginBottom: '60px',
    marginLeft: '32px',
    marginRight: '20px'
}

interface Props {
    text: string;
}

const PageHeader = ({ text }: Props) => {
    return (
        <>
            <Box>
                <Typography sx={titleStyle}>
                    {text}
                </Typography>
            </Box>
        </>
    );
};

export default PageHeader;