import {Box, TextField, Typography} from "@mui/material";
import SmallBackgroundCard from "../../components/layout/SmallBackgroundCard.tsx";
import WideSaveButton from "../../components/button/WideSaveButton.tsx";

const LoginPage = () => {
    return (
        <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <SmallBackgroundCard>
                <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <Typography sx={{color: '#000000', fontWeight: 'bold', fontSize: '16px', marginTop: 5, marginBottom: 5}}>SIGN IN</Typography>
                </Box>
                <Box sx={{display: 'flex', flexDirection: 'column'}}>
                    <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                    <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                </Box>
                <Typography sx={{display: 'flex', justifyContent: 'right', color: '#DD1C13', fontWeight: 'light', fontSize: '12px', marginTop: 1, marginBottom: 2}}>Reset Password</Typography>
                <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <WideSaveButton text={'Sign in'} />
                </Box>
            </SmallBackgroundCard>
        </Box>
    );
};

export default LoginPage;