import {Box, Button, useTheme} from "@mui/material";
import Popper, {PopperPlacementType} from "@mui/material/Popper";
import Fade from "@mui/material/Fade";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import NormalText from "../text/NormalText";
import DeleteIcon from "@mui/icons-material/Delete";
import {useState} from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {useTypeSafeTranslation} from "../inputfield/hooks/useTypeSafeTranslation";

interface Props {
    text?: string;
    type?: string;
    onClick?: () => void;
    disabled?: boolean;
    icon?: React.ReactNode;
}

const ActionsButton = ({ text, type, onClick, disabled, icon }: Props) => {
    const { t } = useTypeSafeTranslation();
    const theme = useTheme();
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const [open, setOpen] = useState(false);
    const [placement, setPlacement] = useState<PopperPlacementType>();

    const handleClick =
        (newPlacement: PopperPlacementType) =>
            (event: MouseEvent<HTMLButtonElement>) => {
                setAnchorEl(event.currentTarget);
                setOpen((prev) => placement !== newPlacement || !prev);
                setPlacement(newPlacement);
            };

    return (
        <Box>
            <Popper
                sx={{
                    zIndex: 1200,
                    borderRadius: '8px',
                }}
                open={open}
                anchorEl={anchorEl}
                placement={placement}
                transition
            >
                {({ TransitionProps }) => (
                    <Fade {...TransitionProps} timeout={350}>
                        <Paper>
                            <Box
                                data-testid="edit-button"
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    padding: '10px',
                                    cursor: 'pointer',
                                    '&:hover': {
                                        backgroundColor: '#f0f0f0',
                                        borderRadius: '4px',
                                        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                                    },
                                }}>
                                <EditIcon width="18px" height="18px" sx={{ color: "#ff0000" }} />
                                <NormalText text={t('TEXT.EDIT')} />
                            </Box>
                            <Box
                                //onClick={() => onHandleDelete(id)}
                                data-testid="remove-button"
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    padding: '10px',
                                    cursor: 'pointer',
                                    '&:hover': {
                                        backgroundColor: '#f0f0f0',
                                        borderRadius: '4px',
                                        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                                    },
                                }}
                            >
                                <DeleteIcon width="18px" height="18px" sx={{ color: "#ff0000" }} />
                                <NormalText text={t('TEXT.REMOVE')} />
                            </Box>
                        </Paper>
                    </Fade>
                )}
            </Popper>
            <Button
                //type={type}
                data-testid='save-button'
                sx={{
                    fontWeight: 500,
                    fontSize: 20,
                    color: `${theme.palette.component.lightMin}`,
                    backgroundColor: `${theme.palette.component.dark}`,
                    borderRadius: 20,
                    paddingLeft: 5,
                    paddingRight: 5,
                    paddingTop: 1,
                    paddingBottom: 1,
                    gap: 1,
                    textTransform: 'none',
                    letterSpacing: 1
                }}
                onClick={handleClick('right-end')}
                /*onClick={() => {
                    if(!disabled && onClick) {
                        onClick();
                    }
                }}*/
                endIcon={<MoreVertIcon sx={{ color: "#ffffff", width: 28, height: 28 }} />}
            >
                {text}
            </Button>
        </Box>
    );
};

export default ActionsButton;