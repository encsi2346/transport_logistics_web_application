import {Box, Typography} from "@mui/material";
import {SxProps, Theme} from "@mui/material";


const titleStyle: SxProps<Theme> = {
    fontWeight: '500',
    fontSize: '30px', // Default font size
    lineHeight: '20px',
    color: '#DD1C13',
    marginTop: '50px',
    marginBottom: '60px',
    marginLeft: '35px',
    marginRight: '20px',
    letterSpacing: '1px',
    textTransform: 'uppercase',

    // Responsive styles using breakpoints
    [theme => theme.breakpoints.down('sm')]: {
        fontSize: '24px', // Smaller font size for small screens
        marginTop: '50px',
        marginBottom: '40px',
        marginLeft: '20px',
        marginRight: '20px',
    },

    [theme => theme.breakpoints.down('xs')]: {
        fontSize: '20px', // Even smaller font size for extra small screens
        marginTop: '30px',
        marginBottom: '20px',
        marginLeft: '16px',
        marginRight: '16px',
    },
};
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