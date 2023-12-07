import NiceModal, { muiDialogV5, useModal } from '@ebay/nice-modal-react';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle, Grid,
    IconButton,
    InputAdornment
} from '@mui/material';
import type {SxProps, Theme} from '@mui/material';
import type { GridSelectionModel } from '@mui/x-data-grid';
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import BackgroundCard from "../../components/layout/BackgroundCard.tsx";
import { useTypeSafeTranslation } from '../../components/inputField/hooks/useTypeSafeTranslation.tsx';
import TextFieldInput from '../../components/inputField/TextFieldInput.tsx';
import NormalText from '../../components/text/NormalText.tsx';
import {CarTypeEditFormSchema, carTypeEditFormSchema} from '../car-type/schemas/car-type-edit-form-schema.ts';

const titleStyle: SxProps<Theme> = {
    fontWeight: 'bold',
    fontSize: '22px',
    lineHeight: '20px',
    color: '#000000',
    marginTop: '60px',
    marginBottom: '30px',
    marginLeft: '10px',
    marginRight: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
}

const saveTitleStyle: SxProps<Theme> = {
    fontWeight: 'regular',
    fontSize: '14px',
    color: '#ffffff',
    backgroundColor: '#DD1C13',
    borderRadius: '13px',
    marginLeft: '20px',
    marginRight: '20px',
    marginTop: '20px',
    marginBottom: '20px',
    paddingTop: '8px',
    paddingBottom: '8px',
    paddingLeft: '30px',
    paddingRight: '30px',
    textTransform: 'none',
}

const cancelTitleStyle: SxProps<Theme> = {
    fontWeight: 'regular',
    fontSize: '14px',
    color: '#DD1C13',
    backgroundColor: 'rgba(41, 0, 92, 0.12)',
    borderRadius: '13px',
    marginLeft: '20px',
    marginRight: '20px',
    marginTop: '20px',
    marginBottom: '20px',
    paddingTop: '8px',
    paddingBottom: '8px',
    paddingLeft: '30px',
    paddingRight: '30px',
    textTransform: 'none',
}

const ProductCategoryAddDialog = NiceModal.create(
    (props: { title: string; acceptText: string; defaultSelected: GridSelectionModel; handleEmployeeAdded: () => void }) => {
        const modal = useModal();
        const { t } = useTypeSafeTranslation();
        const { id } = useParams();
        const navigate = useNavigate();
        //const auth = useAuthentication();

        const [projects, setProjects] = useState([]);

        const [employees, setEmployees] = useState([]);

        const {
            control,
            setValue,
            reset,
            handleSubmit,
            formState: { isValid },
        } = useForm<CarTypeEditFormSchema>({
            defaultValues: {
                carTypeName: '',
                carFunctionalDesign: '',
                performance: '',
                ownWeight: '',
                numberOfSeats: '',
                fuel: '',
                usefulWeight: '',
            },
            resolver: zodResolver(carTypeEditFormSchema()),
            mode: 'all',
        });

        const createCarType = (data) => {
            //TODO
            navigate(`/users/${parseInt(data, 10)}`);
        };

        const updateCarType = (id, data) => {
            //TODO
        };

        useEffect(() => {
            if (id) {
                //TODO: get user
            }
        }, [id, reset]);

        const onSubmit = handleSubmit((data) => {
            let submitData = data as any;
        });

        return (
            <Dialog
                {...muiDialogV5(modal)}
                aria-labelledby="confirm-dialog-title"
                aria-describedby="confirm-dialog-description"
                sx={{
                    "& .MuiDialog-container": {
                        "& .MuiPaper-root": {
                            width: "100%",
                            maxWidth: "500px",
                            borderRadius: '19px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        },
                    },
                }}
            >
                <DialogTitle id="confirm-dialog-title" sx={titleStyle}>
                    {props.title}
                </DialogTitle>

                <DialogContent>
                    <Box>
                        <BackgroundCard>
                            <Grid item container direction="column" spacing={2}>
                                <Grid item container direction="row" xs={4} md={10} spacing={15}>
                                    <Grid item xs={4} md={5}>
                                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                            <TextFieldInput
                                                label={t('TEXT.PRODUCT_CATEGORY_NAME')}
                                                control={control}
                                                name='productCategoryName'
                                                type='text'
                                                data-testid='product-category-name-input'
                                                required
                                            />
                                        </Box>
                                    </Grid>
                                </Grid>
                                <Grid item container direction="row" xs={4} md={10} spacing={15}>
                                    <Grid item xs={4} md={5}>
                                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                            <TextFieldInput
                                                label={t('TEXT.PRODUCT_DESCRIPTION')}
                                                control={control}
                                                name='productDescription'
                                                type='text'
                                                data-testid='product-description-input'
                                                required
                                            />
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </BackgroundCard>
                    </Box>
                </DialogContent>

                <DialogActions>
                    <Button
                        color="error"
                        onClick={() => {
                            modal.reject();
                            modal.remove();
                        }}
                        data-testid="cancel-button"
                        sx={cancelTitleStyle}
                    >
                        {t('TEXT.CANCEL')}
                    </Button>
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={() => {
                            onSubmit();
                            modal.remove();
                        }}
                        data-testid="confirm-button"
                        sx={saveTitleStyle}
                    >
                        {props.acceptText}
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
);

export default ProductCategoryAddDialog;
