import {Box, Typography, useTheme} from "@mui/material";
import {SxProps, Theme} from "@mui/material";


const titleStyle: SxProps<Theme> = {
    fontWeight: 500,
    fontSize: '17px',
    lineHeight: '20px',
    color: '#000000',
    marginTop: '20px',
    marginBottom: '20px',
    marginLeft: '10px',
    marginRight: '10px'
}

interface Props {
    text: string;
}

const NormalText = ({ text }: Props) => {
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

export default NormalText;