import {Box, SxProps, Theme, Typography} from '@mui/material';

const titleStyle: SxProps<Theme> = {
    fontWeight: 'light',
    fontSize: '36px',
    lineHeight: '20px',
    color: '#DD1C13',
    marginTop: '40px',
    marginBottom: '40px',
    marginLeft: '20px',
    marginRight: '20px'
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