import {Box, SxProps, Theme, Typography, useTheme} from "@mui/material";
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PersonIcon from '@mui/icons-material/Person';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CircleIcon from '@mui/icons-material/Circle';

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
    fontSize: 30,
    color: '#A3A3A3',
    marginLeft: '12px',
    marginRight: '12px',
    marginTop: '10px',
    marginBottom: '10px',
}

const checkBoxStyle: SxProps<Theme> = {
    fontSize: 30,
    color: '#262626',
    marginRight: '30px',
}

interface Props {
    onClick: () => void;
    id: number;
    status: string;
    company: string;
}

const OrderCard = ({ onClick, id, status, company }: Props) => {
    const theme = useTheme();

    return (
        <Box
            onClick={onClick}
            sx={{
                backgroundColor: `${theme.palette.component.lightMin}`,
                borderRadius: '19px',
                border: 1,
                borderColor: "#A3A3A3",
                marginRight: '60px',
                marginBottom: '40px',
                boxShadow: `5px 7px 10px rgba(0,0,0,0.25)`,
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: 1500,
                height: 300
            }}
        >
             <Box  sx={{
                 display: 'flex',
                 flexDirection: 'column',
                 alignSelf: 'flex-start',
                 width: '100%',
                 paddingTop: '15px',
                 paddingLeft: '20px',
                 marginBottom: '10px',
                 backgroundColor: '#F1F1F1',
                 borderRadius: '19px 0 0 19px'
             }}>
                 <Box sx={{
                     display: 'flex',
                     flexDirection: 'row',
                     alignSelf: 'flex-start',
                     justifyContent: 'flex-start',
                     alignItems: 'center',
                     width: '100%',
                     paddingLeft: '20px',
                     marginBottom: '40px'
                 }}>
                     <CheckBoxOutlineBlankIcon sx={checkBoxStyle}/>
                     <Typography sx={{ width: '150px', color: '#262626', fontSize: '25px', fontWeight: 'lighter'}}>#123456</Typography>
                     <Typography sx={{ width: '120px', color: '#ffffff', backgroundColor: '#23ef00', borderRadius: '19px', fontSize: '15px', letterSpacing: '2px', textAlign: 'center', marginRight: '50px'}}>teljesített</Typography>
                     <Typography sx={{ width: '200px', color: '#000000', fontSize: '25px', fontWeight: 'normal', letterSpacing: '1px'}}>BME Trans Zrt.</Typography>
                 </Box>
                 <Box sx={{
                     display: 'flex',
                     flexDirection: 'column',
                     alignSelf: 'flex-start',
                     width: '100%',
                     paddingLeft: '0px',
                     marginBottom: '45px'
                 }}>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignSelf: 'flex-start',
                        alignItems: 'center',
                        width: '100%',
                        paddingLeft: '20px',
                        marginBottom: '10px'
                    }}>
                        <CircleIcon sx={{ fontSize: 25, color: '#ff0000', marginRight: '25px'}}/>
                        <Typography sx={{ fontSize: '16px', fontWeight: 'bolder', marginRight: '50px'}}>2024.10.30. 8:00</Typography>
                        <Typography sx={{ fontSize: '16px'}}>Budapest, Moszkva utca 15.</Typography>
                    </Box>
                     <CircleIcon sx={{ fontSize: 5, color: '#ff6464', marginTop: '10px', marginLeft: '30px'}}/>
                     <CircleIcon sx={{ fontSize: 5, color: '#ff6464', marginTop: '10px', marginLeft: '30px'}}/>
                     <CircleIcon sx={{ fontSize: 5, color: '#ff6464', marginTop: '10px', marginBottom: '10px', marginLeft: '30px'}}/>
                     <Box sx={{
                         display: 'flex',
                         flexDirection: 'row',
                         alignSelf: 'flex-start',
                         alignItems: 'center',
                         width: '100%',
                         paddingLeft: '20px',
                         marginBottom: '10px'
                     }}>
                         <CircleIcon sx={{ fontSize: 25, color: '#ff6464', marginRight: '25px'}}/>
                         <Typography sx={{ fontSize: '16px', fontWeight: 'bolder', marginRight: '50px'}}>2024.10.30. 17:30</Typography>
                         <Typography sx={{ fontSize: '16px'}}>Budapest, Moszkva utca 15.</Typography>
                     </Box>
                 </Box>
                 <Box sx={{
                     position: 'relative',
                     bottom: '10%',
                     display: 'flex',
                     flexDirection: 'row',
                     alignSelf: 'flex-end',
                     width: '100%',
                     paddingLeft: '20px',
                     marginBottom: '10px'
                 }}>
                     <Typography sx={{ color: '#4d4d4d', fontSize: '15px', marginRight: '50px'}}>Távolság: 325 km</Typography>
                     <Typography sx={{ color: '#4d4d4d', fontSize: '15px', marginRight: '50px'}}>Idő: 9 óra 30 perc</Typography>
                 </Box>
             </Box>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignSelf: 'flex-start',
                alignItems: 'flex-start',
                width: '500px',
                paddingLeft: '35px',
                paddingTop: '30px',
                paddingRight: '15px',
                backgroundColor: '#F9F9F9',
                borderRadius: '0 19px 19px 0'
            }}>
                <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'center', flexGrow: 1}}>
                    <LocalShippingIcon sx={iconStyle}/>
                    <Typography sx={mainTextStyle}>MKP-111</Typography>
                </Box>
                <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'center', flexGrow: 1}}>
                    <PersonIcon sx={iconStyle}/>
                    <Typography sx={mainTextStyle}>Sofőr Géza</Typography>
                </Box>
                <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'center', flexGrow: 1}}>
                    <ContentPasteIcon sx={iconStyle}/>
                    <Typography sx={mainTextStyle}>Nincs csatolva</Typography>
                </Box>
                <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'center', flexGrow: 1}}>
                    <RequestQuoteIcon sx={iconStyle}/>
                    <Typography sx={mainTextStyle}>Nincs csatolva</Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default OrderCard;