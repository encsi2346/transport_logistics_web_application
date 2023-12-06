import {Route, Routes} from "react-router-dom";
import ProductsCategoryList from "./ProductsCategoryList.tsx";
import ProductsItemEdit from "./ProductsItemEdit.tsx";
import ProductsItemList from "./ProductsItemList.tsx";
import ProductsCategoryEdit from "./ProductsCategoryEdit.tsx";

const ProductsRouting = () => { /*TODO*/
    return (
        <Routes>
            <Route path="/" element={<ProductsCategoryList />} />
            <Route path=":id" element={<ProductsCategoryEdit isInputDisabled isEditing />} />
            <Route path="/edit/:id" element={<ProductsCategoryEdit isEditing />} />
            <Route path="/new" element={<ProductsCategoryEdit />} />
            <Route path="/products" element={<ProductsItemList />} />
            <Route path="products/:id" element={<ProductsItemEdit isInputDisabled isEditing />} />
            <Route path="/products/edit/:id" element={<ProductsItemEdit isEditing />} />
            <Route path="/products/new" element={<ProductsItemEdit />} />
        </Routes>
    );
};

export default ProductsRouting;