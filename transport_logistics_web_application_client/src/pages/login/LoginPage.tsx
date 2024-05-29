import {Box, TextField, Typography} from "@mui/material";
import SmallBackgroundCard from "../../components/layout/SmallBackgroundCard.tsx";
import WideSaveButton from "../../components/button/WideSaveButton.tsx";
import {loginFormSchema, LoginFormSchema} from "./schema/login-form-schema.ts";
import {useForm} from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {useState} from "react";
import {zodResolver} from "@hookform/resolvers/zod";
import { useTypeSafeTranslation } from "../../components/inputField/hooks/useTypeSafeTranslation.tsx";
import {useDispatch} from "react-redux";
import {setLogin} from "../../state.ts";
import { Formik } from "formik";
import * as yup from "yup";

const registerSchema = yup.object().shape({
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("required"),
})

const loginSchema = yup.object().shape({
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("required"),
})

const initialValuesRegister = {
    email: "",
    password: "",
}

const initialValuesLogin = {
    email: "",
    password: "",
}

const LoginPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [pageType, setPageType] = useState("login");
    const [loginFailed, setLoginFailed] = useState(false);

    const isLogin = pageType === "login";
    const isRegister = pageType === "register";

    const { t } = useTypeSafeTranslation();
    const {
        control,
        formState: { isValid },
    } = useForm<LoginFormSchema>({
        defaultValues: {
            email: '',
            password: '',
        },
        resolver: zodResolver(loginFormSchema),
        mode: 'all',
    });

    const register = async (values, onSubmitProps) => {
        const formData = new FormData();
        for (let value in values) {
            formData.append(value, values[value])
        }

        const savedUserResponse = await fetch(
        "http://localhost:3001/auth/register",
        {
                method: "POST",
                body: formData,
            }
        );
        const savedUser = await savedUserResponse.json();
        onSubmitProps.resetForm();

        if (savedUser) {
            setPageType("login");
        }
    };

    const login = async (values, onSubmitProps) => {
        const loggedInResponse = await fetch(
            "http://localhost:3001/auth/login",
            {
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify(values),
            }
        );
        const loggedIn = await loggedInResponse.json();
        const logStatus = loggedInResponse.status;
        onSubmitProps.resetForm();
        console.log(logStatus);
        if(logStatus === 200) {
            dispatch(
                setLogin({
                    user: loggedIn.user,
                    token: loggedIn.token,
                })
            );
            navigate("/dashboard");
        } else {
            setLoginFailed(true);
        }
    }

    const handleFormSubmit = async (values, onSubmitProps) => {
        if (isLogin) await login(values, onSubmitProps);
        if (isRegister) await register(values, onSubmitProps);
    };

    return (
        <Formik onSubmit={handleFormSubmit} initialValues={isLogin ? initialValuesLogin : initialValuesRegister} validationSchema={isLogin ? loginSchema : registerSchema}>
            {({
                  values,
                  errors,
                  touched,
                  handleBlur,
                  handleChange,
                  handleSubmit,
              }) => (
                <form onSubmit={handleSubmit}>
                    <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 20}}>
                        <SmallBackgroundCard>
                            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                <Typography sx={{color: '#000000', fontWeight: 'bold', fontSize: '16px', marginTop: 5, marginBottom: 5}}>
                                    {t('TEXT.WELCOME')}
                                </Typography>
                            </Box>
                            <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 3}}>
                                {(loginFailed)
                                    ?
                                        <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                            <Typography sx={{ color: '#DD1C13', fontWeight: 'bold' }} >
                                                {t('TEXT.LOGIN_FAILED')}
                                            </Typography>
                                        </Box>
                                    : null
                                }
                                <TextField
                                    label="Email"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.email}
                                    name="email"
                                    error={Boolean(touched.email) && Boolean(errors.email)}
                                    helperText={touched.email && errors.email}
                                    sx={{ gridColumn: "span 4" }}
                                    data-testid="email-input"
                                />
                                <TextField
                                    label="Password"
                                    type="password"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.password}
                                    name="password"
                                    error={Boolean(touched.password) && Boolean(errors.password)}
                                    helperText={touched.password && errors.password}
                                    sx={{ gridColumn: "span 4" }}
                                    data-testid="password-input"
                                />
                            </Box>
                            <Typography
                                onClick={() => navigate(`/forgotten-password`)}
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'right',
                                    color: '#DD1C13',
                                    fontWeight: 'normal',
                                    fontSize: '12px',
                                    marginTop: 1,
                                    marginBottom: 2,
                                    letterSpacing: 1,
                                    cursor: 'pointer'
                                }}
                                data-testid="forgotten-password"
                            >
                                {t('TEXT.RESET_PASSWORD')}
                            </Typography>
                            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                <WideSaveButton text={t('TEXT.LOGIN')} control={control} type='submit' data-testid="login-button"/>
                            </Box>
                        </SmallBackgroundCard>
                    </Box>
                </form>
            )}
        </Formik>
    );
};

export default LoginPage;