import {Box, TextField, Typography} from "@mui/material";
import SmallBackgroundCard from "../../components/layout/SmallBackgroundCard.tsx";
import WideSaveButton from "../../components/button/WideSaveButton.tsx";

const ForgottenPassword = () => {
    return (
        <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <SmallBackgroundCard>
                <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                    <Typography sx={{color: '#000000', fontWeight: 'bold', fontSize: '16px', marginTop: 5, marginBottom: 5}}>Reset Password</Typography>
                    <Typography sx={{color: '#000000', fontWeight: 'light', fontSize: '12px', marginTop: 1, marginBottom: 2}}>
                        Please enter your email address and we will send you an email for reset password
                    </Typography>
                </Box>
                <Box sx={{display: 'flex', flexDirection: 'column'}}>
                    <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                </Box>
                <Typography sx={{display: 'flex', justifyContent: 'right', color: '#DD1C13', fontWeight: 'light', fontSize: '12px', marginTop: 1, marginBottom: 2}}>Sign in</Typography>
                <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <WideSaveButton text={'Reset Password'} />
                </Box>
            </SmallBackgroundCard>
        </Box>
    );
};

export default ForgottenPassword;