import PageHeader from "../../components/text/PageHeader";
import BackgroundCard from "../../components/layout/BackgroundCard";
import DataCard from "../../components/layout/DataCard";
import {Box, SxProps, TextField, Theme, Typography} from "@mui/material";
import CancelButton from "../../components/button/CancelButton";
import SaveButton from "../../components/button/SaveButton";
import {useNavigate, useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
import TextFieldInput from "@/components/inputfield/TextFieldInput";
import {useDispatch} from "react-redux";
import {useState} from "react";
import {useForm} from "react-hook-form";
import {userEditFormSchema, UserEditFormSchema} from "@/pages/users/schemas/user-edit-form-schema";
import {zodResolver} from "@hookform/resolvers/zod";

const textStyle: SxProps<Theme> = {
    fontWeight: 'bold',
    fontSize: '16px',
    color: '#000000',
    marginTop: '20px',
    textTransform: 'uppercase',
    marginBottom: 5,
}

interface Props {
    isEditing?: boolean;
    isInputDisabled?: boolean;
}
//TODO

const RequestEdit = ({ isEditing = false, isInputDisabled }: Props) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [t, i18n] = useTranslation();
    const [inputDisabled, setInputDisabled] = useState(isInputDisabled);

    const {
        control,
        setValue,
        reset,
        handleSubmit,
        formState: { isValid },
    } = useForm<UserEditFormSchema>({
        defaultValues: {
            object: '',
            affectedWorkingDay: '',
            reason: '',
            status: '',
        },
        resolver: zodResolver(userEditFormSchema(isEditing)),
        mode: 'all',
    });

    return (
        <Box>
            <PageHeader text={t('REQUEST.NEW_REQUESTS')}/>
            <BackgroundCard>
                <DataCard>
                    <Box sx={{display: 'flex', flexDirection: 'column'}}>
                        <Typography sx={textStyle}>
                            {t('REQUEST.OBJECT')}
                        </Typography>
                        <TextField
                            placeholder={t('REQUEST.OBJECT')}
                            control={control}
                            name='object'
                            type='text'
                            data-testid='family-name-input'
                            disabled={inputDisabled}
                            required
                            style={{
                                backgroundColor: "#ffffff",
                                borderRadius: 20
                            }}
                            InputProps={{
                                style: {
                                    color: "#000000"
                                }
                            }}
                        />

                        <Typography sx={textStyle}>
                            {t('REQUEST.AFFECTED_WORKING_DAY')}
                        </Typography>
                        <TextField
                            placeholder={t('REQUEST.AFFECTED_WORKING_DAY')}
                            control={control}
                            name='affectedWorkingDay'
                            type='text'
                            data-testid='family-name-input'
                            disabled={inputDisabled}
                            required
                            style={{
                                backgroundColor: "#ffffff",
                                borderRadius: 20
                            }}
                            InputProps={{
                                style: {
                                    color: "#000000"
                                }
                            }}
                        />

                        <Typography sx={textStyle}>
                            {t('REQUEST.REASON')}
                        </Typography>
                        <TextField
                            placeholder={t('REQUEST.REASON')}
                            control={control}
                            name='reason'
                            type='text'
                            data-testid='family-name-input'
                            disabled={inputDisabled}
                            required
                            multiline
                            rows={4}
                            style={{
                                backgroundColor: "#ffffff",
                                borderRadius: 20
                            }}
                            InputProps={{
                                style: {
                                    color: "#000000"
                                }
                            }}
                        />

                        <Typography sx={textStyle}>
                            {t('REQUEST.STATUS')}
                        </Typography>
                        <TextField
                            placeholder={t('REQUEST.STATUS')}
                            control={control}
                            name='status'
                            type='text'
                            data-testid='family-name-input'
                            disabled={inputDisabled}
                            required
                            style={{
                                backgroundColor: "#ffffff",
                                borderRadius: 20
                            }}
                            InputProps={{
                                style: {
                                    color: "#000000"
                                }
                            }}
                        />
                    </Box>
                </DataCard>

                <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
                    <CancelButton text={t('TEXT.CANCEL')} onClick={() => navigate(-1)}/>
                    <SaveButton text={t('TEXT.SEND')} onClick={() => console.log('send')} />
                </Box>
            </BackgroundCard>
        </Box>
    );
};

export default RequestEdit;