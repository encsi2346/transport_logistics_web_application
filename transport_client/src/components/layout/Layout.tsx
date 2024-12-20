import { Outlet } from 'react-router-dom';
import {Box} from "@mui/material";
import Sidebar from "../sidebar/Sidebar";
import Navbar from "./Navbar";

const Layout = () => {
    return (
        <>
            <Box display="flex">
                {/*<Navbar /> TODO*/}
                <Sidebar />
                <Box px={2} pt={2} mt={-2} ml={8} width="100%" height="100%">
                    <Outlet />
                </Box>
            </Box>
        </>
    );
};

export default Layout;