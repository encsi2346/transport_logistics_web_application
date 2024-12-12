import { Box } from '@mui/material';
import {ReactNode} from 'react';
import { Link, useLocation, useResolvedPath } from 'react-router-dom';

interface INavLink {
    icon?: ReactNode;
    label: string;
    route: string;
}

interface Props {
    link: INavLink;
    removeSelectionStyles?: boolean;
}

const SidebarItem = ({ link, removeSelectionStyles = false }: Props) => {
    const location = useLocation();
    const path = useResolvedPath(link.route);

    const locationPathname = location.pathname.toLowerCase();
    const toPathname = path.pathname.toLowerCase();

    const isActive =
        !removeSelectionStyles &&
        (locationPathname === toPathname ||
            (locationPathname.startsWith(toPathname) && locationPathname.charAt(toPathname.length) === '/'));

    return (
        <Box
            key={link.route}
            component={Link}
            to={link.route}
            display="flex"
            alignItems="center"
            justifyContent={'center'}
            minHeight="30px"
            height="30px"
            marginTop={4}
            padding={isActive ? "15px" : "25px"}
            paddingTop={isActive ? "25px" : "19px"}
            paddingBottom={isActive ? "25px" : "19px"}
            bgcolor={isActive ? '#ffffff' : 'inherit'}
            borderRadius={isActive ? '10px' : 0}
            sx={{
                textDecoration: 'none',
                cursor: 'pointer',
                color: '#ffffff',
                '&:hover': {
                    color: 'rgb(192,192,192)',
                    borderRadius: '13px'
                }
            }}
            data-testid={link.route}
        >
            {link.icon}
        </Box>
    );
};

export default SidebarItem;