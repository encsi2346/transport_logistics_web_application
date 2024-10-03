import { Route, Routes } from 'react-router-dom';
import DocumentList from "./DocumentList";

const DocumentRouting = () => {
    return (
        <Routes>
            <Route path="/" element={<DocumentList />} />
        </Routes>
    );
};

export default DocumentRouting;