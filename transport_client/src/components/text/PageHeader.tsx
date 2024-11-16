import {Box, Typography} from "@mui/material";
import {SxProps, Theme} from "@mui/material";


const titleStyle: SxProps<Theme> = {
    fontWeight: '500',
    fontSize: '30px',
    lineHeight: '20px',
    color: '#DD1C13',
    marginTop: '70px',
    marginBottom: '60px',
    marginLeft: '32px',
    marginRight: '20px',
    letterSpacing: '1px',
    textTransform: 'uppercase'
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