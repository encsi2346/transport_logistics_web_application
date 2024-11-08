import {Box, Fab, FormControl, Input, InputAdornment, TextField} from "@mui/material";
import PageHeader from "../../components/text/PageHeader";
import FilterCard from "../../components/layout/FilterCard";
import ContentCard from "../../components/layout/ContentCard";
import {useTypeSafeTranslation} from "../../components/inputField/hooks/useTypeSafeTranslation";
import {useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import useSelection from "../../components/inputField/hooks/useSelection";
import SaveButton from "../../components/button/SaveButton";
import DocumentTableQuery from "./DocumentTableQuery";
import {useForm} from "react-hook-form";
import {carTypeEditFormSchema, CarTypeEditFormSchema} from "@/pages/car-types/schemas/car-type-edit-form-schema";
import {zodResolver} from "@hookform/resolvers/zod";
import {DocumentEditFormSchema, documentEditFormSchema} from "@/pages/documents/schemas/document-edit-form-schema";
import AddIcon from "@mui/icons-material/Add";
import {useModal} from "@ebay/nice-modal-react";
import NewRequestAddDialog from "../requests/NewRequestAddDialog";
import NewDocumentAddDialog from "./NewDocumentAddDialog";

const DocumentList = () => {
    const { t } = useTypeSafeTranslation();
    const navigate = useNavigate();
    const addNewDocumentDialog = useModal(NewDocumentAddDialog);
    const [search, setSearch] = useState('');
    const [values, setValues] = useState({
        name: '',
        documentType: ''
    });
    const [filtersReset, setFiltersReset] = useState(false);
    const [documents, setDocuments] = useState([
        {
            id: '#15263',
            documentType: 'Fuvarlevél',
            documentName: '2024_01_30_Vik_kft_fuvarlevél.docx',
            createdBy: 'Admin Anita',
            dateOfCreation: '2024.01.28',
            size: '112 kB',
        },
        {
            id: '#15264',
            documentType: 'Menetlevél',
            documentName: '2024_01_30_Vik_kft_menetlevél.docx',
            createdBy: 'Admin Anita',
            dateOfCreation: '2024.01.28',
            size: '112 kB',
        },
        {
            id: '#15265',
            documentType: 'Számla',
            documentName: '2024_01_30_Vik_kft_számla.docx',
            createdBy: 'Admin Anita',
            dateOfCreation: '2024.01.28',
            size: '112 kB',
        },
        {
            id: '#15266',
            documentType: 'Jogosítvány',
            documentName: 'Példa_Elek_Jogosítvány_másolat.docx',
            createdBy: 'Admin Anita',
            dateOfCreation: '2024.01.28',
            size: '112 kB',
        },
        {
            id: '#15267',
            documentType: 'Fuvarlevél',
            documentName: '2024_01_30_Vik_kft_fuvarlevél.docx',
            createdBy: 'Admin Anita',
            dateOfCreation: '2024.01.28',
            size: '112 kB',
        },
    ]);

    const [documentTypeList, setDocumentTypeList] = useState([]);
    const [documentStatusList, setDocumentStatusList] = useState([]);

    const handleDocumentTypeList = async () => {
        const getResponse = await fetch(
            "http://localhost:3001/api/documentTypes",
            {
                method: "GET",
                headers: { "Content-Type": "application/json"},
            }
        );
        const getDocumentTypeList = await getResponse.json();
        //const getStatus = getResponse.status;
        console.log('DocumentTypes', getDocumentTypeList);

        const formattedDocumentTypeList = getDocumentTypeList.map(documentType => ({
            value: documentType,
            label: documentType.charAt(0).toUpperCase() + documentType.slice(1)
        }));
        console.log('formattedDocumentTypeList', formattedDocumentTypeList);
        setDocumentTypeList(formattedDocumentTypeList);
    }

    useEffect(() => {
        handleDocumentTypeList();
    }, [])

    const handleDocumentStatusList = async () => {
        const getResponse = await fetch(
            "http://localhost:3001/api/documentStatus",
            {
                method: "GET",
                headers: { "Content-Type": "application/json"},
            }
        );
        const getDocumentStatusList = await getResponse.json();
        //const getStatus = getResponse.status;
        console.log('DocumentStatuses', getDocumentStatusList);

        const formattedDocumentStatusList = getDocumentStatusList.map(documentStatus => ({
            value: documentStatus,
            label: documentStatus.charAt(0).toUpperCase() + documentStatus.slice(1)
        }));
        console.log('formattedDocumentStatusList', formattedDocumentStatusList);
        setDocumentStatusList(formattedDocumentStatusList);
    }

    useEffect(() => {
        handleDocumentStatusList();
    }, [])

    const getDocuments = async () => {
        try {
            const getDocumentsResponse = await fetch(
                `http://localhost:3001/api/documents`,
                {
                    method: "GET",
                    headers: { "Content-Type": "application/json"},
                }
            );
            const getDocumentsData = await getDocumentsResponse.json();
            const getStatus = getDocumentsResponse.status;
            console.log('getDocumentsData', getDocumentsData);
            console.log('getUserStatus', getStatus);
            //setDocuments(getDocumentsData);
        } catch (error) {
            console.error('Error get all document:', error);
        }
    }

    const createDocument = async (data: any) => {
        try {
            const createDocumentResponse = await fetch(
                `http://localhost:3001/api/documents/addDocument`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json"},
                    body: JSON.stringify(data),
                }
            );
            const getDocumentData = await createDocumentResponse.json();
            const getStatus = createDocumentResponse.status;
            console.log('getDocumentData', getDocumentData);
            console.log('getUserStatus', getStatus);
            //setCar(getCarData);
            return getDocumentData;
        } catch (error) {
            console.error('Error creating document:', error);
        }
    };

    const updateDocument = async (id: string, data: any) => {
        try {
            const updatedDocumentResponse = await fetch(
                `http://localhost:3001/api/documents/${id}`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json"},
                    body: JSON.stringify(data),
                }
            );
            const getDocumentData = await updatedDocumentResponse.json();
            const getStatus = updatedDocumentResponse.status;
            console.log('getDocumentData', getDocumentData);
            console.log('getUserStatus', getStatus);
            //setCar(getCarData);
            return getDocumentData;
        } catch (error) {
            console.error(`Error updating document with ID ${id}:`, error);
        }
    };

    const deleteDocument = async (id: string) => {
        //TODO
        try {
            const deleteDocumentResponse = await fetch(
                `http://localhost:3001/api/documents/${id}`,
                {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json"},
                }
            );
            const getDocumentData = await deleteDocumentResponse.json();
            const getStatus = deleteDocumentResponse.status;
            console.log('getDocumentData', getDocumentData);
            console.log('getUserStatus', getStatus);
            //setCartTypes(getCarTypesData);
            return getDocumentData;
        } catch (error) {
            console.error(`Error deleting document with ID ${id}:`, error);
        }
    };

    const openAddNewDocumentDialog = () => {
        addNewDocumentDialog
            .show({
                title: t('DOCUMENTS.ADD_NEW_DOCUMENT'),
                acceptText: t('DOCUMENT.CREATE'),
            })
            .then((value) => {
                setValue('documents', value as string[]);
            })
            .catch(() => null);
    };

    useEffect(() => {
        getDocuments();
    }, []);

    const handleChange = (prop: any) => (event: any) => {
        setValues({...values, [prop]: event.target.value });
    };

    const onReset = () => {
        setValues({
            name: '',
            documentType: ''
        });
        setFiltersReset(true);
        setDocuments([]);
    };

    const submitData = async () => {
        try {
            setFiltersReset(false);
            const getResponse = await fetch(
                `http://localhost:3001/api/product-categories/search?name=${values.name}&documentType=${values.documentType}`,
                {
                    method: "GET",
                    headers: { "Content-Type": "application/json"},
                }
            );
            const searchCategoriesQuery = await getResponse.json();
            setDocuments(searchCategoriesQuery.content || []);
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <Box>
            <PageHeader text={t('DOCUMENTS.DOCUMENTS')}/>
            <FilterCard>
                <form
                    autoComplete='off'
                    onSubmit={
                        async (e) => {
                            e.preventDefault();
                            submitData();
                        }}
                >
                    <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'space-between'}}>
                        <Box sx={{
                            marginTop: 1,
                            marginBottom: 5,
                            marginLeft: 2,
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 4
                        }}>
                            <FormControl>
                                <TextField
                                    id="name"
                                    placeholder='Példa Éva'
                                    name='name'
                                    label={t('DOCUMENTS.DOCUMENT_NAME')}
                                    value={values.name}
                                    onChange={handleChange('name')}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <SearchIcon sx={{color: '#000000'}}/>
                                            </InputAdornment>
                                        ),
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <ClearIcon
                                                    sx={{color: '#000000', cursor: 'pointer'}}
                                                    onClick={() => setValues({...values, name: ''})}
                                                />
                                            </InputAdornment>
                                        )
                                    }}
                                    sx={{
                                        backgroundColor: `#ffffff`,
                                        borderRadius: '18px',
                                        color: `#000000`,
                                        textDecoration: 'none',
                                        height: 40,
                                        width: 250,
                                        display: 'flex',
                                        justifyContent: 'center',
                                        fontSize: "15px",
                                        "& fieldset": {border: 'none'},
                                    }}
                                />
                            </FormControl>
                            <FormControl>
                                <TextField
                                    id="documentType"
                                    placeholder='Példa Éva'
                                    name='documentType'
                                    label={t('DOCUMENTS.DOCUMENT_TYPE')}
                                    value={values.documentType}
                                    onChange={handleChange('documentType')}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <SearchIcon sx={{color: '#000000'}}/>
                                            </InputAdornment>
                                        ),
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <ClearIcon
                                                    sx={{color: '#000000', cursor: 'pointer'}}
                                                    onClick={() => setValues({...values, documentType: ''})}
                                                />
                                            </InputAdornment>
                                        )
                                    }}
                                    sx={{
                                        backgroundColor: `#ffffff`,
                                        borderRadius: '18px',
                                        color: `#000000`,
                                        textDecoration: 'none',
                                        height: 40,
                                        width: 250,
                                        display: 'flex',
                                        justifyContent: 'center',
                                        fontSize: "15px",
                                        "& fieldset": {border: 'none'},
                                    }}
                                />
                            </FormControl>
                            <div style={{display: 'flex', alignItems: 'center'}}>
                                <SaveButton onClick={onReset} text={t('TEXT.CLEAR_FILTER')}/>
                                <SaveButton type='submit' text={t('TEXT.FILTER')}/>
                            </div>
                        </Box>
                    </Box>
                </form>
            </FilterCard>

            <ContentCard>
            <Box sx={{display: 'flex', marginTop: 2, marginBottom: 10, height: 900}}>
                    <DocumentTableQuery
                        searchResults={
                            documents
                                .filter((item) => {
                                    return search.toLowerCase() === ''
                                        ? item
                                        : item.documentName.toLowerCase().includes(search);
                                })
                        }
                    />
                <Fab aria-label="add"
                     onClick={openAddNewDocumentDialog}
                     sx={{
                         margin: 0,
                         top: 'auto',
                         right: '40px',
                         bottom: '40px',
                         left: 'auto',
                         position: 'fixed',
                         width: '70px',
                         height: '70px',
                         backgroundColor: '#a40500',
                         color: '#ffffff'
                     }}
                >
                    <AddIcon sx={{ width: '40px', height: '40px'}}/>
                </Fab>
                </Box>
            </ContentCard>
        </Box>
    );
};

export default DocumentList;