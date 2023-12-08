import {Box, Typography} from "@mui/material";
import SmallBackgroundCard from "../../components/layout/SmallBackgroundCard.tsx";
import WideSaveButton from "../../components/button/WideSaveButton.tsx";
import {useTypeSafeTranslation} from "../../components/inputField/hooks/useTypeSafeTranslation.tsx";
import {useNavigate} from "react-router-dom";
import TextFieldInput from "../../components/inputField/TextFieldInput.tsx";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {resetPasswordFormSchema, ResetPasswordFormSchema} from "./schema/reset-password-schema.ts";

const ForgottenPassword = () => {
    const { t } = useTypeSafeTranslation();
    const navigate = useNavigate();

    const {
        control,
    } = useForm<ResetPasswordFormSchema>({
        defaultValues: {
            email: '',
        },
        resolver: zodResolver(resetPasswordFormSchema),
        mode: 'all',
    });

    return (
        <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 20}}>
            <SmallBackgroundCard>
                <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                    <Typography sx={{color: '#000000', fontWeight: 'bold', fontSize: '16px', marginTop: 5, marginBottom: 7}}>
                        {t('TEXT.RESET_PASSWORD')}
                    </Typography>
                    <Typography sx={{color: '#000000', fontWeight: 'light', fontSize: '12px', marginTop: 1, marginBottom: 5}}>
                        {t('TEXT.RESET_PASSWORD_MESSAGE')}
                    </Typography>
                </Box>
                <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 2, marginBottom: 2}}>
                    <TextFieldInput
                        label={t('TEXT.EMAIL')}
                        control={control}
                        name='email'
                        type='text'
                        data-testid='email-input'
                        required
                    />
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
                    <WideSaveButton text={t('TEXT.SEND')} />
                </Box>
            </SmallBackgroundCard>
        </Box>
    );
};

export default ForgottenPassword;