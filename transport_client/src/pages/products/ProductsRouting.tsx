import {Route, Routes} from "react-router-dom";
import ProductsCategoryList from "../product-categories/ProductsCategoryList";
import ProductsItemEdit from "./ProductsItemEdit";
import ProductsItemList from "./ProductsItemList";
import ProductsCategoryEdit from "../product-categories/ProductsCategoryEdit";

const ProductsRouting = () => { /*TODO*/
    return (
        <Routes>
            <Route path="/" element={<ProductsCategoryList />} />
            <Route path="/:id" element={<ProductsCategoryEdit isInputDisabled isEditing />} />
            <Route path="/edit/:id" element={<ProductsCategoryEdit isEditing />} />
            <Route path="/new" element={<ProductsCategoryEdit />} />
            <Route path="/:id/products" element={<ProductsItemList />} />
            <Route path="/:id/products/:id" element={<ProductsItemEdit isInputDisabled isEditing />} />
            <Route path="/:id/products/edit/:id" element={<ProductsItemEdit isEditing />} />
            <Route path="/:id/products/new" element={<ProductsItemEdit />} />
        </Routes>
    );
};

export default ProductsRouting;