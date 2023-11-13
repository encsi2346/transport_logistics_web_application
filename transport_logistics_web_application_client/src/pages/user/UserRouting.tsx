import { Route, Routes } from 'react-router-dom';
import UserList from "./UserList.tsx";
import UserEdit from "./UserEdit.tsx";

const UserRouting = () => {
    return (
        <Routes>
            <Route path="/" element={<UserList />} />
            <Route path=":id" element={<UserEdit isInputDisabled isEditing />} />
            <Route path="/new" element={<UserEdit />} />
            <Route path="/edit/:id" element={<UserEdit isEditing />} />
        </Routes>
    );
};

export default UserRouting;