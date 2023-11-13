import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Box } from '@mui/material';
import { ReactNode } from 'react';

interface INavLink {
    icon: ReactNode;
    label: string;
    route: string;
}

interface Props {
    group: INavLink;
    isOpen: boolean;
    isSidebarOpen: boolean;
    onClick: () => void;
}

const SidebarGroupItem = ({ group, isOpen, isSidebarOpen, onClick }: Props) => {

    return (
        <Box
            key={group.route}
            display="flex"
            alignItems="center"
            justifyContent={isSidebarOpen ? 'flex-start' : 'center'}
            minHeight="40px"
            height="40px"
            px={3}
            bgcolor={!isSidebarOpen && 'primary.100'}
            color={'primary.main'}
            sx={{ textDecoration: 'none', cursor: 'pointer' }}
            onClick={onClick}
            data-testid={group.route}
        >
            {group.icon}

            {isSidebarOpen && (
                <>
                    <Box ml="10px" flex="1" fontSize="14px">
                        {group.label}
                    </Box>

                    {isOpen ? <ExpandLess sx={{ color: 'text.primary' }} /> : <ExpandMore sx={{ color: 'text.primary' }} />}
                </>
            )}
        </Box>
    );
};

export default SidebarGroupItem;
