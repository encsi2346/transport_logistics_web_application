import {Box, FormControl, Input, InputAdornment} from "@mui/material";
import PageHeader from "../../components/text/PageHeader";
import FilterCard from "../../components/layout/FilterCard";
import ContentCard from "../../components/layout/ContentCard";
import {useTypeSafeTranslation} from "../../components/inputField/hooks/useTypeSafeTranslation";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import useSelection from "../../components/inputField/hooks/useSelection";
import SaveButton from "../../components/button/SaveButton";
import DocumentTableQuery from "./DocumentTableQuery";
import {useForm} from "react-hook-form";
import {carTypeEditFormSchema, CarTypeEditFormSchema} from "@/pages/car-types/schemas/car-type-edit-form-schema";
import {zodResolver} from "@hookform/resolvers/zod";
import {DocumentEditFormSchema, documentEditFormSchema} from "@/pages/documents/schemas/document-edit-form-schema";

const DocumentList = () => {
    const { t } = useTypeSafeTranslation();
    const navigate = useNavigate();
    const [search, setSearch] = useState('');
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
    const { selectionModel, handleSelectionChange, resetSelection } = useSelection();

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

    const {
        control,
        setValue,
        reset,
        handleSubmit,
        formState: { isValid },
    } = useForm<DocumentEditFormSchema>({
        defaultValues: {
            documentId: '',
            documentType: '',
            title: '',
            timeStamp: '',
            status: '',
            creator: null,
            size: null,
        },
        resolver: zodResolver(documentEditFormSchema()),
        mode: 'all',
    });

    const handleDataChange = () => {
        handleSelectionChange(selectionModel);
    };

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
            setDocuments(getDocumentsData);
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

    useEffect(() => {
        getDocuments();
    }, []);

    return (
        <Box>
            <PageHeader text={t('DOCUMENTS.DOCUMENTS')}/>
            <FilterCard>
                <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'space-between'}}>
                    <FormControl sx={{
                        marginTop: 1,
                        marginBottom: 5,
                        marginLeft: 2,
                        display: 'flex',
                        flexDirection: 'row',
                        gap: 2
                    }}>
                        <Input
                            id="name"
                            placeholder={t('DOCUMENTS.DOCUMENT_NAME')}
                            autoFocus
                            onChange={(e) => setSearch(e.target.value)}
                            startAdornment={
                                <InputAdornment position="start">
                                    <SearchIcon sx={{color: '#000000'}}/>
                                </InputAdornment>
                            }
                            endAdornment={
                                <InputAdornment position="end" onClick={() => setSearch('')}>
                                    <ClearIcon sx={{color: '#000000', cursor: 'pointer'}}/>
                                </InputAdornment>
                            }
                            disableUnderline={true}
                            sx={{
                                backgroundColor: `#ffffff`,
                                borderRadius: '13px',
                                color: `#000000`,
                                textDecoration: 'none',
                                height: 40,
                                width: 250,
                                fontSize: "15px",
                                paddingLeft: 1,
                                paddingRight: 1
                            }}
                        />
                        <Input
                            id="position"
                            placeholder={t('DOCUMENTS.DOCUMENT_TYPE')}
                            autoFocus
                            onChange={(e) => setSearch(e.target.value)}
                            startAdornment={
                                <InputAdornment position="start">
                                    <SearchIcon sx={{color: '#000000'}}/>
                                </InputAdornment>
                            }
                            endAdornment={
                                <InputAdornment position="end" onClick={() => setSearch('')}>
                                    <ClearIcon sx={{color: '#000000', cursor: 'pointer'}}/>
                                </InputAdornment>
                            }
                            disableUnderline={true}
                            sx={{
                                backgroundColor: `#ffffff`,
                                borderRadius: '13px',
                                color: `#000000`,
                                textDecoration: 'none',
                                height: 40,
                                width: 250,
                                fontSize: "15px",
                                paddingLeft: 1,
                                paddingRight: 1
                            }}
                        />
                    </FormControl>
                    <Box sx={{ display: 'inline', paddingLeft: 85}}>
                        <SaveButton text={t('DOCUMENTS.UPLOAD_DOCUMENTS')} />
                    </Box>
                </Box>
            </FilterCard>

            <ContentCard>
                <Box sx={{ display: 'flex', marginTop: 2, marginBottom: 10, height: 900}}>
                    <DocumentTableQuery
                        searchResults={
                            documents
                                .filter((item) => {
                                    return search.toLowerCase() === ''
                                        ? item
                                        : item.documentName.toLowerCase().includes(search);
                                })
                        }
                        selectionModel={selectionModel}
                        onSelectionChange={handleSelectionChange}
                        onDataChange={handleDataChange}
                    />
                </Box>
            </ContentCard>
        </Box>
    );
};

export default DocumentList;