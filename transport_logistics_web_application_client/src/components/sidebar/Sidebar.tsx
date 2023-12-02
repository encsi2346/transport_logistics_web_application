import {useEffect, useState} from "react";
import { useLocation } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import { Drawer, IconButton } from '@mui/material';
import SidebarItem from "./SidebarItem.tsx";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ListAltIcon from '@mui/icons-material/ListAlt';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import {useTypeSafeTranslation} from "../inputField/hooks/useTypeSafeTranslation.tsx";

const iconProps = {
    sx: {
        width: '40px',
        height: '40px',
        color: '#A3A3A3',
        '&:hover': {
            color: 'rgb(200,200,200)',
        }
    },
};

interface Props {
    isSidebarOpen: boolean;
}

const Sidebar = ({ isSidebarOpen }: Props) => {
    const { t } = useTypeSafeTranslation();
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(true);
    const [openGroups, setOpenGroups] = useState<string[]>([]);

    const navLinks = [
        {
            icon: <PeopleAltIcon {...iconProps} />,
            label: t('TEXT.USERS'),
            route: '/users',
        },
        {
            icon: <ListAltIcon {...iconProps} />,
            label: t('TEXT.TRANSPORTATION'),
            route: '/transportations',
        },
        {
            icon: <LocalShippingIcon {...iconProps} />,
            label: t('TEXT.CAR_TYPES'),
            route: '/car-types',
        },
        {
            icon: <Inventory2Icon {...iconProps} />,
            label: t('TEXT.PRODUCT_CATEGORIES'),
            route: '/products-categories',
        },
        {
            icon: <PersonIcon {...iconProps} />,
            label: t('TEXT.PROFILE'),
            route: '/profile',
        },        {
            icon: <LogoutIcon {...iconProps} />,
            label: t('TEXT.LOGOUT'),
            route: '/logout',
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
            sx={{ width: 60, transition: 'width 0.25s' }}
            PaperProps={{
                sx: {
                    width: isSidebarOpen ? 250 : 60,
                    transition: 'width 0.25s',
                    border: 'none',
                    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.15)',
                    position: 'fixed',
                    minHeight: 100,
                    height: 900,
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

            <IconButton
                sx={{ ml: isOpen ? 2 : 3, color: 'text.primary', width: 'fit-content' }}
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? <LightModeIcon width="14px" height="14px" /> : <DarkModeIcon width="14px" height="14px" />}
            </IconButton>

            {navLinks
                .map((group) => {
                    return <SidebarItem key={group.route} link={group} isSidebarOpen={isOpen} />;
                })}
        </Drawer>
    );
};

export default Sidebar;
