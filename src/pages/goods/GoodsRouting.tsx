import {Route, Routes} from "react-router-dom";
import GoodsCategoryList from "./GoodsCategoryList.tsx";
import GoodsItemEdit from "./GoodsItemEdit.tsx";

const GoodsRouting = () => {
    return (
        <Routes>
            <Route path="/" element={<GoodsCategoryList />} />
            <Route path=":id" element={<GoodsItemEdit isInputDisabled isEditing />} />
            <Route path="/new" element={<GoodsItemEdit />} />
            <Route path="/edit/:id" element={<GoodsItemEdit isEditing />} />
        </Routes>
    );
};

export default GoodsRouting;