import {Box, SxProps, Theme, Typography, useTheme} from "@mui/material";
import Van from "@/assets/van.png";

const textStyle: SxProps<Theme> = {
    fontWeight: 'bold',
    fontSize: '18px',
    color: '#DD1C13',
    marginTop: '2px',
    textTransform: 'uppercase',
}

const mediumTextStyle: SxProps<Theme> = {
    fontWeight: 'bold',
    fontSize: '15px',
    color: '#000000',
    marginTop: '10px',
    textTransform: 'uppercase',
}

const smallTextStyle: SxProps<Theme> = {
    fontWeight: 'normal',
    fontSize: '14px',
    color: '#A3A3A3',
    marginTop: 'auto',
}

interface Props {
    onClick: () => void;
    carId: number;
    name: string;
    type: string;
    licencePlate: string;
    image: string;
    totalDrivenKm: string;
    totalTransport: number;
}

const CarCard = ({ onClick, carId, name, type, licencePlate, image, totalDrivenKm, totalTransport }: Props) => {
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
                width: 350,
                height: 350,
                display: 'flex',
                flexDirection: 'column',
                position: "relative",
            }}
        >
                <Typography sx={textStyle}>
                    {name}
                </Typography>
                <Typography sx={textStyle}>
                    {type}
                </Typography>
                <Typography sx={mediumTextStyle}>
                    {licencePlate}
                </Typography>
                <Box sx={{ position: "absolute", top: "58%", right: "0", width: "250px", height: "200px", transform: "translateY(-50%)", overflow: "hidden" }}>
                    <img
                        style={{ height: "100%", width: "100%", objectFit: "cover", objectPosition: "left" }}
                        alt="van"
                        src={Van}
                    />
                </Box>
            <Typography sx={smallTextStyle}>
                {totalDrivenKm} km
            </Typography>
            <Typography sx={smallTextStyle}>
                {totalTransport} szállítás
            </Typography>
        </Box>
    );
};

export default CarCard;