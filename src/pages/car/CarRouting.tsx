import {Route, Routes} from "react-router-dom";
import CarTypeEdit from "./CarTypeEdit.tsx";
import CarTypeList from "./CarTypeList.tsx";

const CarRouting = () => {
    return (
        <Routes>
            <Route path="/" element={<CarTypeList />} />
            <Route path=":id" element={<CarTypeEdit isInputDisabled isEditing />} />
            <Route path="/new" element={<CarTypeEdit />} />
            <Route path="/edit/:id" element={<CarTypeEdit isEditing />} />
        </Routes>
    );
};

export default CarRouting;