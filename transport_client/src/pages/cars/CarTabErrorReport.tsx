import {Box, Grid} from "@mui/material";
import NormalText from "../../components/text/NormalText";

const CarTabErrorReport = () => {
    return (
        <Box sx={{ display: 'flex'}}>
            <Box sx={{ backgroundColor: '#dedede', width: 800}}>
                <Grid item container direction="column" spacing={2}>
                    <Grid item container direction="row" xs={4} md={8} spacing={6}  columns={20}>
                        <Grid item xs={4} md={4}>
                            <Box sx={{ display: 'inline', paddingLeft: 120}}>
                                <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', minWidth: 120 }}>
                                    <NormalText text={'Tárgy:'} />
                                    <NormalText text={'Hibabejelentés'} />
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                    <Grid item container direction="row" xs={4} md={8} spacing={6}  columns={20}>
                        <Grid item xs={4} md={4}>
                            <Box sx={{ display: 'inline', paddingLeft: 120}}>
                                <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', minWidth: 120 }}>
                                    <NormalText text={'Leírás:'} />
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                    <Grid item container direction="row" xs={4} md={8} spacing={6}  columns={20}>
                        <Grid item xs={4} md={4}>
                            <Box sx={{ display: 'inline', paddingLeft: 120}}>
                                <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', minWidth: 120 }}>
                                    <NormalText text={'Kopottak a gumik.'} />
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
            <Box  sx={{ backgroundColor: '#858585', width: 500}}>
                <Grid item container direction="column" spacing={2}>
                    <Grid item container direction="row" xs={4} md={8} spacing={6}  columns={20}>
                        <Grid item xs={4} md={4}>
                            <Box sx={{ display: 'inline', paddingLeft: 120}}>
                                <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', minWidth: 120 }}>
                                    <NormalText text={'Bejelentő:'} />
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                    <Grid item container direction="row" xs={4} md={8} spacing={6}  columns={20}>
                        <Grid item xs={4} md={4}>
                            <Box sx={{backgroundColor: "#000000", width: 100, height: 100}} />
                        </Grid>
                        <Grid item xs={4} md={4}>
                            <Box sx={{ display: 'inline', paddingLeft: 120}}>
                                <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', minWidth: 120 }}>
                                    <NormalText text={'Sofőr Zoltán'} />
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', minWidth: 120 }}>
                                    <NormalText text={'Applikáción keresztül'} />
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', minWidth: 120 }}>
                                    <NormalText text={'2024.01.28. 17:32'} />
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default CarTabErrorReport;