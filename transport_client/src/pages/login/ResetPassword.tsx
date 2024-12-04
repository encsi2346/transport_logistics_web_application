import {Box, FormControl, FormHelperText, IconButton, InputAdornment, TextField, Typography} from "@mui/material";
import SmallBackgroundCard from "../../components/layout/SmallBackgroundCard";
import WideSaveButton from "../../components/button/WideSaveButton";
import {useTypeSafeTranslation} from "@/components/inputfield/hooks/useTypeSafeTranslation";
import {useLocation, useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";

const ResetPassword = () => {
    const { t } = useTypeSafeTranslation();
    const navigate = useNavigate();
    const location = useLocation();
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const queryParams = new URLSearchParams(location.search);
    const userId = queryParams.get('id');
    const token = queryParams.get('token');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        console.log('id', userId);

        try {
            const response = await axios.post(`http://localhost:3001/auth/resetPassword?id=${userId}&token=${token}`, {
                password: password,
            });
            setSuccess(response.data.message);
            setTimeout(() => navigate('/login'), 3000);
        } catch (err) {
            setError('Failed to reset password. Please try again.');
        }
    };

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);

    useEffect(() => {
        console.log('meghívva');
    }, []);

    return (
        <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 20}}>
            <SmallBackgroundCard>
                <form autoComplete="off" onSubmit={(e) => handleSubmit(e)}>
                    <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                        <Typography sx={{color: '#000000', fontWeight: 'bold', fontSize: '16px', marginTop: 5, marginBottom: 7}}>
                            {t('TEXT.RESET_PASSWORD')}
                        </Typography>
                        <Typography sx={{color: '#000000', fontWeight: 'light', fontSize: '12px', marginTop: 1, marginBottom: 5}}>
                            {t('TEXT.RESET_PASSWORD_MESSAGE')}
                        </Typography>
                    </Box>
                    <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 2, marginBottom: 2}}>
                        <FormControl fullWidth required>
                            <TextField
                                label={t('TEXT.PASSWORD')}
                                type={showPassword ? "text" : "password"}
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                name="password"
                                sx={{ gridColumn: "span 4" }}
                                data-testid="password-input"
                                required
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label={
                                                    showPassword ? 'hide the password' : 'display the password'
                                                }
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"

                                            >
                                                {showPassword ?  <VisibilityOff/> : <Visibility/>}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </FormControl>
                    </Box>
                    <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <WideSaveButton type="submit" text={t('TEXT.SEND')} onClick={(e: any) => handleSubmit(e)} />
                    </Box>
                </form>
            </SmallBackgroundCard>
        </Box>
    );
};

export default ResetPassword;