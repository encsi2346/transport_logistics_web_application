import {Box, TextField} from "@mui/material";
import PageHeader from "../../components/text/PageHeader.tsx";
import FilterCard from "../../components/layout/FilterCard.tsx";
import NoBackgroundCard from "../../components/layout/NoBackgroundCard.tsx";
import UserTableComponent from "../../components/layout/UserTableComponent.tsx";
import TextFieldInput from "../../components/inputField/TextFieldInput.tsx";
import {useForm} from "react-hook-form";

const UserList = () => {
    const { control, reset, handleSubmit, setValue } = useForm({
        defaultValues: {
            taskIdIn: [],
            onlyActives: false,
        },
    });

    const onSubmit = handleSubmit((data) => {});

    const onReset = () => {
        reset();
        onSubmit();
    };

    return (
        <Box>
            <PageHeader text={'Alkalmazottak'}/>
            <FilterCard>
                <Box sx={{display: 'flex', flexDirection: 'column'}}>
                    <Box sx={{ display: 'flex', flexDirection: 'row'}}>
                        <form autoComplete="off" noValidate onSubmit={onSubmit}>
                            <TextFieldInput
                                label={'NAME'}
                                control={control}
                                name="name"
                            />
                            <TextFieldInput
                                label={'POSITION'}
                                control={control}
                                name="position"
                            />
                        </form>
                    </Box>
                </Box>
            </FilterCard>
            <NoBackgroundCard>
                <UserTableComponent />
            </NoBackgroundCard>
        </Box>
    );
};

export default UserList;