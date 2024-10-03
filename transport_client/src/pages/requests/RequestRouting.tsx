import {Route, Routes} from "react-router-dom";
import RequestList from "./RequestList";
import RequestEdit from "./RequestEdit";

const RequestRouting = () => {
    return (
        <Routes>
            <Route path="/" element={<RequestList />} />
            <Route path=":id" element={<RequestEdit isInputDisabled isEditing />} />
            <Route path="/new" element={<RequestEdit />} />
            <Route path="/edit/:id" element={<RequestEdit isEditing />} />
        </Routes>
    );
};

export default RequestRouting;