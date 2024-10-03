import {Box, FormControl, Input, InputAdornment} from "@mui/material";
import PageHeader from "../../components/text/PageHeader";
import FilterCard from "../../components/layout/FilterCard";
import ContentCard from "../../components/layout/ContentCard";
import {useTypeSafeTranslation} from "../../components/inputField/hooks/useTypeSafeTranslation";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import useSelection from "../../components/inputField/hooks/useSelection";
import SaveButton from "../../components/button/SaveButton";
import DocumentTableQuery from "./DocumentTableQuery";

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

    const handleDataChange = () => {
        handleSelectionChange(selectionModel);
    };

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