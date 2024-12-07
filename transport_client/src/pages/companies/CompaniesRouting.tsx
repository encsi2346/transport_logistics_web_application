import { Route, Routes } from 'react-router-dom';
import CompaniesList from "./CompaniesList";
import CompaniesEdit from "./CompaniesEdit";

const CompaniesRouting = () => {
    return (
        <Routes>
            <Route path="/" element={<CompaniesList />} />
            <Route path=":id" element={<CompaniesEdit isInputDisabled isEditing />} />
            <Route path="profile/:id" element={<CompaniesEdit isInputDisabled isEditing />} />
            <Route path="/new" element={<CompaniesEdit />} />
            <Route path="/edit/:id" element={<CompaniesEdit isEditing />} />
        </Routes>
    );
};

export default CompaniesRouting;