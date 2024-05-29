import {Route, Routes} from "react-router-dom";
import CarTypeEdit from "../car-types/CarTypeEdit.tsx";
import CarTypeList from "../car-types/CarTypeList.tsx";
import CarRead from "./CarRead.tsx";

const CarRouting = () => {
    return (
        <Routes>
            <Route path="/" element={<CarTypeList />} />
            <Route path=":id" element={<CarRead isInputDisabled isEditing />} />
            <Route path="/new" element={<CarTypeEdit />} />
            <Route path="/edit/:id" element={<CarTypeEdit isEditing />} />
        </Routes>
    );
};

export default CarRouting;