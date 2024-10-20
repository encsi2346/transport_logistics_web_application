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

    const getRequest = async (id: string) => {
        try {
            const getRequestResponse = await fetch(
                `http://localhost:3001/api/requests/${id}`,
                {
                    method: "GET",
                    headers: { "Content-Type": "application/json"},
                }
            );
            const getRequestData = await getRequestResponse.json();
            const getStatus = getRequestResponse.status;
            console.log('getRequestData', getRequestData);
            console.log('getUserStatus', getStatus);
            //setCar(getCarData);
        } catch (error) {
            console.error('Error get request:', error);
        }
    }

    const createRequest = async (data: any) => {
        try {
            const createRequestResponse = await fetch(
                `http://localhost:3001/api/requests/addRequest`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json"},
                    body: JSON.stringify(data),
                }
            );
            const getRequestData = await createRequestResponse.json();
            const getStatus = createRequestResponse.status;
            console.log('getRequestData', getRequestData);
            console.log('getUserStatus', getStatus);
            //setCar(getCarData);
            return getRequestData;
        } catch (error) {
            console.error('Error creating request:', error);
        }
    };

    const updateRequest = async (id: string, data: any) => {
        try {
            const updatedRequestResponse = await fetch(
                `http://localhost:3001/api/requests/${id}`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json"},
                    body: JSON.stringify(data),
                }
            );
            const getRequestData = await updatedRequestResponse.json();
            const getStatus = updatedRequestResponse.status;
            console.log('getRequestData', getRequestData);
            console.log('getUserStatus', getStatus);
            //setCar(getCarData);
            return getRequestData;
        } catch (error) {
            console.error(`Error updating request with ID ${id}:`, error);
        }
    };

    const deleteRequest = async (id: string) => {
        //TODO
        try {
            const deleteRequestResponse = await fetch(
                `http://localhost:3001/api/requests/${id}`,
                {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json"},
                }
            );
            const getRequestData = await deleteRequestResponse.json();
            const getStatus = deleteRequestResponse.status;
            console.log('getRequestData', getRequestData);
            console.log('getUserStatus', getStatus);
            //setCartTypes(getCarTypesData);
            return getRequestData;
        } catch (error) {
            console.error(`Error deleting request with ID ${id}:`, error);
        }
    };

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