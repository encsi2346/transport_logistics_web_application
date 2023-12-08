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

const Router = () => {
    //const auth = useAuthentication();

    const loading = (<span>Loading... please wait!</span>);

    const toLogin = (<Navigate to="/login" />);

    /*const authenticatedElement = (element : JSX.Element) => {
        if (auth.isAuthenticated) {
            return element;
        } else {
            return auth.isAuthenticated === false ? toLogin : loading;
        }
    }*/

    return (
        <Routes>
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/forgotten-password" element={<ForgottenPassword />} />
            <Route path="/logout" element={<LoginPage />} />

            <Route>
                <Route element={/*authenticatedElement(*/<Layout />/*)*/}>
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="users/*" element={<UserRouting />} />
                    <Route path="car-types/*" element={<CarRouting />} />
                    <Route path="products-categories/*" element={<ProductsRouting />} />
                    <Route path="transportations/*" element={<TransportationRouting />} />
                    <Route path="requests/*" element={<RequestRouting />} />
                </Route>
            </Route>
        </Routes>
    );
};

export default Router;