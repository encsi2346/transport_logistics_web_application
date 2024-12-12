import {Box, SxProps, Theme, Tooltip, Typography, useTheme} from "@mui/material";
import CardBoardBox from "../../assets/cardboard_box_2.png";
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import {useTypeSafeTranslation} from "../inputfield/hooks/useTypeSafeTranslation";

const mainTextStyle: SxProps<Theme> = {
    fontWeight: 'bold',
    fontSize: { xs: "14px", sm: "16px", md: "18px" },
    color: '#866000',
    textAlign: 'center',
    textTransform: 'capitalize'
}

interface Props {
    onClick: () => void;
    id: number;
    name: string;
    status: string;
}

const ProductCategoryCard = ({ onClick, id, name, status }: Props) => {
    const theme = useTheme();
    const { t } = useTypeSafeTranslation();

    return (
        <Box
            onClick={onClick}
            sx={{
                backgroundColor: 'rgba(246,230,203,0.6)', //`${theme.palette.component.lightMin}`,
                borderRadius: '19px',
                paddingLeft: '5px',
                paddingRight: '5px',
                boxShadow: `5px 7px 10px rgba(0,0,0,0.25)`,
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                width: { xs: "90%", sm: 250, md: 300 }, // Responsive width
                height: { xs: 180, sm: 200 }, // Responsive height
                margin: 0, // Center the card
                position: 'relative'
            }}
        >
            <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexGrow: 1, marginTop: -5}}>
                <img
                    src={CardBoardBox}
                    style={{ height: "95%", width: "95%", objectFit: "cover"}}
                    alt="van"
                />
            </Box>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignSelf: 'flex-start', // Align text to the left
                width: '100%', // Ensure text spans the width
                paddingBottom: 10
            }}>
                <Typography sx={mainTextStyle}>{name}</Typography>
            </Box>
            {
                status === 'out_of_stock' && (
                    <Tooltip title={t('PRODUCT_CATEGORIES.OUT_OF_STOCK')}>
                        <WarningRoundedIcon
                            sx={{
                                width: 40,
                                height: 40,
                                position: 'absolute',
                                bottom: 5, // Adjust vertical placement (closer to the card's bottom)
                                right: { xs: 15, sm: 30 }, // Start from the center
                                transform: 'translateX(20%)', // Slightly move it to the right
                                zIndex: 100,
                                color: '#DD1C13'
                            }}
                        />
                    </Tooltip>
                )
            }
        </Box>
    );
};

export default ProductCategoryCard;