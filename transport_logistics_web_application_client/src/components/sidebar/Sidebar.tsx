import {useEffect, useState} from "react";
import { useLocation } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import { Drawer, IconButton } from '@mui/material';
import SidebarItem from "./SidebarItem.tsx";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ListAltIcon from '@mui/icons-material/ListAlt';
import Inventory2Icon from '@mui/icons-material/Inventory2';

const iconProps = {
    sx: { width: '40px', height: '40px', color: '#A3A3A3' },
};

interface Props {
    drawerOpenWidth: string;
    drawerClosedWidth: string;
    headerHeight: string;
}

const Sidebar = ({ drawerOpenWidth, drawerClosedWidth, headerHeight }: Props) => {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(true);
    const [openGroups, setOpenGroups] = useState<string[]>([]);

    const navLinks = [
        {
            icon: <PeopleAltIcon {...iconProps} />,
            label: 'USER',
            route: '/user',
        },
        {
            icon: <ListAltIcon {...iconProps} />,
            label: 'TRANSPORTATION',
            route: '/transportation',
        },
        {
            icon: <LocalShippingIcon {...iconProps} />,
            label: 'CAR_TYPE',
            route: '/car-type',
        },
        {
            icon: <Inventory2Icon {...iconProps} />,
            label: 'GOODS_CATEGORY',
            route: '/goods-category',
        },
    ];

    useEffect(() => {
        const locationPathname = location.pathname.toLowerCase();

        navLinks.some((navLink) => {
            if (locationPathname === navLink.route || locationPathname.startsWith(navLink.route)) {
                setOpenGroups([navLink.route]);
                return true;
            }
            return false;
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Drawer
            id="sidebar"
            sx={{ width: isOpen ? drawerOpenWidth : drawerClosedWidth, transition: 'width 0.25s' }}
            PaperProps={{
                sx: {
                    width: isOpen ? drawerOpenWidth : drawerClosedWidth,
                    transition: 'width 0.25s',
                    border: 'none',
                    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.15)',
                    position: 'fixed',
                    minHeight: `calc(100vh - ${headerHeight})`,
                    height: `calc(100vh - ${headerHeight})`,
                    backgroundColor: '#DD1C13',
                },
            }}
            variant="permanent"
        >
            <IconButton
                sx={{ ml: isOpen ? 2 : 3, color: 'text.primary', width: 'fit-content' }}
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? <HomeIcon width="14px" height="14px" /> : <HomeIcon width="14px" height="14px" />}
            </IconButton>

            {navLinks
                .map((group) => {
                    return <SidebarItem key={group.route} link={group} isSidebarOpen={isOpen} />;
                })}
        </Drawer>
    );
};

export default Sidebar;
