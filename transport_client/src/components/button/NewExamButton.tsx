import {Button, Tooltip, useTheme} from "@mui/material";
import type {SxProps, Theme} from "@mui/material";
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import {useTypeSafeTranslation} from "@/components/inputfield/hooks/useTypeSafeTranslation";

interface Props {
    onClick?: () => void;
    disabled?: boolean;
}

const iconStyle: SxProps<Theme> = {
    fontWeight: 'regular',
    fontSize: 40,
    color: '#ffffff',
}

const NewExamButton = ({ onClick, disabled }: Props) => {
    const { t } = useTypeSafeTranslation();
    const theme = useTheme();

    return (
        <Tooltip title={t('CAR.NEW_EXAM')}>
            <Button
                data-testid='new-button'
                sx={{
                    backgroundColor: "#8f8f8f",
                    borderRadius: '10px',
                    paddingTop: '10px',
                    paddingBottom: '10px',
                    paddingLeft: '8px',
                    paddingRight: '8px',
                    width: 50,
                    height: 50
                }}
                onClick={() => {
                    if(!disabled && onClick) {
                        onClick();
                    }
                }}
            >
                <AddRoundedIcon sx={iconStyle} />
            </Button>
        </Tooltip>
    );
};

export default NewExamButton;