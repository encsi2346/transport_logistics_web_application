import {Navigate, Route, Routes} from 'react-router-dom';
import LoginPage from "./pages/login/LoginPage.tsx";
import ForgottenPassword from "./pages/login/ForgottenPassword.tsx";
import Layout from './components/layout/Layout.tsx';
import UserRouting from './pages/user/UserRouting.tsx';
import CarRouting from './pages/car/CarRouting.tsx';
import ProductsRouting from "./pages/product/ProductsRouting.tsx";
import TransportationRouting from './pages/transportation/TransportationRouting.tsx';
import Dashboard from "./pages/dashboard/Dashboard.tsx";
import RequestRouting from "./pages/request/RequestRouting.tsx";
import {useSelector} from "react-redux";

const Router = () => {
    const isAuth = Boolean(useSelector((state) => state.token));

    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/forgotten-password" element={<ForgottenPassword />} />
            <Route path="/logout" element={<LoginPage />} />

            <Route>
                <Route element={isAuth ? <Layout /> : <Navigate to="/login" />}>
                    <Route path="/" element={isAuth ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
                    <Route path="dashboard" element={isAuth ? <Dashboard /> : <Navigate to="/login" />} />
                    <Route path="users/*" element={isAuth ? <UserRouting /> : <Navigate to="/login" />} />
                    <Route path="car-types/*" element={isAuth ? <CarRouting /> : <Navigate to="/login" />} />
                    <Route path="products-categories/*" element={isAuth ? <ProductsRouting /> : <Navigate to="/login" />} />
                    <Route path="transportations/*" element={isAuth ? <TransportationRouting /> : <Navigate to="/login" />} />
                    <Route path="requests/*" element={isAuth ? <RequestRouting /> : <Navigate to="/login" />} />
                </Route>
            </Route>
        </Routes>
    );
};

export default Router;