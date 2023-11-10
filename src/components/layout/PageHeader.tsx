import {Box, SxProps, Theme, Typography} from '@mui/material';

const titleStyle: SxProps<Theme> = {
    fontWeight: 700,
    fontSize: '16px',
    lineHeight: '20px',
    color: '#DD1C13'
}

interface Props {
    text: string;
}

const PageHeader = ({ text }: Props) => {
    return (
        <>
            <Box>
                <Typography sx={titleStyle}>{text}</Typography>
            </Box>
        </>
    );
};

export default PageHeader;