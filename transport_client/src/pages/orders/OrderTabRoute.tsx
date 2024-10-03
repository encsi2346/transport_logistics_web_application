import {Box, Grid} from "@mui/material";
import NormalText from "../../components/text/NormalText";

const OrderTabRoute = () => {
    return (
        <Box>
            <Grid item container direction="column" spacing={2}>
                <Grid item container direction="row" xs={4} md={8} spacing={6} columns={36}>
                    <Grid item xs={4} md={4}>
                        <Box sx={{ display: 'inline', paddingLeft: 120}}>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', minWidth: 120 }}>
                                <NormalText text={'Tervezett érkezés'} />
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={4} md={4}>
                        <Box sx={{ display: 'inline', paddingLeft: 120}}>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', minWidth: 120 }}>
                                <NormalText text={'Valós érkezés'} />
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={4} md={4}>
                        <Box sx={{ display: 'inline', paddingLeft: 120}}>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', minWidth: 120 }}>
                                <NormalText text={'Cím'} />
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={4} md={4}>
                        <Box sx={{ display: 'inline', paddingLeft: 120}}>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', minWidth: 120 }}>
                                <NormalText text={'Feladat'} />
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={4} md={4}>
                        <Box sx={{ display: 'inline', paddingLeft: 120}}>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', minWidth: 120 }}>
                                <NormalText text={'Levezetetett km'} />
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={4} md={4}>
                        <Box sx={{ display: 'inline', paddingLeft: 120}}>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', minWidth: 120 }}>
                                <NormalText text={'Levezetett óra'} />
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={4} md={4}>
                        <Box sx={{ display: 'inline', paddingLeft: 120}}>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', minWidth: 120 }}>
                                <NormalText text={'Tervezett indulás'} />
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={4} md={4}>
                        <Box sx={{ display: 'inline', paddingLeft: 120}}>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', minWidth: 120 }}>
                                <NormalText text={'Valós indulás'} />
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={4} md={4}>
                        <Box sx={{ display: 'inline', paddingLeft: 120}}>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', minWidth: 120 }}>
                                <NormalText text={''} />
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
                <Grid item container direction="row" xs={4} md={8} spacing={6} columns={36}>
                    <Grid item xs={4} md={4}>
                        <Box sx={{ display: 'inline', paddingLeft: 120}}>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', minWidth: 120 }}>
                                <NormalText text={'2024.01.30'} />
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', minWidth: 120 }}>
                                <NormalText text={'08:00'} />
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={4} md={4}>
                        <Box sx={{ display: 'inline', paddingLeft: 120}}>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', minWidth: 120 }}>
                                <NormalText text={'2024.01.30.'} />
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', minWidth: 120 }}>
                                <NormalText text={'08:00'} />
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={4} md={4}>
                        <Box sx={{ display: 'inline', paddingLeft: 120}}>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', minWidth: 120 }}>
                                <NormalText text={'Raktár'} />
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', minWidth: 120 }}>
                                <NormalText text={'1000 Budapest'} />
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', minWidth: 120 }}>
                                <NormalText text={'Moszkva utca 15.'} />
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={4} md={4}>
                        <Box sx={{ display: 'inline', paddingLeft: 120}}>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', minWidth: 120 }}>
                                <NormalText text={'Bepakolás'} />
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={4} md={4}>
                        <Box sx={{ display: 'inline', paddingLeft: 120}}>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', minWidth: 120 }}>
                                <NormalText text={'0 km'} />
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={4} md={4}>
                        <Box sx={{ display: 'inline', paddingLeft: 120}}>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', minWidth: 120 }}>
                                <NormalText text={'0óra 0perc'} />
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={4} md={4}>
                        <Box sx={{ display: 'inline', paddingLeft: 120}}>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', minWidth: 120 }}>
                                <NormalText text={'2024.01.30.'} />
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', minWidth: 120 }}>
                                <NormalText text={'08:10'} />
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={4} md={4}>
                        <Box sx={{ display: 'inline', paddingLeft: 120}}>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', minWidth: 120 }}>
                                <NormalText text={'2024.01.30.'} />
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', minWidth: 120 }}>
                                <NormalText text={'08:15'} />
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={4} md={4}>
                        <Box sx={{ display: 'inline', paddingLeft: 120}}>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', minWidth: 120 }}>
                                <NormalText text={'TELJESÍTVE'} />
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
                <Grid item container direction="row" xs={4} md={8} spacing={6} columns={36}>
                    <Grid item xs={4} md={4}>
                        <Box sx={{ display: 'inline', paddingLeft: 120}}>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', minWidth: 120 }}>
                                <NormalText text={'2024.01.30'} />
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', minWidth: 120 }}>
                                <NormalText text={'11:00'} />
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={4} md={4}>
                        <Box sx={{ display: 'inline', paddingLeft: 120}}>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', minWidth: 120 }}>
                                <NormalText text={'2024.01.30.'} />
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', minWidth: 120 }}>
                                <NormalText text={'11:02'} />
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={4} md={4}>
                        <Box sx={{ display: 'inline', paddingLeft: 120}}>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', minWidth: 120 }}>
                                <NormalText text={'2300 Debrecen'} />
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', minWidth: 120 }}>
                                <NormalText text={'Kiskikerics körút 112.'} />
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={4} md={4}>
                        <Box sx={{ display: 'inline', paddingLeft: 120}}>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', minWidth: 120 }}>
                                <NormalText text={'Ki-Bepakolás'} />
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={4} md={4}>
                        <Box sx={{ display: 'inline', paddingLeft: 120}}>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', minWidth: 120 }}>
                                <NormalText text={'185 km'} />
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={4} md={4}>
                        <Box sx={{ display: 'inline', paddingLeft: 120}}>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', minWidth: 120 }}>
                                <NormalText text={'3óra 2perc'} />
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={4} md={4}>
                        <Box sx={{ display: 'inline', paddingLeft: 120}}>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', minWidth: 120 }}>
                                <NormalText text={'2024.01.30.'} />
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', minWidth: 120 }}>
                                <NormalText text={'11:20'} />
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={4} md={4}>
                        <Box sx={{ display: 'inline', paddingLeft: 120}}>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', minWidth: 120 }}>
                                <NormalText text={'2024.01.30.'} />
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', minWidth: 120 }}>
                                <NormalText text={'-'} />
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={4} md={4}>
                        <Box sx={{ display: 'inline', paddingLeft: 120}}>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', minWidth: 120 }}>
                                <NormalText text={'FOLYAMATBAN'} />
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
                <Grid item container direction="row" xs={4} md={8} spacing={6} columns={36}>
                    <Grid item xs={4} md={4}>
                        <Box sx={{ display: 'inline', paddingLeft: 120}}>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', minWidth: 120 }}>
                                <NormalText text={'2024.01.30'} />
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', minWidth: 120 }}>
                                <NormalText text={'13:10'} />
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={4} md={4}>
                        <Box sx={{ display: 'inline', paddingLeft: 120}}>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', minWidth: 120 }}>
                                <NormalText text={'2024.01.30.'} />
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', minWidth: 120 }}>
                                <NormalText text={'-'} />
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={4} md={4}>
                        <Box sx={{ display: 'inline', paddingLeft: 120}}>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', minWidth: 120 }}>
                                <NormalText text={'2345 Kispusztafalu'} />
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', minWidth: 120 }}>
                                <NormalText text={'Petőfi utca 2.'} />
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={4} md={4}>
                        <Box sx={{ display: 'inline', paddingLeft: 120}}>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', minWidth: 120 }}>
                                <NormalText text={'Kipakolás'} />
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={4} md={4}>
                        <Box sx={{ display: 'inline', paddingLeft: 120}}>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', minWidth: 120 }}>
                                <NormalText text={'0 km'} />
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={4} md={4}>
                        <Box sx={{ display: 'inline', paddingLeft: 120}}>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', minWidth: 120 }}>
                                <NormalText text={'0óra 0perc'} />
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={4} md={4}>
                        <Box sx={{ display: 'inline', paddingLeft: 120}}>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', minWidth: 120 }}>
                                <NormalText text={'2024.01.30.'} />
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', minWidth: 120 }}>
                                <NormalText text={'13:45'} />
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={4} md={4}>
                        <Box sx={{ display: 'inline', paddingLeft: 120}}>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', minWidth: 120 }}>
                                <NormalText text={'2024.01.30.'} />
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', minWidth: 120 }}>
                                <NormalText text={'-'} />
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={4} md={4}>
                        <Box sx={{ display: 'inline', paddingLeft: 120}}>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', minWidth: 120 }}>
                                <NormalText text={'VÁRAKOZÁS'} />
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
                <Grid item container direction="row" xs={4} md={8} spacing={6} columns={36}>
                    <Grid item xs={4} md={4}>
                        <Box sx={{ display: 'inline', paddingLeft: 120}}>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', minWidth: 120 }}>
                                <NormalText text={'2024.01.30'} />
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', minWidth: 120 }}>
                                <NormalText text={'16:00'} />
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={4} md={4}>
                        <Box sx={{ display: 'inline', paddingLeft: 120}}>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', minWidth: 120 }}>
                                <NormalText text={'2024.01.30.'} />
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', minWidth: 120 }}>
                                <NormalText text={'-'} />
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={4} md={4}>
                        <Box sx={{ display: 'inline', paddingLeft: 120}}>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', minWidth: 120 }}>
                                <NormalText text={'Raktár'} />
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', minWidth: 120 }}>
                                <NormalText text={'1000 Budapest'} />
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', minWidth: 120 }}>
                                <NormalText text={'Moszkva utca 15.'} />
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={4} md={4}>
                        <Box sx={{ display: 'inline', paddingLeft: 120}}>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', minWidth: 120 }}>
                                <NormalText text={'Kipakolás'} />
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={4} md={4}>
                        <Box sx={{ display: 'inline', paddingLeft: 120}}>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', minWidth: 120 }}>
                                <NormalText text={'0 km'} />
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={4} md={4}>
                        <Box sx={{ display: 'inline', paddingLeft: 120}}>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', minWidth: 120 }}>
                                <NormalText text={'0óra 0perc'} />
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={4} md={4}>
                        <Box sx={{ display: 'inline', paddingLeft: 120}}>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', minWidth: 120 }}>
                                <NormalText text={'2024.01.30.'} />
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', minWidth: 120 }}>
                                <NormalText text={'-'} />
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={4} md={4}>
                        <Box sx={{ display: 'inline', paddingLeft: 120}}>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', minWidth: 120 }}>
                                <NormalText text={'2024.01.30.'} />
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', minWidth: 120 }}>
                                <NormalText text={'-'} />
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={4} md={4}>
                        <Box sx={{ display: 'inline', paddingLeft: 120}}>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', minWidth: 120 }}>
                                <NormalText text={'VÁRAKOZÁS'} />
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
};

export default OrderTabRoute;