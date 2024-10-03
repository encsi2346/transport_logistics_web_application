import { Route, Routes } from 'react-router-dom';
import OrderList from "./OrderList";
import OrderRead from "./OrderRead";

const OrderRouting = () => {
    return (
        <Routes>
            <Route path="/" element={<OrderList />} />
            <Route path=":id" element={<OrderRead />} />
        </Routes>
    );
};

export default OrderRouting;