import {Box, SxProps, Theme, Typography} from "@mui/material";
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

const cardStyle: SxProps<Theme> = {
    backgroundColor: '#ffffff',
    borderRadius: '19px',
    marginRight: '60px',
    marginBottom: '40px',
    paddingTop: '20px',
    paddingBottom: '20px',
    paddingLeft: '20px',
    paddingRight: '20px',
    boxShadow: `5px 7px 10px rgba(0,0,0,0.25)`,
}

const textStyle: SxProps<Theme> = {
    fontWeight: 'bold',
    fontSize: '14px',
    color: '#DD1C13',
    marginTop: '20px',
    textTransform: 'uppercase',
}

const iconStyle: SxProps<Theme> = {
    fontSize: 120,
    color: '#A3A3A3',
    marginLeft: '40px',
    marginRight: '40px',
    marginTop: '20px',
    marginBottom: '10px',
}

interface Props {
    carType: string;
}

const CarTypeCard = ({ carType }: Props) => {
    return (
        <Box sx={cardStyle}>
            <Box sx={{display: 'flex', align: 'center', justifyContent: 'center'}}>
                <LocalShippingIcon sx={iconStyle}/>
            </Box>
            <Typography sx={textStyle}>{carType}</Typography>
        </Box>
    );
};

export default CarTypeCard;