import { Route, Routes } from 'react-router-dom';
import OrderList from "./OrderList.tsx";
import OrderRead from "./OrderRead.tsx";

const OrderRouting = () => {
    return (
        <Routes>
            <Route path="/" element={<OrderList />} />
            <Route path=":id" element={<OrderRead />} />
        </Routes>
    );
};

export default OrderRouting;