import { Route, Routes } from 'react-router-dom';
import InvoiceList from "./InvoiceList.tsx";

const InvoiceRouting = () => {
    return (
        <Routes>
            <Route path="/" element={<InvoiceList/>} />
        </Routes>
    );
};

export default InvoiceRouting;