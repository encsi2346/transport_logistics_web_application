import {Box, FormControl, FormHelperText, TextField, Typography} from "@mui/material";
import SmallBackgroundCard from "../../components/layout/SmallBackgroundCard";
import WideSaveButton from "../../components/button/WideSaveButton";
import {useTypeSafeTranslation} from "../../components/inputField/hooks/useTypeSafeTranslation";
import {useNavigate} from "react-router-dom";
import TextFieldInput from "../../components/inputField/TextFieldInput";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {resetPasswordFormSchema, ResetPasswordFormSchema} from "./schema/reset-password-schema";
import React, {useState} from "react";

const ForgottenPassword = () => {
    const { t } = useTypeSafeTranslation();
    const navigate = useNavigate();
    const [emailError, setEmailError] = useState(false);
    const [values, setValues] = useState({
        email: ''
    })

    const {
        control,
    } = useForm<ResetPasswordFormSchema>({
        defaultValues: {
            email: '',
        },
        resolver: zodResolver(resetPasswordFormSchema),
        mode: 'all',
    });

    const handleChange = (prop: string) => (event: React.ChangeEvent<{value: unknown}>) => {
        const value = event.target.value;

        if (prop === 'email') {
            setValues({...values, [prop]: value as string});
            setEmailError(false);
        }
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        try {
            console.log('handleSubmit');
            console.log('values.email', values.email);
            //TODO: api call
        } catch {}
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