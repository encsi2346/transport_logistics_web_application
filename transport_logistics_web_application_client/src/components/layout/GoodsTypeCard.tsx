import {Box, SxProps, Theme, Typography} from "@mui/material";
import MicrosoftIcon from '@mui/icons-material/Microsoft';

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
    cursor: 'pointer'
}

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
    marginTop: '20px',
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
    category: string;
    availability: string;
}

const GoodsTypeCard = ({ category, availability }: Props) => {
    return (
        <Box sx={cardStyle}>
            <Box sx={{display: 'flex', align: 'center', justifyContent: 'center'}}>
                <MicrosoftIcon sx={iconStyle}/>
            </Box>
            <Typography sx={mainTextStyle}>{category}</Typography>
            <Typography sx={mediumTextStyle}>{availability}</Typography>
        </Box>
    );
};

export default GoodsTypeCard;