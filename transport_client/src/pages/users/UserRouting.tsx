import { Route, Routes } from 'react-router-dom';
import UserList from "./UserList";
import UserEdit from "./UserEdit";

const UserRouting = () => {
    return (
        <Routes>
            <Route path="/" element={<UserList />} />
            <Route path=":id" element={<UserEdit isInputDisabled isEditing />} />
            <Route path="profile/:id" element={<UserEdit isInputDisabled isEditing />} />
            <Route path="/new" element={<UserEdit />} />
            <Route path="/edit/:id" element={<UserEdit isEditing />} />
            <Route path="/profile/edit/:id" element={<UserEdit isEditing />} />
        </Routes>
    );
};

export default UserRouting;