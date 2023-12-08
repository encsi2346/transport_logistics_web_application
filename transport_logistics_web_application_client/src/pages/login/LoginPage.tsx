import {Box, TextField, Typography} from "@mui/material";
import SmallBackgroundCard from "../../components/layout/SmallBackgroundCard.tsx";
import WideSaveButton from "../../components/button/WideSaveButton.tsx";
import TextFieldInput from "../../components/inputField/TextFieldInput.tsx";
import PasswordInput from "../../components/inputField/PasswordInput.tsx";
import {loginFormSchema, LoginFormSchema} from "./schema/login-form-schema.ts";
import {useForm} from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {useEffect, useState} from "react";
import {zodResolver} from "@hookform/resolvers/zod";
import {Navigate} from "react-router-dom";
import { useTypeSafeTranslation } from "../../components/inputField/hooks/useTypeSafeTranslation.tsx";
import {useDispatch} from "react-redux";
import {setLogin} from "../../state.ts";
import { Formik } from "formik"; //from Library
import * as yup from "yup"; //validation Library

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
    const [pageType, setPageType] = useState("register");
    const [loginFailed, setLoginFailed] = useState(false);
    const isLogin = pageType === "login";
    const isRegister = pageType === "register";

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

    useEffect(() => {
        console.log('pagetype', pageType);
    }, [pageType]);

    const register = async (values, onSubmitProps) => {
        console.log('register');
        //this allows us to send form info with image
        const formData = new FormData();
        for (let value in values) {
            formData.append(value, values[value])
        }
       // formData.append('picturePath', values.picture.name);

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
        console.log('login');
        const loggedInResponse = await fetch(
            "http://localhost:3001/auth/login",
            {
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify(values),
            }
        );
        const loggedIn = await loggedInResponse.json();
        onSubmitProps.resetForm();
        if(loggedIn) {
            dispatch(
                setLogin({
                    user: loggedIn.user,
                    token: loggedIn.token,
                })
            );
            navigate("/home");
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
                  setFieldValue,
                  resetForm,
              }) => (
                <form /*onSubmit={handleSubmit(onSubmit)}*/ onSubmit={handleSubmit}>
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
                                <TextField
                                    label="Email"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.email}
                                    name="email"
                                    error={Boolean(touched.email) && Boolean(errors.email)}
                                    helperText={touched.email && errors.email}
                                    sx={{ gridColumn: "span 4" }}
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
                                <WideSaveButton text={t('TEXT.LOGIN')} control={control} type='submit' /*onClick={() => navigate("/dashboard")}*//>
                            </Box>
                        </SmallBackgroundCard>
                    </Box>
                </form>
            )}
        </Formik>
    );
};

export default LoginPage;