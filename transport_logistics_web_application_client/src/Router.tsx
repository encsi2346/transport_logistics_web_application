import {Navigate, Route, Routes} from 'react-router-dom';
import LoginPage from "./pages/login/LoginPage.tsx";
import ForgottenPassword from "./pages/login/ForgottenPassword.tsx";
import Layout from './components/layout/Layout.tsx';
import UserRouting from './pages/users/UserRouting.tsx';
import CarRouting from './pages/cars/CarRouting.tsx';
import ProductsRouting from "./pages/products/ProductsRouting.tsx";
import TransportationRouting from './pages/transportations/TransportationRouting.tsx';
import Dashboard from "./pages/dashboard/Dashboard.tsx";
import RequestRouting from "./pages/requests/RequestRouting.tsx";
import {useSelector} from "react-redux";
import DocumentRouting from "./pages/documents/DocumentRouting.tsx";
import InvoiceRouting from "./pages/invoices/InvoiceRouting.tsx";

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
                    <Route path="documents/*" element={isAuth ? <DocumentRouting /> : <Navigate to="/login" />} />
                    <Route path="invoices/*" element={isAuth ? <InvoiceRouting /> : <Navigate to="/login" />} />
                </Route>
            </Route>
        </Routes>
    );
};

export default Router;