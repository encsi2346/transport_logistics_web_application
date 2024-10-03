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

const requiredStyle: SxProps<Theme> = {
    fontWeight: 500,
    fontSize: '20px',
    color: '#ff0000',
    marginLeft: '1px',
    marginTop: '10px',
}

interface Props {
    text: string;
    required?: boolean;
}

const NormalText = ({ text, required }: Props) => {
    return (
        <>
            <Box sx={{display: 'flex'}}>
                <Typography sx={titleStyle}>
                    {text}
                </Typography>
                {required &&
                    <Typography sx={requiredStyle}>
                        *
                    </Typography>
                }
            </Box>
        </>
    );
};

export default NormalText;