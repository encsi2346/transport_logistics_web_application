import * as React from 'react';
import Box from '@mui/material/Box';
import {Typography} from "@mui/material";

const TabComponent = () => {
    const [value, setValue] = React.useState('all');

    const handleChange = (newValue: string) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <Box onClick={() => handleChange('all')} sx={{backgroundColor: value === 'all' ? '#989898' : '#c2c2c2', borderRadius: '19px 0 0 19px', paddingLeft: '50px', paddingRight: '50px', paddingTop: '20px', paddingBottom: '20px', justifyContent: 'center', alignItems: 'center', cursor: 'pointer'}}>
                <Typography sx={{textAlign: 'center', fontSize: '15px', color: '#ffffff', textTransform: 'uppercase', letterSpacing: '1px'}}>Összes</Typography>
            </Box>
            <Box onClick={() => handleChange('inprogress')} sx={{backgroundColor: value === 'inprogress' ? '#989898' : '#c2c2c2', borderRadius: '0 0 0 0', paddingLeft: '50px', paddingRight: '50px', paddingTop: '20px', paddingBottom: '20px', justifyContent: 'center', alignItems: 'center', cursor: 'pointer'}}>
                <Typography sx={{textAlign: 'center', fontSize: '15px', color: '#ffffff', textTransform: 'uppercase', letterSpacing: '1px'}}>Folyamatban</Typography>
            </Box>
            <Box onClick={() => handleChange('ready')} sx={{backgroundColor: value === 'ready' ? '#989898' : '#c2c2c2', borderRadius: '0 0 0 0', paddingLeft: '50px', paddingRight: '50px', paddingTop: '20px', paddingBottom: '20px', justifyContent: 'center', alignItems: 'center', cursor: 'pointer'}}>
                <Typography sx={{textAlign: 'center', fontSize: '15px', color: '#ffffff', textTransform: 'uppercase', letterSpacing: '1px'}}>
                    Teljesített
                </Typography>
            </Box>
            <Box onClick={() => handleChange('removed')} sx={{backgroundColor: value === 'removed' ? '#989898' : '#c2c2c2', borderRadius: '0 19px 19px 0', paddingLeft: '50px', paddingRight: '50px', paddingTop: '20px', paddingBottom: '20px', justifyContent: 'center', alignItems: 'center', cursor: 'pointer'}}>
                <Typography sx={{textAlign: 'center', fontSize: '15px', color: '#ffffff', textTransform: 'uppercase', letterSpacing: '1px'}}>
                    Törölt
                </Typography>
            </Box>
        </Box>
    );
}

export default TabComponent;