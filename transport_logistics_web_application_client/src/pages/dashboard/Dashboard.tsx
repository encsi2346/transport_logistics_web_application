import {Box, Typography} from "@mui/material";
import BackgroundCard from "../../components/layout/BackgroundCard.tsx";
import { format } from 'date-fns';
import {useState} from "react";

const Dashboard = () => {
    const [today, setToday] = useState(format(new Date(), 'yyyy.MM.dd.'));
    const [time, setTime] = useState(format(new Date(), 'HH:mm'));

    return (
        <Box sx={{
            marginTop: 7,
            marginBottom: 7,
            marginLeft: 7,
            marginRight: 7
        }}>
            <Box sx={{
                width: 300,
                height: 300,
                backgroundColor: '#DD1C13',
                color: "#ffffff",
                borderRadius: '30px',
                display: 'grid',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Box sx={{display: 'grid'}}>
                    <Typography sx={{
                        fontSize: '15px',
                        fontWeight: 'bold',
                        color: '#ffffff'
                    }}>
                        {today}
                    </Typography>
                </Box>
                <Box sx={{display: 'grid'}}>
                    <Typography sx={{
                        fontSize: '15px',
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

export default Dashboard;