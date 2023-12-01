import {Navigate, Route, Routes} from 'react-router-dom';
import LoginPage from "./pages/login/LoginPage.tsx";
import ForgottenPassword from "./pages/login/ForgottenPassword.tsx";
import Layout from './components/layout/Layout.tsx';
import UserRouting from './pages/user/UserRouting.tsx';
import CarRouting from './pages/car/CarRouting.tsx';
import GoodsRouting from "./pages/goods/GoodsRouting.tsx";
import TransportationRouting from './pages/transportation/TransportationRouting.tsx';

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

            <Route>
                <Route element={/*authenticatedElement(*/<Layout />/*)*/}>
                    <Route path="user/*" element={<UserRouting />} />
                    <Route path="car-type/*" element={<CarRouting />} />
                    <Route path="goods-category/*" element={<GoodsRouting />} />
                    <Route path="transportation/*" element={<TransportationRouting />} />
                </Route>
            </Route>
        </Routes>
    );
};

export default Router;