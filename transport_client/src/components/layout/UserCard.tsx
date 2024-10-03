import {Box, SxProps, Theme, Typography, useTheme} from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';

const textStyle: SxProps<Theme> = {
    fontWeight: 'bold',
    fontSize: '14px',
    color: '#DD1C13',
    marginTop: '20px',
    textTransform: 'uppercase',
}

const iconStyle: SxProps<Theme> = {
    fontSize: 100,
    color: '#A3A3A3',
    marginLeft: '40px',
    marginRight: '40px',
    marginTop: '20px',
    marginBottom: '10px',
}

interface Props {
    onClick: () => void;
    id: number;
    fullName: string;
    position: string;
    phoneNumber: string;
    image: string;
}

const UserCard = ({ onClick, id, fullName, position, phoneNumber, image }: Props) => {
    const theme = useTheme();

    return (
        <Box
            onClick={onClick}
            sx={{
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
                display: 'flex',
                width: 270
            }}
        >
            <Box sx={{display: 'flex', align: 'center', justifyContent: 'center', backgroundColor: '#ececec', height: 110, width: 110, borderRadius: 90, marginRight: 3}}>
                <PersonIcon sx={iconStyle}/>
            </Box>
            <Box sx={{display: 'flex', flexDirection: 'column'}}>
                <Typography sx={textStyle}>
                    {fullName}
                </Typography>
                <Typography>
                    {position}
                </Typography>
                <Typography>
                    {phoneNumber}
                </Typography>
            </Box>
        </Box>
    );
};

export default UserCard;