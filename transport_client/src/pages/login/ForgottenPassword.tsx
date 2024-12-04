import {Box, FormControl, FormHelperText, TextField, Typography} from "@mui/material";
import SmallBackgroundCard from "../../components/layout/SmallBackgroundCard";
import WideSaveButton from "../../components/button/WideSaveButton";
import {useTypeSafeTranslation} from "@/components/inputfield/hooks/useTypeSafeTranslation";
import {useNavigate} from "react-router-dom";
import React, {useState} from "react";
import axios from "axios";

const ForgottenPassword = () => {
    const { t } = useTypeSafeTranslation();
    const navigate = useNavigate();
    const [emailError, setEmailError] = useState(false);
    const [values, setValues] = useState({
        email: ''
    })

   /* const {
        control,
    } = useForm<ResetPasswordFormSchema>({
        defaultValues: {
            email: '',
        },
        resolver: zodResolver(resetPasswordFormSchema),
        mode: 'all',
    });*/

    const handleChange = (prop: string) => (event: React.ChangeEvent<{value: unknown}>) => {
        const value = event.target.value;

        if (prop === 'email') {
            setValues({...values, [prop]: value as string});
            setEmailError(false);
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            if (!values.email) {
                setEmailError(true);
                return;
            }

            const response = await axios.post(
                'http://localhost:3001/auth/requestPasswordReset',
                { email: values.email }
            );

            if (response.status === 200) {
                alert('Password reset link sent to your email!');
            } else {
                alert('Failed to send password reset link. Please try again.');
            }
            console.log(response.data);
        } catch (error: any) {
            console.error('Error requesting password reset:', error);
            alert(error.response?.data?.message || 'Something went wrong.');
        }
    };

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
                                autoFocus
                                required
                                id="email-input"
                                name='email'
                                label={t('TEXT.EMAIL')}
                                value={values.email}
                                onChange={handleChange('email')}
                                data-testid='email-input'
                            />
                            {emailError && <FormHelperText>This field is required</FormHelperText>}
                        </FormControl>
                    </Box>
                    <Typography
                        onClick={() => navigate(`/login`)}
                        sx={{
                            display: 'flex',
                            justifyContent: 'right',
                            color: '#DD1C13',
                            fontWeight: 'light',
                            fontSize: '12px',
                            marginTop: 1,
                            marginBottom: 2,
                            letterSpacing: 1,
                            cursor: 'pointer'
                        }}
                    >
                        {t('TEXT.SIGN_IN')}
                    </Typography>
                    <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <WideSaveButton type="submit" text={t('TEXT.SEND')} onClick={(e: any) => handleSubmit(e)} disabled={emailError} />
                    </Box>
                </form>
            </SmallBackgroundCard>
        </Box>
    );
};

export default ForgottenPassword;