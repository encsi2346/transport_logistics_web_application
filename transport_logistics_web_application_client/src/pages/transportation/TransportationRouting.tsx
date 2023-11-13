import {Route, Routes} from "react-router-dom";
import TransportationList from "./TransportationList.tsx";
import TransportationCarSelecting from "./TransportationCarSelecting.tsx";

const TransportationRouting = () => {
    return (
        <Routes>
            <Route path="/" element={<TransportationList />} />
            <Route path=":id" element={<TransportationCarSelecting isInputDisabled isEditing />} />
            <Route path="/new" element={<TransportationCarSelecting />} />
            <Route path="/edit/:id" element={<TransportationCarSelecting isEditing />} />
        </Routes>
    );
};

export default TransportationRouting;