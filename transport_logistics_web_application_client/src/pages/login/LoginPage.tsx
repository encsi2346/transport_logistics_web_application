import {Box, Typography} from "@mui/material";
import SmallBackgroundCard from "../../components/layout/SmallBackgroundCard.tsx";
import WideSaveButton from "../../components/button/WideSaveButton.tsx";
import TextFieldInput from "../../components/inputField/TextFieldInput.tsx";
import PasswordInput from "../../components/inputField/PasswordInput.tsx";
import {loginFormSchema, LoginFormSchema} from "./schema/login-form-schema.ts";
import {useForm} from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {useState} from "react";
import {zodResolver} from "@hookform/resolvers/zod";
import {Navigate} from "react-router-dom";
import { useTypeSafeTranslation } from "../../components/inputField/hook/useTypeSafeTranslation.tsx";

const LoginPage = () => {
    const navigate = useNavigate();
    const { t } = useTypeSafeTranslation();
    const {
        reset,
        trigger,
        watch,
        control,
        handleSubmit,
        formState: { isValid },
    } = useForm<LoginFormSchema>({
        defaultValues: {
            email: '',
            password: '',
        },
        resolver: zodResolver(loginFormSchema),
        mode: 'all',
    });

    //const auth = useAuthentication();

    const [loginFailed, setLoginFailed] = useState(false);

    /*if (auth.isAuthenticated) {
        return <Navigate to="/"/>;
    }*/

    const onSubmit = handleSubmit(async (data) => {
        try {
            //const result = await auth.login(data.email, data.password);
        } catch (e) {
            setLoginFailed(true);
        }
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 20}}>
                <SmallBackgroundCard>
                    <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <Typography sx={{color: '#000000', fontWeight: 'bold', fontSize: '16px', marginTop: 5, marginBottom: 5}}>
                            {t('TEXT.WELCOME')}
                        </Typography>
                    </Box>
                    <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 3}}>
                        {(loginFailed) ?
                            <Typography sx={{
                                color: 'red',
                                fontWeight: 'bold'
                            }}>{t('TEXT.LOGIN_FAILED')}</Typography>
                            : null
                        }
                        <TextFieldInput
                            placeholder={t('TEXT.EMAIL')}
                            control={control}
                            name='email'
                            type='email'
                            data-testid='email-input'
                        />
                        <PasswordInput
                            placeholder={t('TEXT.PASSWORD')}
                            control={control}
                            name='password'
                            data-testid='password-input'
                        />
                    </Box>
                    <Typography sx={{
                        display: 'flex',
                        justifyContent: 'right',
                        color: '#DD1C13',
                        fontWeight: 'light',
                        fontSize: '12px',
                        marginTop: 1,
                        marginBottom: 2
                    }}>
                        Reset Password
                    </Typography>
                    <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <WideSaveButton text={t('TEXT.LOGIN')} control={control} type='submit' onClick={() => navigate("/dashboard")}/>
                    </Box>
                </SmallBackgroundCard>
            </Box>
        </form>
    );
};

export default LoginPage;