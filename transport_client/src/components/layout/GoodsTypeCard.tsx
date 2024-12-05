import {Box, SxProps, Theme, Typography, useTheme} from "@mui/material";
import MicrosoftIcon from '@mui/icons-material/Microsoft';

const mainTextStyle: SxProps<Theme> = {
    fontWeight: 'bold',
    fontSize: '14px',
    color: '#000000',
    marginTop: '20px',
}

const mediumTextStyle: SxProps<Theme> = {
    fontWeight: 'bold',
    fontSize: '13px',
    color: '#DD1C13',
    marginTop: '10px',
    textTransform: 'uppercase',
}

const iconStyle: SxProps<Theme> = {
    fontSize: 120,
    color: '#A3A3A3',
    marginLeft: '12px',
    marginRight: '12px',
    marginTop: '10px',
    marginBottom: '10px',
}

interface Props {
    onClick: () => void;
    id: number;
    name: string;
    status: string;
}

const GoodsTypeCard = ({ onClick, id, name, status }: Props) => {
    const theme = useTheme();

    return (
        <Box
            onClick={onClick}
            sx={{
                backgroundColor: `${theme.palette.component.lightMin}`,
                borderRadius: '19px',
                marginRight: '60px',
                marginBottom: '40px',
                paddingTop: '5px',
                paddingBottom: '5px',
                paddingLeft: '5px',
                paddingRight: '5px',
                boxShadow: `5px 7px 10px rgba(0,0,0,0.25)`,
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: 220,
                height: 300
            }}
        >
            <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexGrow: 1}}>
                <MicrosoftIcon sx={iconStyle}/>
            </Box>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignSelf: 'flex-start', // Align text to the left
                width: '100%', // Ensure text spans the width
                paddingLeft: '20px', // Add padding to start from the left
                marginBottom: '10px'
            }}>
                <Typography sx={mainTextStyle}>{name}</Typography>
                <Typography sx={mediumTextStyle}>{status}</Typography>
            </Box>
        </Box>
    );
};

export default GoodsTypeCard;