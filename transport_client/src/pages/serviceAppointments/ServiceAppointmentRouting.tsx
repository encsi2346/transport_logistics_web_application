import { Route, Routes } from 'react-router-dom';
import ServiceAppointmentList from "./ServiceAppointmentList";
import ServiceAppointmentEdit from "./ServiceAppointmentEdit";

const ServiceAppointmentRouting = () => {
    return (
        <Routes>
            <Route path="/" element={<ServiceAppointmentList />} />
            <Route path=":id" element={<ServiceAppointmentEdit isInputDisabled isEditing />} />
            <Route path="profile/:id" element={<ServiceAppointmentEdit isInputDisabled isEditing />} />
            <Route path="/new" element={<ServiceAppointmentEdit />} />
            <Route path="/edit/:id" element={<ServiceAppointmentEdit isEditing />} />
        </Routes>
    );
};

export default ServiceAppointmentRouting;