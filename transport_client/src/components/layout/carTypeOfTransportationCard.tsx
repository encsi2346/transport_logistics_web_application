import {Box, SxProps, Theme, Typography, useTheme} from "@mui/material";
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

const textStyle: SxProps<Theme> = {
    fontWeight: 'bold',
    fontSize: '20px',
    color: '#DD1C13',
    textTransform: 'uppercase',
}

const smallTextStyle: SxProps<Theme> = {
    fontWeight: 'normal',
    fontSize: '15px',
    color: '#A3A3A3',
}

const iconStyle: SxProps<Theme> = {
    fontSize: 120,
    color: '#A3A3A3',
    marginLeft: '40px',
    marginRight: '70px',
}

interface Props {
    type: string;
    countOfCars: number;
}

const CarTypeOfTransportationCard = ({ type, countOfCars }: Props) => {
    const theme = useTheme();

    return (
        <Box sx={{
            backgroundColor: `${theme.palette.component.lightMin}`,
            borderRadius: '19px',
            marginRight: '60px',
            marginBottom: '40px',
            paddingTop: '20px',
            paddingBottom: '20px',
            paddingLeft: '20px',
            paddingRight: '20px',
            boxShadow: `5px 7px 10px rgba(0,0,0,0.25)`,
            cursor: 'pointer', //TODO: create hover-effect
            justifyContent: 'center'
        }}>
            <Box sx={{display: 'flex', alignItems: 'center', marginTop: 3}}>
                <Box>
                    <LocalShippingIcon sx={iconStyle}/>
                </Box>
                <Typography sx={textStyle}>
                    {type}
                </Typography>
            </Box>
            <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
                <Typography sx={smallTextStyle}>
                    {countOfCars} jármű
                </Typography>
            </Box>
        </Box>
    );
};

export default CarTypeOfTransportationCard;