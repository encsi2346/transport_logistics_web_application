import {Route, Routes} from "react-router-dom";
import ProductsCategoryList from "./ProductsCategoryList.tsx";
import ProductsItemEdit from "./ProductsItemEdit.tsx";

const ProductsRouting = () => {
    return (
        <Routes>
            <Route path="/" element={<ProductsCategoryList />} />
            <Route path=":id" element={<ProductsItemEdit isInputDisabled isEditing />} />
            <Route path="/new" element={<ProductsItemEdit />} />
            <Route path="/edit/:id" element={<ProductsItemEdit isEditing />} />
        </Routes>
    );
};

export default ProductsRouting;