import {useEffect} from "react";
import { useLocation } from "react-router-dom";
import {Drawer, Tooltip, useTheme} from '@mui/material';
import SidebarItem from "./SidebarItem";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ListAltIcon from '@mui/icons-material/ListAlt';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import {useTypeSafeTranslation} from "../inputField/hooks/useTypeSafeTranslation";
import EmailIcon from '@mui/icons-material/Email';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ReceiptIcon from '@mui/icons-material/Receipt';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import BubbleChartIcon from '@mui/icons-material/BubbleChart';

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

const Sidebar = () => {
    const { t } = useTypeSafeTranslation();
    const location = useLocation();
    const theme = useTheme();

    const navLinks = [
        {
            icon:   <Tooltip title={t('TEXT.DASHBOARD')}>
                <HomeRoundedIcon {...iconProps} />
            </Tooltip>,
            label: t('TEXT.DASHBOARD'),
            route: '/dashboard',
        },
        {
            icon:   <Tooltip title={t('TEXT.USERS')}>
                <PeopleAltIcon {...iconProps} />
            </Tooltip>,
            label: t('TEXT.USERS'),
            route: '/users',
        },
        {
            icon:   <Tooltip title={t('TEXT.TRANSPORTATION')}>
                <ListAltIcon {...iconProps} />
            </Tooltip>,
            label: t('TEXT.TRANSPORTATION'),
            route: '/transportations',
        },
        {
            icon:   <Tooltip title={t('TEXT.CAR_TYPES')}>
                <LocalShippingIcon {...iconProps} />
            </Tooltip>,
            label: t('TEXT.CAR_TYPES'),
            route: '/type-of-transportation',
        },
        {
            icon:   <Tooltip title={t('TEXT.PRODUCT_CATEGORIES')}>
                <Inventory2Icon {...iconProps} />
            </Tooltip>,
            label: t('TEXT.PRODUCT_CATEGORIES'),
            route: '/products-categories',
        },
        {
            icon:   <Tooltip title={t('TEXT.ORDERS')}>
                <BubbleChartIcon {...iconProps} />
            </Tooltip>,
            label: t('TEXT.ORDERS'),
            route: '/orders',
        },
        {
            icon:   <Tooltip title={t('TEXT.REQUESTS')}>
                <EmailIcon {...iconProps} />
            </Tooltip>,
            label: t('TEXT.REQUESTS'),
            route: '/requests',
        },
        {
            icon:   <Tooltip title={t('TEXT.PROFILE')}>
                <PersonIcon {...iconProps} />
            </Tooltip>,
            label: t('TEXT.PROFILE'),
            route: '/users/profile',
        },
        {
            icon:   <Tooltip title={t('TEXT.DOCUMENTS')}>
                <FileCopyIcon {...iconProps} />
            </Tooltip>,
            label: t('TEXT.DOCUMENTS'),
            route: '/documents',
        },
        {
            icon:   <Tooltip title={t('TEXT.INVOICES')}>
                <ReceiptIcon {...iconProps} />
            </Tooltip>,
            label: t('TEXT.INVOICES'),
            route: '/invoices',
        },
        {
            icon:   <Tooltip title={t('TEXT.LOGOUT')}>
                <LogoutIcon {...iconProps} />
            </Tooltip>,
            label: t('TEXT.LOGOUT'),
            route: '/logout',
        },
    ];

    useEffect(() => {
        const locationPathname = location.pathname.toLowerCase();

        navLinks.some((navLink) => {
            return locationPathname === navLink.route || locationPathname.startsWith(navLink.route);

        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Drawer
            id="sidebar"
            PaperProps={{
                sx: {
                    width: 70,
                    border: 'none',
                    display: 'flex',
                    justifyContent: 'start',
                    alignItems: 'center',
                    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.15)',
                    position: 'fixed',
                    minHeight: '100%',
                    height: '100%',
                    backgroundColor: `${theme.palette.component.dark}`,
                },
            }}
            variant="permanent"
        >

            {navLinks
                .map((group) => {
                    return <SidebarItem key={group.route} link={group} />;
                })}
        </Drawer>
    );
};

export default Sidebar;
