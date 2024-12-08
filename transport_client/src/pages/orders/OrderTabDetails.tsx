import {Box, FormControl, Grid, InputAdornment, InputLabel, MenuItem, Select} from "@mui/material";
import NormalText from "../../components/text/NormalText";
import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import {useParams} from "react-router-dom";
import ClearIcon from "@mui/icons-material/Clear";

interface Props {
    isEditing?: boolean;
    isInputDisabled?: boolean;
}

const OrderTabDetails = ({ isEditing = false, isInputDisabled }: Props) => {
    const { id } = useParams();
    const [t, i18n] = useTranslation();
    const [inputDisabled, setInputDisabled] = useState(isInputDisabled);
    const [values, setValues] = useState({
        userId: '',
        familyName: '',
        firstName: '',
        gender: 'male',
        nationality: '',
        birthPlace: '',
        birthDate: '',
        IDCardNumber: '',
        validityDateOfIDCard: '',
        drivingLicenceNumber: '',
        drivingLicenceCategories: 'A',
        validityDateOfDrivingLicence: '',
        dateOfMedicalVisit: '',
        medicalVisitStatus: '',
        email: '',
        phoneNumber: null,
        country: '',
        postcode: null,
        city: '',
        nameOfPublicArea: '',
        typeOfPublicArea: '',
        houseNumber: null,
        dateOfRegistration: '',
        startDateOfContract: '',
        endDateOfContract: '',
        position: '',
        lineManager: '',
        healthProblem: '',
        picturePath: '',
        image: null,
    });

    const handleChange = (prop: any) => (event: any) => {
        setValues({...values, [prop]: event.target.value });
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        let submitData = data as any;
    };

    return (
        <Box>
            <form
                autoComplete='off'
                onSubmit={(e) => handleSubmit(e)}
            >
                <Grid item container direction="column" spacing={2}>
                    <Grid item container direction="row" xs={4} md={8} spacing={6} columns={30}>
                        <Grid item xs={5} md={5}>
                            <Box sx={{display: 'inline', paddingLeft: 120}}>
                                <Box sx={{
                                    display: 'flex',
                                    justifyContent: 'flex-start',
                                    alignItems: 'flex-start',
                                    minWidth: 120
                                }}>
                                    <NormalText text={'Megrendelő'}/>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={5} md={5}>
                            {isEditing ? (
                                <Box sx={{display: 'inline', paddingLeft: 120}}>
                                    <Box sx={{
                                        display: 'flex',
                                        justifyContent: 'flex-start',
                                        alignItems: 'flex-start',
                                        minWidth: 120
                                    }}>
                                        <NormalText text={'Vik Kft.'}/>
                                    </Box>
                                    <Box sx={{
                                        display: 'flex',
                                        justifyContent: 'flex-start',
                                        alignItems: 'flex-start',
                                        minWidth: 120
                                    }}>
                                        <NormalText text={'2300 Debrecen'}/>
                                    </Box>
                                    <Box sx={{
                                        display: 'flex',
                                        justifyContent: 'flex-start',
                                        alignItems: 'flex-start',
                                        minWidth: 120
                                    }}>
                                        <NormalText text={'Kiskikerics körút 12.'}/>
                                    </Box>
                                </Box>
                            ) : (
                                <Box sx={{
                                    display: 'inline',
                                    minWidth: 120
                                }}>
                                    <FormControl>
                                        <InputLabel>{t('USER.DRIVING_LICENCE_CATEGORIES')}</InputLabel>
                                        <Select //TODO: multiselect
                                            id="drivingLicenceCategories"
                                            placeholder={t('USER.DRIVING_LICENCE_CATEGORIES')}
                                            name='drivingLicenceCategories'
                                            label={t('USER.DRIVING_LICENCE_CATEGORIES')}
                                            data-testid='driving-licence-categories'
                                            disabled={inputDisabled}
                                            required
                                            value={values.drivingLicenceCategories ?? ''}
                                            onChange={handleChange('drivingLicenceCategories')}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <ClearIcon
                                                            sx={{color: '#000000', cursor: 'pointer'}}
                                                            onClick={() => setValues({...values, drivingLicenceCategories: '' })}
                                                        />
                                                    </InputAdornment>
                                                )
                                            }}
                                            sx={{
                                                backgroundColor: `#ffffff`,
                                                borderRadius: '8px',
                                                color: `#000000`,
                                                textDecoration: 'none',
                                                height: 40,
                                                width: 250,
                                                display: 'flex',
                                                justifyContent: 'center',
                                                fontSize: "15px",
                                                "& fieldset": {border: 'none'},
                                            }}
                                        >
                                            {/*Object.values(drivingLicenceList).map((drivingLicence) => (
                                                <MenuItem key={drivingLicence} value={drivingLicence}>
                                                    {drivingLicence}
                                                </MenuItem>
                                            ))*/}
                                        </Select>
                                    </FormControl>
                                </Box>
                            )}
                        </Grid>
                        <Grid item xs={5} md={5}>
                            <Box sx={{display: 'inline', paddingLeft: 120}}>
                                <Box sx={{
                                    display: 'flex',
                                    justifyContent: 'flex-start',
                                    alignItems: 'flex-start',
                                    minWidth: 120
                                }}>
                                    <NormalText text={'Kapcsolattartó'}/>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={5} md={5}>
                            {isEditing ? (
                                <Box sx={{display: 'inline', paddingLeft: 120}}>
                                    <Box sx={{
                                        display: 'flex',
                                        justifyContent: 'flex-start',
                                        alignItems: 'flex-start',
                                        minWidth: 120
                                    }}>
                                        <NormalText text={'Kapcsolat Dániel'}/>
                                    </Box>
                                    <Box sx={{
                                        display: 'flex',
                                        justifyContent: 'flex-start',
                                        alignItems: 'flex-start',
                                        minWidth: 120
                                    }}>
                                        <NormalText text={'+36301112222'}/>
                                    </Box>
                                    <Box sx={{
                                        display: 'flex',
                                        justifyContent: 'flex-start',
                                        alignItems: 'flex-start',
                                        minWidth: 120
                                    }}>
                                        <NormalText text={'vikkft@email.hu'}/>
                                    </Box>
                                </Box>
                            ) : (
                                <Box sx={{
                                    display: 'inline',
                                    minWidth: 120
                                }}>
                                    <FormControl>
                                        <InputLabel>{t('USER.DRIVING_LICENCE_CATEGORIES')}</InputLabel>
                                        <Select //TODO: multiselect
                                            id="drivingLicenceCategories"
                                            placeholder={t('USER.DRIVING_LICENCE_CATEGORIES')}
                                            name='drivingLicenceCategories'
                                            label={t('USER.DRIVING_LICENCE_CATEGORIES')}
                                            data-testid='driving-licence-categories'
                                            disabled={inputDisabled}
                                            required
                                            value={values.drivingLicenceCategories ?? ''}
                                            onChange={handleChange('drivingLicenceCategories')}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <ClearIcon
                                                            sx={{color: '#000000', cursor: 'pointer'}}
                                                            onClick={() => setValues({...values, drivingLicenceCategories: '' })}
                                                        />
                                                    </InputAdornment>
                                                )
                                            }}
                                            sx={{
                                                backgroundColor: `#ffffff`,
                                                borderRadius: '8px',
                                                color: `#000000`,
                                                textDecoration: 'none',
                                                height: 40,
                                                width: 250,
                                                display: 'flex',
                                                justifyContent: 'center',
                                                fontSize: "15px",
                                                "& fieldset": {border: 'none'},
                                            }}
                                        >
                                            {/*Object.values(drivingLicenceList).map((drivingLicence) => (
                                                <MenuItem key={drivingLicence} value={drivingLicence}>
                                                    {drivingLicence}
                                                </MenuItem>
                                            ))*/}
                                        </Select>
                                    </FormControl>
                                </Box>
                            )}
                        </Grid>
                    </Grid>
                    <Grid item container direction="row" xs={4} md={8} spacing={6} columns={30}>
                        <Grid item xs={5} md={5}>
                            <Box sx={{display: 'inline', paddingLeft: 120}}>
                                <Box sx={{
                                    display: 'flex',
                                    justifyContent: 'flex-start',
                                    alignItems: 'flex-start',
                                    minWidth: 120
                                }}>
                                    <NormalText text={'Sofőr'}/>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={5} md={5}>
                            {isEditing ? (
                                <Box sx={{display: 'inline', paddingLeft: 120}}>
                                    <Box sx={{
                                        display: 'flex',
                                        justifyContent: 'flex-start',
                                        alignItems: 'flex-start',
                                        minWidth: 120
                                    }}>
                                        <NormalText text={'Sofőr Géza'}/>
                                    </Box>
                                    <Box sx={{
                                        display: 'flex',
                                        justifyContent: 'flex-start',
                                        alignItems: 'flex-start',
                                        minWidth: 120
                                    }}>
                                        <NormalText text={'+36301234567'}/>
                                    </Box>
                                    <Box sx={{
                                        display: 'flex',
                                        justifyContent: 'flex-start',
                                        alignItems: 'flex-start',
                                        minWidth: 120
                                    }}>
                                        <NormalText text={'sofor.geza@email.hu'}/>
                                    </Box>
                                </Box>
                            ) : (
                                <Box sx={{
                                    display: 'inline',
                                    minWidth: 120
                                }}>
                                    <FormControl>
                                        <InputLabel>{t('USER.DRIVING_LICENCE_CATEGORIES')}</InputLabel>
                                        <Select //TODO: multiselect
                                            id="drivingLicenceCategories"
                                            placeholder={t('USER.DRIVING_LICENCE_CATEGORIES')}
                                            name='drivingLicenceCategories'
                                            label={t('USER.DRIVING_LICENCE_CATEGORIES')}
                                            data-testid='driving-licence-categories'
                                            disabled={inputDisabled}
                                            required
                                            value={values.drivingLicenceCategories ?? ''}
                                            onChange={handleChange('drivingLicenceCategories')}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <ClearIcon
                                                            sx={{color: '#000000', cursor: 'pointer'}}
                                                            onClick={() => setValues({...values, drivingLicenceCategories: '' })}
                                                        />
                                                    </InputAdornment>
                                                )
                                            }}
                                            sx={{
                                                backgroundColor: `#ffffff`,
                                                borderRadius: '8px',
                                                color: `#000000`,
                                                textDecoration: 'none',
                                                height: 40,
                                                width: 250,
                                                display: 'flex',
                                                justifyContent: 'center',
                                                fontSize: "15px",
                                                "& fieldset": {border: 'none'},
                                            }}
                                        >
                                            {/*Object.values(drivingLicenceList).map((drivingLicence) => (
                                                <MenuItem key={drivingLicence} value={drivingLicence}>
                                                    {drivingLicence}
                                                </MenuItem>
                                            ))*/}
                                        </Select>
                                    </FormControl>
                                </Box>
                            )}
                        </Grid>
                        <Grid item xs={5} md={5}>
                            <Box sx={{display: 'inline', paddingLeft: 120}}>
                                <Box sx={{
                                    display: 'flex',
                                    justifyContent: 'flex-start',
                                    alignItems: 'flex-start',
                                    minWidth: 120
                                }}>
                                    <NormalText text={'Jármű'}/>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={5} md={5}>
                            {isEditing ? (
                                <Box sx={{display: 'inline', paddingLeft: 120}}>
                                    <Box sx={{
                                        display: 'flex',
                                        justifyContent: 'flex-start',
                                        alignItems: 'flex-start',
                                        minWidth: 120
                                    }}>
                                        <NormalText text={'MKP-111'}/>
                                    </Box>
                                    <Box sx={{
                                        display: 'flex',
                                        justifyContent: 'flex-start',
                                        alignItems: 'flex-start',
                                        minWidth: 120
                                    }}>
                                        <NormalText text={'Fiat Ducato 256 Jet2.8'}/>
                                    </Box>
                                </Box>
                            ) : (
                                <Box sx={{
                                    display: 'inline',
                                    minWidth: 120
                                }}>
                                    <FormControl>
                                        <InputLabel>{t('USER.DRIVING_LICENCE_CATEGORIES')}</InputLabel>
                                        <Select //TODO: multiselect
                                            id="drivingLicenceCategories"
                                            placeholder={t('USER.DRIVING_LICENCE_CATEGORIES')}
                                            name='drivingLicenceCategories'
                                            label={t('USER.DRIVING_LICENCE_CATEGORIES')}
                                            data-testid='driving-licence-categories'
                                            disabled={inputDisabled}
                                            required
                                            value={values.drivingLicenceCategories ?? ''}
                                            onChange={handleChange('drivingLicenceCategories')}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <ClearIcon
                                                            sx={{color: '#000000', cursor: 'pointer'}}
                                                            onClick={() => setValues({...values, drivingLicenceCategories: '' })}
                                                        />
                                                    </InputAdornment>
                                                )
                                            }}
                                            sx={{
                                                backgroundColor: `#ffffff`,
                                                borderRadius: '8px',
                                                color: `#000000`,
                                                textDecoration: 'none',
                                                height: 40,
                                                width: 250,
                                                display: 'flex',
                                                justifyContent: 'center',
                                                fontSize: "15px",
                                                "& fieldset": {border: 'none'},
                                            }}
                                        >
                                            {/*Object.values(drivingLicenceList).map((drivingLicence) => (
                                                <MenuItem key={drivingLicence} value={drivingLicence}>
                                                    {drivingLicence}
                                                </MenuItem>
                                            ))*/}
                                        </Select>
                                    </FormControl>
                                </Box>
                            )}
                        </Grid>
                    </Grid>
                    <Grid item container direction="row" xs={4} md={8} spacing={6} columns={30}>
                        <Grid item xs={5} md={5}>
                            <Box sx={{display: 'inline', paddingLeft: 120}}>
                                <Box sx={{
                                    display: 'flex',
                                    justifyContent: 'flex-start',
                                    alignItems: 'flex-start',
                                    minWidth: 120
                                }}>
                                    <NormalText text={'Tervezett km'}/>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={5} md={5}>
                            { isEditing ? (
                                <Box sx={{display: 'inline', paddingLeft: 120}}>
                                    <Box sx={{
                                        display: 'flex',
                                        justifyContent: 'flex-start',
                                        alignItems: 'flex-start',
                                        minWidth: 120
                                    }}>
                                        <NormalText text={'325 km'}/>
                                    </Box>
                                </Box>
                            ) : (
                                <Box sx={{
                                    display: 'inline',
                                    minWidth: 120
                                }}>
                                    <FormControl>
                                        <InputLabel>{t('USER.DRIVING_LICENCE_CATEGORIES')}</InputLabel>
                                        <Select //TODO: multiselect
                                            id="drivingLicenceCategories"
                                            placeholder={t('USER.DRIVING_LICENCE_CATEGORIES')}
                                            name='drivingLicenceCategories'
                                            label={t('USER.DRIVING_LICENCE_CATEGORIES')}
                                            data-testid='driving-licence-categories'
                                            disabled={inputDisabled}
                                            required
                                            value={values.drivingLicenceCategories ?? ''}
                                            onChange={handleChange('drivingLicenceCategories')}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <ClearIcon
                                                            sx={{color: '#000000', cursor: 'pointer'}}
                                                            onClick={() => setValues({...values, drivingLicenceCategories: '' })}
                                                        />
                                                    </InputAdornment>
                                                )
                                            }}
                                            sx={{
                                                backgroundColor: `#ffffff`,
                                                borderRadius: '8px',
                                                color: `#000000`,
                                                textDecoration: 'none',
                                                height: 40,
                                                width: 250,
                                                display: 'flex',
                                                justifyContent: 'center',
                                                fontSize: "15px",
                                                "& fieldset": {border: 'none'},
                                            }}
                                        >
                                            {/*Object.values(drivingLicenceList).map((drivingLicence) => (
                                                <MenuItem key={drivingLicence} value={drivingLicence}>
                                                    {drivingLicence}
                                                </MenuItem>
                                            ))*/}
                                        </Select>
                                    </FormControl>
                                </Box>
                            )}
                        </Grid>
                        <Grid item xs={5} md={5}>
                            <Box sx={{display: 'inline', paddingLeft: 120}}>
                                <Box sx={{
                                    display: 'flex',
                                    justifyContent: 'flex-start',
                                    alignItems: 'flex-start',
                                    minWidth: 120
                                }}>
                                    <NormalText text={'Tervezett idő'}/>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={5} md={5}>
                            { isEditing ? (
                                <Box sx={{display: 'inline', paddingLeft: 120}}>
                                    <Box sx={{
                                        display: 'flex',
                                        justifyContent: 'flex-start',
                                        alignItems: 'flex-start',
                                        minWidth: 120
                                    }}>
                                        <NormalText text={'8óra 12perc'}/>
                                    </Box>
                                </Box>
                            ) : (
                                <Box sx={{
                                    display: 'inline',
                                    minWidth: 120
                                }}>
                                    <FormControl>
                                        <InputLabel>{t('USER.DRIVING_LICENCE_CATEGORIES')}</InputLabel>
                                        <Select //TODO: multiselect
                                            id="drivingLicenceCategories"
                                            placeholder={t('USER.DRIVING_LICENCE_CATEGORIES')}
                                            name='drivingLicenceCategories'
                                            label={t('USER.DRIVING_LICENCE_CATEGORIES')}
                                            data-testid='driving-licence-categories'
                                            disabled={inputDisabled}
                                            required
                                            value={values.drivingLicenceCategories ?? ''}
                                            onChange={handleChange('drivingLicenceCategories')}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <ClearIcon
                                                            sx={{color: '#000000', cursor: 'pointer'}}
                                                            onClick={() => setValues({...values, drivingLicenceCategories: '' })}
                                                        />
                                                    </InputAdornment>
                                                )
                                            }}
                                            sx={{
                                                backgroundColor: `#ffffff`,
                                                borderRadius: '8px',
                                                color: `#000000`,
                                                textDecoration: 'none',
                                                height: 40,
                                                width: 250,
                                                display: 'flex',
                                                justifyContent: 'center',
                                                fontSize: "15px",
                                                "& fieldset": {border: 'none'},
                                            }}
                                        >
                                            {/*Object.values(drivingLicenceList).map((drivingLicence) => (
                                                <MenuItem key={drivingLicence} value={drivingLicence}>
                                                    {drivingLicence}
                                                </MenuItem>
                                            ))*/}
                                        </Select>
                                    </FormControl>
                                </Box>
                            )}
                        </Grid>
                    </Grid>
                    <Grid item container direction="row" xs={4} md={8} spacing={6} columns={30}>
                        <Grid item xs={5} md={5}>
                            <Box sx={{display: 'inline', paddingLeft: 120}}>
                                <Box sx={{
                                    display: 'flex',
                                    justifyContent: 'flex-start',
                                    alignItems: 'flex-start',
                                    minWidth: 120
                                }}>
                                    <NormalText text={'Szállítmány típusa'}/>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={5} md={5}>
                            {isEditing ? (
                                <Box sx={{display: 'inline', paddingLeft: 120}}>
                                    <Box sx={{
                                        display: 'flex',
                                        justifyContent: 'flex-start',
                                        alignItems: 'flex-start',
                                        minWidth: 120
                                    }}>
                                        <NormalText text={'normál'}/>
                                    </Box>
                                </Box>
                            ) : (
                                <Box sx={{
                                    display: 'inline',
                                    minWidth: 120
                                }}>
                                    <FormControl>
                                        <InputLabel>{t('USER.DRIVING_LICENCE_CATEGORIES')}</InputLabel>
                                        <Select //TODO: multiselect
                                            id="drivingLicenceCategories"
                                            placeholder={t('USER.DRIVING_LICENCE_CATEGORIES')}
                                            name='drivingLicenceCategories'
                                            label={t('USER.DRIVING_LICENCE_CATEGORIES')}
                                            data-testid='driving-licence-categories'
                                            disabled={inputDisabled}
                                            required
                                            value={values.drivingLicenceCategories ?? ''}
                                            onChange={handleChange('drivingLicenceCategories')}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <ClearIcon
                                                            sx={{color: '#000000', cursor: 'pointer'}}
                                                            onClick={() => setValues({...values, drivingLicenceCategories: '' })}
                                                        />
                                                    </InputAdornment>
                                                )
                                            }}
                                            sx={{
                                                backgroundColor: `#ffffff`,
                                                borderRadius: '8px',
                                                color: `#000000`,
                                                textDecoration: 'none',
                                                height: 40,
                                                width: 250,
                                                display: 'flex',
                                                justifyContent: 'center',
                                                fontSize: "15px",
                                                "& fieldset": {border: 'none'},
                                            }}
                                        >
                                            {/*Object.values(drivingLicenceList).map((drivingLicence) => (
                                                <MenuItem key={drivingLicence} value={drivingLicence}>
                                                    {drivingLicence}
                                                </MenuItem>
                                            ))*/}
                                        </Select>
                                    </FormControl>
                                </Box>
                            )}
                        </Grid>
                        <Grid item xs={5} md={5}>
                            <Box sx={{display: 'inline', paddingLeft: 120}}>
                                <Box sx={{
                                    display: 'flex',
                                    justifyContent: 'flex-start',
                                    alignItems: 'flex-start',
                                    minWidth: 120
                                }}>
                                    <NormalText text={'Megjegyzés'}/>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={5} md={5}>
                            {isEditing ? (
                                <Box sx={{display: 'inline', paddingLeft: 120}}>
                                    <Box sx={{
                                        display: 'flex',
                                        justifyContent: 'flex-start',
                                        alignItems: 'flex-start',
                                        minWidth: 120
                                    }}>
                                        <NormalText text={'-'}/>
                                    </Box>
                                </Box>
                            ) : (
                                <Box sx={{
                                    display: 'inline',
                                    minWidth: 120
                                }}>
                                    <FormControl>
                                        <InputLabel>{t('USER.DRIVING_LICENCE_CATEGORIES')}</InputLabel>
                                        <Select //TODO: multiselect
                                            id="drivingLicenceCategories"
                                            placeholder={t('USER.DRIVING_LICENCE_CATEGORIES')}
                                            name='drivingLicenceCategories'
                                            label={t('USER.DRIVING_LICENCE_CATEGORIES')}
                                            data-testid='driving-licence-categories'
                                            disabled={inputDisabled}
                                            required
                                            value={values.drivingLicenceCategories ?? ''}
                                            onChange={handleChange('drivingLicenceCategories')}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <ClearIcon
                                                            sx={{color: '#000000', cursor: 'pointer'}}
                                                            onClick={() => setValues({...values, drivingLicenceCategories: '' })}
                                                        />
                                                    </InputAdornment>
                                                )
                                            }}
                                            sx={{
                                                backgroundColor: `#ffffff`,
                                                borderRadius: '8px',
                                                color: `#000000`,
                                                textDecoration: 'none',
                                                height: 40,
                                                width: 250,
                                                display: 'flex',
                                                justifyContent: 'center',
                                                fontSize: "15px",
                                                "& fieldset": {border: 'none'},
                                            }}
                                        >
                                            {/*Object.values(drivingLicenceList).map((drivingLicence) => (
                                                <MenuItem key={drivingLicence} value={drivingLicence}>
                                                    {drivingLicence}
                                                </MenuItem>
                                            ))*/}
                                        </Select>
                                    </FormControl>
                                </Box>
                            )}
                        </Grid>
                    </Grid>
                    <Grid item container direction="row" xs={4} md={8} spacing={6} columns={30}>
                        <Grid item xs={5} md={5}>
                            <Box sx={{display: 'inline', paddingLeft: 120}}>
                                <Box sx={{
                                    display: 'flex',
                                    justifyContent: 'flex-start',
                                    alignItems: 'flex-start',
                                    minWidth: 120
                                }}>
                                    <NormalText text={'Ár'}/>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={5} md={5}>
                            {isEditing ? (
                                <Box sx={{display: 'inline', paddingLeft: 120}}>
                                    <Box sx={{
                                        display: 'flex',
                                        justifyContent: 'flex-start',
                                        alignItems: 'flex-start',
                                        minWidth: 120
                                    }}>
                                        <NormalText text={'2511 euró'}/>
                                    </Box>
                                </Box>
                            ) : (
                                <Box sx={{
                                    display: 'inline',
                                    minWidth: 120
                                }}>
                                    <FormControl>
                                        <InputLabel>{t('USER.DRIVING_LICENCE_CATEGORIES')}</InputLabel>
                                        <Select //TODO: multiselect
                                            id="drivingLicenceCategories"
                                            placeholder={t('USER.DRIVING_LICENCE_CATEGORIES')}
                                            name='drivingLicenceCategories'
                                            label={t('USER.DRIVING_LICENCE_CATEGORIES')}
                                            data-testid='driving-licence-categories'
                                            disabled={inputDisabled}
                                            required
                                            value={values.drivingLicenceCategories ?? ''}
                                            onChange={handleChange('drivingLicenceCategories')}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <ClearIcon
                                                            sx={{color: '#000000', cursor: 'pointer'}}
                                                            onClick={() => setValues({...values, drivingLicenceCategories: '' })}
                                                        />
                                                    </InputAdornment>
                                                )
                                            }}
                                            sx={{
                                                backgroundColor: `#ffffff`,
                                                borderRadius: '8px',
                                                color: `#000000`,
                                                textDecoration: 'none',
                                                height: 40,
                                                width: 250,
                                                display: 'flex',
                                                justifyContent: 'center',
                                                fontSize: "15px",
                                                "& fieldset": {border: 'none'},
                                            }}
                                        >
                                            {/*Object.values(drivingLicenceList).map((drivingLicence) => (
                                                <MenuItem key={drivingLicence} value={drivingLicence}>
                                                    {drivingLicence}
                                                </MenuItem>
                                            ))*/}
                                        </Select>
                                    </FormControl>
                                </Box>
                            )}
                        </Grid>
                        <Grid item xs={5} md={5}>
                            <Box sx={{display: 'inline', paddingLeft: 120}}>
                                <Box sx={{
                                    display: 'flex',
                                    justifyContent: 'flex-start',
                                    alignItems: 'flex-start',
                                    minWidth: 120
                                }}>
                                    <NormalText text={'Profit'}/>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={5} md={5}>
                            {isEditing ? (
                                <Box sx={{display: 'inline', paddingLeft: 120}}>
                                    <Box sx={{
                                        display: 'flex',
                                        justifyContent: 'flex-start',
                                        alignItems: 'flex-start',
                                        minWidth: 120
                                    }}>
                                        <NormalText text={'800 euró'}/>
                                    </Box>
                                </Box>
                            ) : (
                                <Box sx={{
                                    display: 'inline',
                                    minWidth: 120
                                }}>
                                    <FormControl>
                                        <InputLabel>{t('USER.DRIVING_LICENCE_CATEGORIES')}</InputLabel>
                                        <Select //TODO: multiselect
                                            id="drivingLicenceCategories"
                                            placeholder={t('USER.DRIVING_LICENCE_CATEGORIES')}
                                            name='drivingLicenceCategories'
                                            label={t('USER.DRIVING_LICENCE_CATEGORIES')}
                                            data-testid='driving-licence-categories'
                                            disabled={inputDisabled}
                                            required
                                            value={values.drivingLicenceCategories ?? ''}
                                            onChange={handleChange('drivingLicenceCategories')}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <ClearIcon
                                                            sx={{color: '#000000', cursor: 'pointer'}}
                                                            onClick={() => setValues({...values, drivingLicenceCategories: '' })}
                                                        />
                                                    </InputAdornment>
                                                )
                                            }}
                                            sx={{
                                                backgroundColor: `#ffffff`,
                                                borderRadius: '8px',
                                                color: `#000000`,
                                                textDecoration: 'none',
                                                height: 40,
                                                width: 250,
                                                display: 'flex',
                                                justifyContent: 'center',
                                                fontSize: "15px",
                                                "& fieldset": {border: 'none'},
                                            }}
                                        >
                                            {/*Object.values(drivingLicenceList).map((drivingLicence) => (
                                                <MenuItem key={drivingLicence} value={drivingLicence}>
                                                    {drivingLicence}
                                                </MenuItem>
                                            ))*/}
                                        </Select>
                                    </FormControl>
                                </Box>
                            )}
                        </Grid>
                        <Grid item xs={5} md={5}>
                            <Box sx={{display: 'inline', paddingLeft: 120}}>
                                <Box sx={{
                                    display: 'flex',
                                    justifyContent: 'flex-start',
                                    alignItems: 'flex-start',
                                    minWidth: 120
                                }}>
                                    <NormalText text={'Kiadás'}/>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={5} md={5}>
                            {isEditing ? (
                                <Box sx={{display: 'inline', paddingLeft: 120}}>
                                    <Box sx={{
                                        display: 'flex',
                                        justifyContent: 'flex-start',
                                        alignItems: 'flex-start',
                                        minWidth: 120
                                    }}>
                                        <NormalText text={'700 euró'}/>
                                    </Box>
                                </Box>
                            ) : (
                                <Box sx={{
                                    display: 'inline',
                                    minWidth: 120
                                }}>
                                    <FormControl>
                                        <InputLabel>{t('USER.DRIVING_LICENCE_CATEGORIES')}</InputLabel>
                                        <Select //TODO: multiselect
                                            id="drivingLicenceCategories"
                                            placeholder={t('USER.DRIVING_LICENCE_CATEGORIES')}
                                            name='drivingLicenceCategories'
                                            label={t('USER.DRIVING_LICENCE_CATEGORIES')}
                                            data-testid='driving-licence-categories'
                                            disabled={inputDisabled}
                                            required
                                            value={values.drivingLicenceCategories ?? ''}
                                            onChange={handleChange('drivingLicenceCategories')}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <ClearIcon
                                                            sx={{color: '#000000', cursor: 'pointer'}}
                                                            onClick={() => setValues({...values, drivingLicenceCategories: '' })}
                                                        />
                                                    </InputAdornment>
                                                )
                                            }}
                                            sx={{
                                                backgroundColor: `#ffffff`,
                                                borderRadius: '8px',
                                                color: `#000000`,
                                                textDecoration: 'none',
                                                height: 40,
                                                width: 250,
                                                display: 'flex',
                                                justifyContent: 'center',
                                                fontSize: "15px",
                                                "& fieldset": {border: 'none'},
                                            }}
                                        >
                                            {/*Object.values(drivingLicenceList).map((drivingLicence) => (
                                                <MenuItem key={drivingLicence} value={drivingLicence}>
                                                    {drivingLicence}
                                                </MenuItem>
                                            ))*/}
                                        </Select>
                                    </FormControl>
                                </Box>
                            )}
                        </Grid>
                    </Grid>
                </Grid>
            </form>
        </Box>
);
};

export default OrderTabDetails;