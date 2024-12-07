import {Box, SxProps, Theme, Typography, useTheme} from "@mui/material";
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';

const textStyle: SxProps<Theme> = {
    fontWeight: 'bold',
    fontSize: '18px',
    color: '#ffffff',
    marginTop: '2px',
    textTransform: 'uppercase',
}

const mediumTextStyle: SxProps<Theme> = {
    fontWeight: 'normal',
    fontSize: '15px',
    color: '#ffffff',
    marginTop: '10px',
}

interface Props {
    onClick: () => void;
    companyId: number;
    companyName: string;
    email: string;
    phoneNumber: string;
    contactPersonName: string;
}

const CompanyCard = ({ onClick, companyId, companyName, email, phoneNumber, contactPersonName }: Props) => {
    const theme = useTheme();

    return (
        <Box
            onClick={onClick}
            sx={{
                backgroundColor: '#000000', //`${theme.palette.component.lightMin}`,
                background: 'transparent',
                border: '2px solid rgba(255, 255, 255, .2)',
                backdropFilter: 'blur(80px)',
                borderRadius: '19px',
                marginRight: '60px',
                marginBottom: '40px',
                paddingTop: '30px',
                paddingBottom: '30px',
                paddingLeft: '20px',
                paddingRight: '20px',
                boxShadow: `5px 7px 10px rgba(0,0,0,0.25)`,
                cursor: 'pointer', //TODO: create hover-effect
                width: 350,
                height: 250,
                display: 'flex',
                flexDirection: 'column',
                position: "relative",
            }}
        >
            <Box sx={{paddingBottom: '30px'}}>
                <Typography sx={textStyle}>
                    {companyName}
                </Typography>
            </Box>
            <div style={{borderTop: "1px solid #000000 ", marginLeft: 3, marginRight: 3}}></div>
            <Box>
                <Typography sx={mediumTextStyle}>
                    <MiscellaneousServicesIcon sx={{width: 20}}/> {email}
                </Typography>
                <Typography sx={mediumTextStyle}>
                    <MiscellaneousServicesIcon sx={{width: 20}}/> {phoneNumber}
                </Typography>
                <Typography sx={mediumTextStyle}>
                    <MiscellaneousServicesIcon sx={{width: 20}}/> {contactPersonName}
                </Typography>
            </Box>
        </Box>
    );
};

export default CompanyCard;