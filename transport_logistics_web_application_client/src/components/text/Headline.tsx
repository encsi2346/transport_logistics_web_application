import {Box, Typography, useTheme} from "@mui/material";
import {SxProps, Theme} from "@mui/material";


const titleStyle: SxProps<Theme> = {
    fontWeight: 700,
    fontSize: '26px',
    lineHeight: '20px',
    color: '#DD1C13',
    marginTop: '20px',
    marginBottom: '20px',
    marginLeft: '10px',
    marginRight: '10px'
}

interface Props {
    text: string;
}

const Headline = ({ text }: Props) => {
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

export default Headline;