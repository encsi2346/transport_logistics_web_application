import { Route, Routes } from 'react-router-dom';
import InvoiceList from "./InvoiceList";

const InvoiceRouting = () => {
    return (
        <Routes>
            <Route path="/" element={<InvoiceList/>} />
        </Routes>
    );
};

export default InvoiceRouting;