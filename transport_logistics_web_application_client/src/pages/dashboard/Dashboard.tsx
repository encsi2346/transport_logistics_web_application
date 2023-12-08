import BackgroundCard from "../../components/layout/BackgroundCard.tsx";
import TodayCard from "../../components/todayCard/todayCard.tsx";
import {Box} from "@mui/material";
import WorkedTime from "../../components/charts/DrivingTime.tsx";
import DrivenKilometres from "../../components/charts/DrivenKilometres.tsx";

const Dashboard = () => {

    return (
        <Box>
            <BackgroundCard>
                <TodayCard />
                <Box sx={{ display: 'flex', marginTop: 20, marginBottom: 10}}>
                    <Box sx={{ width: 500, height: 300, marginLeft: 8}}>
                        <WorkedTime />
                    </Box>
                    <Box sx={{ width: 500, height: 300, marginLeft: 29}}>
                        <DrivenKilometres />
                    </Box>
                </Box>
            </BackgroundCard>
        </Box>
    );
};

export default Dashboard;