import React from 'react';
import PageHeader from "./components/layout/PageHeader.tsx";
import {Box} from "@mui/material";

const App = () => {
  return (
    <>
        <Box>
            <PageHeader text={'Új autótípus hozzáadása'}/>
        </Box>
    </>
  );
}

export default App;
