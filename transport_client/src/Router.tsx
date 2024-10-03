import {Navigate, Route, Routes} from 'react-router-dom';
import LoginPage from "./pages/login/LoginPage";
import ForgottenPassword from "./pages/login/ForgottenPassword";
import Layout from './components/layout/Layout';
import UserRouting from './pages/users/UserRouting';
import CarRouting from './pages/cars/CarRouting';
import ProductsRouting from "./pages/products/ProductsRouting";
import TransportationRouting from './pages/transportations/TransportationRouting';
import RequestRouting from "./pages/requests/RequestRouting";
import {useSelector} from "react-redux";
import DocumentRouting from "./pages/documents/DocumentRouting";
import InvoiceRouting from "./pages/invoices/InvoiceRouting";
import OrderRouting from "./pages/orders/OrderRouting";
import Dashboard from "@/pages/dashborad/Dashboard";

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
                    <Route path="car-types/car-types-of-transportation/*" element={isAuth ? <CarRouting /> : <Navigate to="/login" />} />
                    <Route path="products-categories/*" element={isAuth ? <ProductsRouting /> : <Navigate to="/login" />} />
                    <Route path="transportations/*" element={isAuth ? <TransportationRouting /> : <Navigate to="/login" />} />
                    <Route path="requests/*" element={isAuth ? <RequestRouting /> : <Navigate to="/login" />} />
                    <Route path="documents/*" element={isAuth ? <DocumentRouting /> : <Navigate to="/login" />} />
                    <Route path="invoices/*" element={isAuth ? <InvoiceRouting /> : <Navigate to="/login" />} />
                    <Route path="orders/*" element={isAuth ? <OrderRouting /> : <Navigate to="/login" />} />
                </Route>
            </Route>
        </Routes>
    );
};

export default Router;