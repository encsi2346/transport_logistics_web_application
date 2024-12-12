import {Box, SxProps, Theme, Typography, useTheme} from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import Avatar from "@mui/material/Avatar";
import React from "react";
import Genie from "@/assets/genie.png";

const textStyleFirst: SxProps<Theme> = {
    fontWeight: '400',
    fontSize: '15px',
    color: '#262626',
    textTransform: 'capitalize',
    letterSpacing: '1px',
    wordBreak: 'break-word',
    display: 'inline-block',
}

const textStyleSecond: SxProps<Theme> = {
    fontWeight: '600',
    fontSize: '13px',
    color: '#262626',
    marginTop: '12px',
    textTransform: 'capitalize',
    letterSpacing: '1px'
}

const textStyleThird: SxProps<Theme> = {
    fontWeight: '400',
    fontSize: '11px',
    color: '#5d5d5d',
    marginTop: '12px',
    textTransform: 'capitalize',
    letterSpacing: '1px'
}

const textStyleFourth: SxProps<Theme> = {
    fontWeight: '400',
    fontSize: '11px',
    color: '#5d5d5d',
    marginTop: '3px',
    textTransform: 'capitalize',
    letterSpacing: '1px'
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
    firstName: string;
    familyName: string;
    email: string;
    position: string;
    status: string;
    phoneNumber: string;
    image: string;
}

const UserCard = ({ onClick, id, firstName, familyName, email, position, status, phoneNumber, image }: Props) => {
    const theme = useTheme();

    return (
        <Box
            onClick={onClick}
            sx={{
                backgroundColor: '#ffffff', //`${theme.palette.component.lightMin}`,
                background: 'transparent',
                border: '2px solid rgba(255, 255, 255, .2)',
                backdropFilter: 'blur(30px)',
                borderRadius: '19px',
                //marginRight: '60px',
                marginBottom: '40px',
                paddingTop: '10px',
                paddingBottom: '20px',
                paddingLeft: '25px',
                paddingRight: '20px',
                boxShadow: `0 0 10px rgba(0,0,0,0.2)`,
                cursor: 'pointer', //TODO: create hover-effect
                display: 'flex',
                flexDirection: 'row',
                width: '100%',
                height: 'auto',
                position: 'relative', // Ensure the circles are behind the card content
                zIndex: 1, // Set a higher z-index for the card itself
                overflow: 'hidden',
                '&:hover': {
                    paddingTop: '15px',
                    paddingBottom: '15px',
                    paddingLeft: '15px',
                    paddingRight: '15px',
                },
                [theme.breakpoints.up('sm')]: {
                    width: 370,
                    height: 200,
                }
            }}
        >
            {/* Background Circles*/}
            <Box
                sx={{
                    position: 'absolute',
                    top: '-40px',
                    left: '60px',
                    width: '150px',
                    height: '150px',
                    borderRadius: '50%',
                    backgroundColor: '#e3e3e3',
                    filter: 'blur(30px)',
                    zIndex: -1,
                }}
            />
            <Box
                sx={{
                    position: 'absolute',
                    top: '100px',
                    right: '-40px',
                    width: '130px',
                    height: '130px',
                    borderRadius: '50%',
                    backgroundColor: '#e3e3e3',
                    filter: 'blur(50px)',
                    zIndex: -1,
                }}
            />

            <Box
                sx={{
                    position: 'absolute',
                    top: '150px',
                    right: '40px',
                    width: '150px',
                    height: '150px',
                    borderRadius: '50%',
                    backgroundColor: '#c4c4c4',
                    filter: 'blur(30px)',
                    zIndex: -1,
                }}
            />

            <Box
                sx={{
                    position: 'absolute',
                    top: '80px',
                    right: '190px',
                    width: '150px',
                    height: '150px',
                    borderRadius: '50%',
                    backgroundColor: '#c4c4c4',
                    filter: 'blur(60px)',
                    zIndex: -1,
                }}
            />

            <Box sx={{
                display: 'flex',
                align: 'center',
                justifyContent: 'center',
                backgroundColor: '#ececec',
                height: 80,
                width: 80,
                borderRadius: '50%',
                marginRight: 3,
                overflow: 'hidden',
                marginBottom: '20px',
                marginTop: '10px'
            }}>
                <Avatar sx={{ display: 'flex', width: 80, height: 80, borderRadius: '50%', overflow: 'hidden'}}>
                    <img
                        src={Genie}
                        alt="logo"
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                        }}
                        loading="lazy"
                    />
                </Avatar>
                {/*<PersonIcon sx={iconStyle}/>*/}
            </Box>
            <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', flexGrow: 1}}>
                <Typography sx={textStyleFirst}>
                    {familyName} {firstName}
                </Typography>
                <Typography sx={textStyleSecond}>
                    {position}
                </Typography>
                <Typography sx={textStyleThird}>
                    {phoneNumber}
                </Typography>
                <Typography sx={textStyleFourth}>
                    {email}
                </Typography>
            </Box>
        </Box>
    );
};

export default UserCard;