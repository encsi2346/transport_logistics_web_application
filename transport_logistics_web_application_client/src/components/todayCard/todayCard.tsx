import {Box, Typography} from "@mui/material";
import { format } from 'date-fns';
import {useState} from "react";
import clockBackground from '../../assets/clock_background.jpg';

const TodayCard = () => {
    const [today, setToday] = useState({
        month: format(new Date(), 'MMMM'),
        day: format(new Date(), 'dd.')
    });
    const [time, setTime] = useState( format(new Date(), 'HH:mm'));

    return (
        <Box sx={{
            marginTop: 7,
            marginBottom: 7,
            marginLeft: 7,
            marginRight: 7
        }}>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Box sx={{
                    backgroundColor: '#ffffff',
                    width: 110,
                    height: 100,
                    borderRadius: '12px 0 0 12px',
                    display: 'grid',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundImage: `url(${clockBackground})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: "cover"
                }}>
                    <Typography sx={{
                        fontSize: '15px',
                        fontWeight: 'bold',
                        color: '#ffffff',
                        marginTop: 1
                    }}>
                        {today.month}
                    </Typography>
                    <Typography sx={{
                        fontSize: '32px',
                        fontWeight: 'bold',
                        color: '#ffffff',
                        marginTop: -3,
                        marginLeft: 2
                    }}>
                        {today.day}
                    </Typography>
                </Box>
                <Box sx={{
                    backgroundColor: '#DD1C13',
                    width: 200,
                    height: 100,
                    borderRadius: '0 12px 12px 0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <Typography sx={{
                        fontSize: '50px',
                        fontWeight: 'bold',
                        color: '#ffffff'
                    }}>
                        {time}
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default TodayCard;