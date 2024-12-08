import {
    Box,
    FormControl,
    Grid, InputAdornment,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    SxProps,
    Theme,
    Typography
} from "@mui/material";
import NormalText from "../../components/text/NormalText";
import {useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
import React, {useState} from "react";
import NewExamButton from "../../components/button/NewExamButton";
import ClearIcon from "@mui/icons-material/Clear";

interface Props {
    isEditing?: boolean;
    isInputDisabled?: boolean;
}

const paramTextStyle: SxProps<Theme> = {
    fontWeight: 'normal',
    fontSize: '18px',
    color: '#A3A3A3',
}

const OrderTabDocuments = ({ isEditing = false, isInputDisabled }: Props) => {
    const { id } = useParams();
    const [t, i18n] = useTranslation();
    const [inputDisabled, setInputDisabled] = useState(isInputDisabled);
    const [values, setValues] = useState({
        fuvarlevel: '2024_01_30_Vik_kft_fuvarlevél.docsx',
        fuvarlevelSelectedTimestamp: '2024.01.28 15:30',
        fuvarlevelStatus: 'missing',
        szallitolevel: '',
        szallitolevelSelectedTimestamp: '-',
        szallitolevelStatus: 'missing',
        invoice: '2024_01_30_Vik_kft_számla.docsx',
        invoiceSelectedTimestamp: '2024.01.28 15:30',
        invoiceStatus: 'missing',
        menetlevel: '2024_01_30_Vik_kft_menetlevél.docsx',
        menetlevelSelectedTimestamp: '2024.01.28 15:30',
        menetlevelStatus: 'missing',
    });
    const [documentList, setDocumentList] = useState([]);

    const handleChange = (prop: any) => (event: any) => {
        setValues({...values, [prop]: event.target.value });
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        let submitData = data as any;
    }

    const options = [
        {
            value: "missing",
            label: "Hiányzik",
            style: {
                fontWeight: 'normal',
                fontSize: '18px',
                color: '#ffffff',
                backgroundColor: '#ff0000',
                borderRadius: 45,
                width: 120,
                textAlign: 'center',
                paddingTop: 1,
                paddingBottom: 1,
            },
        },
        {
            value: "uploaded",
            label: "Feltöltve",
            style: {
                fontWeight: 'normal',
                fontSize: '18px',
                color: '#ffffff',
                backgroundColor: '#23ef00',
                borderRadius: 45,
                width: 120,
                textAlign: 'center',
                paddingTop: 1,
                paddingBottom: 1,
            },
        },
        {
            value: "in_generation",
            label: "Generálódik",
            style: {
                fontWeight: 'normal',
                fontSize: '18px',
                color: '#ffffff',
                backgroundColor: '#00d7e4',
                borderRadius: 45,
                width: 120,
                textAlign: 'center',
                paddingTop: 1,
                paddingBottom: 1,
            },
        },
    ];

    return (
        <Box>
            <form
                autoComplete='off'
                onSubmit={(e) => handleSubmit(e)}
            >
                <Grid item container direction="column" spacing={2}>
                    <Grid item container direction="row" xs={4} md={8} spacing={6} columns={20}>
                        <Grid item xs={4} md={4}>
                            <Box sx={{display: 'inline', paddingLeft: 120}}>
                                <Box sx={{
                                    display: 'flex',
                                    justifyContent: 'flex-start',
                                    alignItems: 'flex-start',
                                    minWidth: 120
                                }}>
                                    <Typography sx={paramTextStyle}>{'Fuvarlevél'}</Typography>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={4} md={4}>
                            <Box sx={{display: 'inline', paddingLeft: 120}}>
                                <Box sx={{
                                    display: 'flex',
                                    justifyContent: 'flex-start',
                                    alignItems: 'flex-start',
                                    minWidth: 120
                                }}>
                                    <NormalText text={values.fuvarlevel}/>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={4} md={4}>
                            <Box sx={{display: 'inline', paddingLeft: 120}}>
                                <Box sx={{
                                    display: 'flex',
                                    justifyContent: 'flex-start',
                                    alignItems: 'flex-start',
                                    minWidth: 120
                                }}>
                                    <NormalText text={values.fuvarlevelSelectedTimestamp}/>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={4} md={4}>
                            <Box sx={{display: 'inline', paddingLeft: 120}}>
                                <Box sx={{
                                    display: 'flex',
                                    justifyContent: 'flex-start',
                                    alignItems: 'flex-start',
                                    minWidth: 120
                                }}>
                                    <FormControl sx={{ width: '100%' }}>
                                        <InputLabel>{t('')}</InputLabel>
                                        <Select
                                            label={null}
                                            id="demo-simple-select"
                                            data-testid='select-language-input'
                                            value={values.fuvarlevelStatus}
                                            onChange={handleChange('fuvarlevelStatus')}
                                            sx={{
                                                backgroundColor: '#ffffff',
                                                borderRadius: 45,
                                                color: '#000000',
                                                height: 40,
                                                width: 150,
                                                fontSize: '18px',
                                                padding: 0,
                                                paddingTop: 1,
                                                paddingBottom: 1,
                                                fontWeight: 'normal',
                                                '&:hover': {
                                                    backgroundColor: '#ececec',
                                                },
                                                '& fieldset': { border: 'none' },
                                                '& .MuiSelect-icon': { display: 'none' },
                                            }}
                                            renderValue={(value) => {
                                                const selectedOption = options.find(option => option.value === value);
                                                return selectedOption ? (
                                                    <Box sx={selectedOption.style}>{selectedOption.label}</Box>
                                                ) : null;
                                            }}
                                        >
                                            {options.map((option) => (
                                                <MenuItem
                                                    key={option.value}
                                                    value={option.value}
                                                    sx={{
                                                        padding: 0,
                                                        marginBottom: 1,
                                                        border: 'none',
                                                        height: 40,
                                                        width: 120,
                                                        fontSize: '15px',
                                                        backgroundColor: option.style.backgroundColor,
                                                        color: option.style.color,
                                                        borderRadius: 45,
                                                        paddingTop: 1,
                                                        paddingBottom: 1,
                                                        fontWeight: 'normal',
                                                        '&:hover': {
                                                            backgroundColor: `${option.style.backgroundColor}b3`,
                                                            padding: 0,
                                                            width: 120,
                                                            textAlign: 'center',
                                                            paddingTop: 1,
                                                            paddingBottom: 1,
                                                            fontWeight: 'normal',
                                                            fontSize: '18px',
                                                        },
                                                        '&.Mui-selected': {
                                                            backgroundColor: `${option.style.backgroundColor}b3`,
                                                        },
                                                    }}
                                                >
                                                    <Box sx={option.style}>{option.label}</Box>
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                    <Grid item container direction="row" xs={4} md={8} spacing={6} columns={20}>
                        <Grid item xs={4} md={4}>
                            <Box sx={{display: 'inline', paddingLeft: 120}}>
                                <Box sx={{
                                    display: 'flex',
                                    justifyContent: 'flex-start',
                                    alignItems: 'flex-start',
                                    minWidth: 120
                                }}>
                                    <Typography sx={paramTextStyle}>{'Szállítólevél'}</Typography>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={4} md={4}>
                            {!isEditing ? (
                                <Box sx={{display: 'inline', paddingLeft: 120}}>
                                    {
                                        (values.szallitolevel ? (
                                            <Box sx={{
                                                display: 'flex',
                                                justifyContent: 'flex-start',
                                                alignItems: 'flex-start',
                                                minWidth: 120
                                            }}>
                                                <NormalText text={values.szallitolevel}/>
                                            </Box>
                                        ) : (
                                            <Box sx={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'flex-start',
                                                minWidth: 120,
                                                borderStyle: 'dashed',
                                                borderWidth: 1,
                                                borderRadius: 20,
                                                borderColor: '#606060'
                                            }}>
                                                <NormalText text={'feltöltésre vár'}/>
                                            </Box>
                                        ))
                                    }
                                </Box>
                            ) : (
                                <Box sx={{display: 'inline', paddingLeft: 120}}>
                                    <FormControl>
                                        <InputLabel>{t('ORDER.SZALLITOLEVEL')}</InputLabel>
                                        <Select
                                            id="szallitolevel"
                                            placeholder={t('ORDER.SZALLITOLEVEL')}
                                            name='szallitolevel'
                                            label={t('ORDER.SZALLITOLEVEL')}
                                            data-testid='szallitolevel'
                                            disabled={inputDisabled}
                                            required
                                            value={values.szallitolevel}
                                            onChange={handleChange('szallitolevel')}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <ClearIcon
                                                            sx={{color: '#000000', cursor: 'pointer'}}
                                                            onClick={() => setValues({...values, szallitolevel: '' })}
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
                                            {Object.values(documentList).map((document) => (
                                                <MenuItem key={document} value={document}>
                                                    {document}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Box>
                            )}
                        </Grid>
                        <Grid item xs={4} md={4}>
                            <Box sx={{display: 'inline', paddingLeft: 120}}>
                                <Box sx={{
                                    display: 'flex',
                                    justifyContent: 'flex-start',
                                    alignItems: 'flex-start',
                                    minWidth: 120
                                }}>
                                    <NormalText text={values.szallitolevelSelectedTimestamp}/>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={4} md={4}>
                            <Box sx={{display: 'inline', paddingLeft: 120}}>
                                <Box sx={{
                                    display: 'flex',
                                    justifyContent: 'flex-start',
                                    alignItems: 'flex-start',
                                    minWidth: 120
                                }}>
                                    <FormControl sx={{ width: '100%' }}>
                                        <InputLabel>{t('')}</InputLabel>
                                        <Select
                                            label={null}
                                            id="szallitolevelStatus"
                                            data-testid='szallitolevel-status-input'
                                            value={values.szallitolevelStatus}
                                            onChange={handleChange('szallitolevelStatus')}
                                            sx={{
                                                backgroundColor: '#ffffff',
                                                borderRadius: 45,
                                                color: '#000000',
                                                height: 40,
                                                width: 150,
                                                fontSize: '18px',
                                                padding: 0,
                                                paddingTop: 1,
                                                paddingBottom: 1,
                                                fontWeight: 'normal',
                                                '&:hover': {
                                                    backgroundColor: '#ececec',
                                                },
                                                '& fieldset': { border: 'none' },
                                                '& .MuiSelect-icon': { display: 'none' },
                                            }}
                                            renderValue={(value) => {
                                                const selectedOption = options.find(option => option.value === value);
                                                return selectedOption ? (
                                                    <Box sx={selectedOption.style}>{selectedOption.label}</Box>
                                                ) : null;
                                            }}
                                        >
                                            {options.map((option) => (
                                                <MenuItem
                                                    key={option.value}
                                                    value={option.value}
                                                    sx={{
                                                        padding: 0,
                                                        marginBottom: 1,
                                                        border: 'none',
                                                        height: 40,
                                                        width: 120,
                                                        fontSize: '15px',
                                                        backgroundColor: option.style.backgroundColor,
                                                        color: option.style.color,
                                                        borderRadius: 45,
                                                        paddingTop: 1,
                                                        paddingBottom: 1,
                                                        fontWeight: 'normal',
                                                        '&:hover': {
                                                            backgroundColor: `${option.style.backgroundColor}b3`,
                                                            padding: 0,
                                                            width: 120,
                                                            textAlign: 'center',
                                                            paddingTop: 1,
                                                            paddingBottom: 1,
                                                            fontWeight: 'normal',
                                                            fontSize: '18px',
                                                        },
                                                        '&.Mui-selected': {
                                                            backgroundColor: `${option.style.backgroundColor}b3`,
                                                        },
                                                    }}
                                                >
                                                    <Box sx={option.style}>{option.label}</Box>
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                    <Grid item container direction="row" xs={4} md={8} spacing={6} columns={20}>
                        <Grid item xs={4} md={4}>
                            <Box sx={{display: 'inline', paddingLeft: 120}}>
                                <Box sx={{
                                    display: 'flex',
                                    justifyContent: 'flex-start',
                                    alignItems: 'flex-start',
                                    minWidth: 120
                                }}>
                                    <Typography sx={paramTextStyle}>{'Számla'}</Typography>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={4} md={4}>
                            <Box sx={{display: 'inline', paddingLeft: 120}}>
                                <Box sx={{
                                    display: 'flex',
                                    justifyContent: 'flex-start',
                                    alignItems: 'flex-start',
                                    minWidth: 120
                                }}>
                                    <NormalText text={values.invoice}/>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={4} md={4}>
                            <Box sx={{display: 'inline', paddingLeft: 120}}>
                                <Box sx={{
                                    display: 'flex',
                                    justifyContent: 'flex-start',
                                    alignItems: 'flex-start',
                                    minWidth: 120
                                }}>
                                    <NormalText text={values.invoiceSelectedTimestamp}/>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={4} md={4}>
                            <Box sx={{display: 'inline', paddingLeft: 120}}>
                                <Box sx={{
                                    display: 'flex',
                                    justifyContent: 'flex-start',
                                    alignItems: 'flex-start',
                                    minWidth: 120
                                }}>
                                    <FormControl sx={{ width: '100%' }}>
                                        <InputLabel>{t('')}</InputLabel>
                                        <Select
                                            label={null}
                                            id="invoice-status"
                                            data-testid='invoice-status-input'
                                            value={values.invoiceStatus}
                                            onChange={handleChange('invoiceStatus')}
                                            sx={{
                                                backgroundColor: '#ffffff',
                                                borderRadius: 45,
                                                color: '#000000',
                                                height: 40,
                                                width: 150,
                                                fontSize: '18px',
                                                padding: 0,
                                                paddingTop: 1,
                                                paddingBottom: 1,
                                                fontWeight: 'normal',
                                                '&:hover': {
                                                    backgroundColor: '#ececec',
                                                },
                                                '& fieldset': { border: 'none' },
                                                '& .MuiSelect-icon': { display: 'none' },
                                            }}
                                            renderValue={(value) => {
                                                const selectedOption = options.find(option => option.value === value);
                                                return selectedOption ? (
                                                    <Box sx={selectedOption.style}>{selectedOption.label}</Box>
                                                ) : null;
                                            }}
                                        >
                                            {options.map((option) => (
                                                <MenuItem
                                                    key={option.value}
                                                    value={option.value}
                                                    sx={{
                                                        padding: 0,
                                                        marginBottom: 1,
                                                        border: 'none',
                                                        height: 40,
                                                        width: 120,
                                                        fontSize: '15px',
                                                        backgroundColor: option.style.backgroundColor,
                                                        color: option.style.color,
                                                        borderRadius: 45,
                                                        paddingTop: 1,
                                                        paddingBottom: 1,
                                                        fontWeight: 'normal',
                                                        '&:hover': {
                                                            backgroundColor: `${option.style.backgroundColor}b3`,
                                                            padding: 0,
                                                            width: 120,
                                                            textAlign: 'center',
                                                            paddingTop: 1,
                                                            paddingBottom: 1,
                                                            fontWeight: 'normal',
                                                            fontSize: '18px',
                                                        },
                                                        '&.Mui-selected': {
                                                            backgroundColor: `${option.style.backgroundColor}b3`,
                                                        },
                                                    }}
                                                >
                                                    <Box sx={option.style}>{option.label}</Box>
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                    <Grid item container direction="row" xs={4} md={8} spacing={6} columns={20}>
                        <Grid item xs={4} md={4}>
                            <Box sx={{display: 'inline', paddingLeft: 120}}>
                                <Box sx={{
                                    display: 'flex',
                                    justifyContent: 'flex-start',
                                    alignItems: 'flex-start',
                                    minWidth: 120
                                }}>
                                    <Typography sx={paramTextStyle}>{'Menetlevél'}</Typography>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={4} md={4}>
                            <Box sx={{display: 'inline', paddingLeft: 120}}>
                                <Box sx={{
                                    display: 'flex',
                                    justifyContent: 'flex-start',
                                    alignItems: 'flex-start',
                                    minWidth: 120
                                }}>
                                    <NormalText text={values.menetlevel}/>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={4} md={4}>
                            <Box sx={{display: 'inline', paddingLeft: 120}}>
                                <Box sx={{
                                    display: 'flex',
                                    justifyContent: 'flex-start',
                                    alignItems: 'flex-start',
                                    minWidth: 120
                                }}>
                                    <NormalText text={values.menetlevelSelectedTimestamp}/>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={4} md={4}>
                            <Box sx={{display: 'inline', paddingLeft: 120}}>
                                <Box sx={{
                                    display: 'flex',
                                    justifyContent: 'flex-start',
                                    alignItems: 'flex-start',
                                    minWidth: 120
                                }}>
                                    <FormControl sx={{ width: '100%' }}>
                                        <InputLabel>{t('')}</InputLabel>
                                        <Select
                                            label={null}
                                            id="menetlevel-status"
                                            data-testid='menetlevel-status-input'
                                            value={values.menetlevelStatus}
                                            onChange={handleChange('menetlevelStatus')}
                                            sx={{
                                                backgroundColor: '#ffffff',
                                                borderRadius: 45,
                                                color: '#000000',
                                                height: 40,
                                                width: 150,
                                                fontSize: '18px',
                                                padding: 0,
                                                paddingTop: 1,
                                                paddingBottom: 1,
                                                fontWeight: 'normal',
                                                '&:hover': {
                                                    backgroundColor: '#ececec',
                                                },
                                                '& fieldset': { border: 'none' },
                                                '& .MuiSelect-icon': { display: 'none' },
                                            }}
                                            renderValue={(value) => {
                                                const selectedOption = options.find(option => option.value === value);
                                                return selectedOption ? (
                                                    <Box sx={selectedOption.style}>{selectedOption.label}</Box>
                                                ) : null;
                                            }}
                                        >
                                            {options.map((option) => (
                                                <MenuItem
                                                    key={option.value}
                                                    value={option.value}
                                                    sx={{
                                                        padding: 0,
                                                        marginBottom: 1,
                                                        border: 'none',
                                                        height: 40,
                                                        width: 120,
                                                        fontSize: '15px',
                                                        backgroundColor: option.style.backgroundColor,
                                                        color: option.style.color,
                                                        borderRadius: 45,
                                                        paddingTop: 1,
                                                        paddingBottom: 1,
                                                        fontWeight: 'normal',
                                                        '&:hover': {
                                                            backgroundColor: `${option.style.backgroundColor}b3`,
                                                            padding: 0,
                                                            width: 120,
                                                            textAlign: 'center',
                                                            paddingTop: 1,
                                                            paddingBottom: 1,
                                                            fontWeight: 'normal',
                                                            fontSize: '18px',
                                                        },
                                                        '&.Mui-selected': {
                                                            backgroundColor: `${option.style.backgroundColor}b3`,
                                                        },
                                                    }}
                                                >
                                                    <Box sx={option.style}>{option.label}</Box>
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
};

export default OrderTabDocuments;