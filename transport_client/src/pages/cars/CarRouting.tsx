import {Route, Routes} from "react-router-dom";
import CarTypeEdit from "../car-types/CarTypeEdit";
import CarTypeList from "../car-types/CarTypeList";
import CarList from "../cars/CarList";
import CarEdit from "../cars/CarEdit";
import CarRead from "./CarRead";
import CarTypeOfTransportationList from "@/pages/car-types/CarTypeOfTransportationList";

const CarRouting = () => {
    return (
        <Routes>
            <Route path="/" element={<CarTypeOfTransportationList />} />
            <Route path="/:id/car-types" element={<CarTypeList />} />
            <Route path="/:id/car-types/:id/cars" element={<CarList />} />
            <Route path="/:id/car-types/:id/cars/:id" element={<CarRead isInputDisabled isEditing />} />
            <Route path="/:id/car-types/:id/cars/new" element={<CarEdit />} />
            <Route path="/:id/car-types/:id/edit" element={<CarEdit isEditing />} />
            <Route path="/:id/car-types/:id/cars/:id/edit" element={<CarTypeEdit isEditing />} />
        </Routes>
    );
};

export default CarRouting;