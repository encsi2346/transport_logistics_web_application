import {Route, Routes} from "react-router-dom";
import CarTypeEdit from "../car-types/CarTypeEdit";
import CarTypeList from "../car-types/CarTypeList";
import CarRead from "./CarRead";
import CarTypeOfTransportationList from "@/pages/car-types/CarTypeOfTransportationList";

const CarRouting = () => {
    return (
        <Routes>
            <Route path="/" element={<CarTypeOfTransportationList />} />
            <Route path="/:id/car-types" element={<CarTypeList />} />
            <Route path="/:id/car-types/:id" element={<CarRead isInputDisabled isEditing />} />
            <Route path="/:id/car-types/new" element={<CarTypeEdit />} />
            <Route path="/:id/car-types/edit/:id" element={<CarTypeEdit isEditing />} />
        </Routes>
    );
};

export default CarRouting;