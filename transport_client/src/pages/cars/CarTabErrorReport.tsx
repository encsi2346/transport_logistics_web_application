import {Box, Grid, SxProps, Theme, Typography} from "@mui/material";
import NormalText from "../../components/text/NormalText";
import CancelButton from "@/components/button/CancelButton";
import SaveButton from "@/components/button/SaveButton";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import PersonIcon from "@mui/icons-material/Person";

const textStyle: SxProps<Theme> = {
    fontWeight: 'bold',
    fontSize: '18px',
    color: '#000000',
}

const paramTextStyle: SxProps<Theme> = {
    fontWeight: 'bold',
    fontSize: '18px',
    color: '#A3A3A3',
    marginRight: 3
}

const basicTextStyle: SxProps<Theme> = {
    fontWeight: 'normal',
    fontSize: '18px',
    color: '#000000',
}

const basicNotifyTextStyle: SxProps<Theme> = {
    fontWeight: 'normal',
    fontSize: '18px',
    color: '#A3A3A3',
    paddingTop: 1,
}

const iconStyle: SxProps<Theme> = {
    fontSize: 100,
    color: '#A3A3A3',
    marginLeft: '40px',
    marginRight: '40px',
    marginTop: '20px',
    marginBottom: '10px',
}

const CarTabErrorReport = () => {
    const navigate = useNavigate();
    const [t, i18n] = useTranslation();

    return (
        <Box>
            <Box sx={{ display: 'flex'}}>
                <Box sx={{ backgroundColor: '#eeeeee', width: 800, borderRadius: 3, paddingLeft: 5, paddingRight: 5, paddingTop: 2, paddingBottom: 3}}>
                    <Grid item container direction="column" spacing={2}>
                        <Grid item container direction="row" xs={4} md={8} spacing={6}  columns={20}>
                            <Grid item xs={4} md={4}>
                                <Box sx={{ display: 'inline', paddingLeft: 120}}>
                                    <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', minWidth: 120 }}>
                                        <Typography sx={paramTextStyle}>{'Tárgy:'}</Typography>
                                        <Typography sx={textStyle}>{'Hibabejelentés'}</Typography>
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                        <Grid item container direction="row" xs={4} md={8} spacing={6}  columns={20}>
                            <Grid item xs={4} md={4}>
                                <Box sx={{ display: 'inline', paddingLeft: 120}}>
                                    <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', minWidth: 120 }}>
                                        <Typography sx={paramTextStyle}>{'Leírás:'}</Typography>
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                        <Grid item container direction="row" xs={4} md={8} spacing={6}  columns={20}>
                            <Grid item xs={4} md={12}>
                                <Box sx={{ display: 'block', marginLeft: 10}}>
                                    <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', minWidth: 120 }}>
                                        <Typography sx={basicTextStyle}>{'Kopottak a gumik.'}</Typography>
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
                <Box sx={{ backgroundColor: '#dedede', width: 500, borderRadius: 3, marginLeft: -5, paddingLeft: 5, paddingRight: 5, paddingTop: 2, paddingBottom: 3}}>
                    <Grid item container direction="column" spacing={2}>
                        <Grid item container direction="row" xs={4} md={8} spacing={6} columns={20}>
                            <Grid item xs={4} md={4}>
                                <Box sx={{ display: 'block'}}>
                                    <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', minWidth: 120, paddingTop: 2, marginBottom: 2 }}>
                                        <Typography sx={paramTextStyle}>{'Bejelentő:'}</Typography>
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                        <Grid item container direction="row" xs={4} md={8} spacing={6} columns={20}>
                            <Grid item xs={4} md={4}>
                                <Box sx={{display: 'flex', align: 'center', justifyContent: 'center', backgroundColor: '#ececec', height: 110, width: 110, borderRadius: 90, marginRight: 3}}>
                                    <PersonIcon sx={iconStyle}/>
                                </Box>
                            </Grid>
                            <Grid item xs={4} md={12}>
                                <Box sx={{ display: 'block', marginLeft: 5}}>
                                    <Box sx={{ }}>
                                        <Typography sx={textStyle}>{'Sofőr Zoltán'}</Typography>
                                    </Box>
                                    <Box sx={{}}>
                                        <Typography sx={basicNotifyTextStyle}>{'Applikáción keresztül'}</Typography>
                                    </Box>
                                    <Box sx={{ }}>
                                        <Typography sx={basicNotifyTextStyle}>{'2024.01.28. 17:32'}</Typography>
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </Box>

            <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
                <CancelButton text={t('TEXT.CANCEL')} onClick={() => navigate(-1)}/>
                <SaveButton text={t('TEXT.SAVE')} onClick={() => console.log('save')} />
            </Box>
        </Box>
    );
};

export default CarTabErrorReport;