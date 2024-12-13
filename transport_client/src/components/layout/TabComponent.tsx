import * as React from 'react';
import Box from '@mui/material/Box';
import {Typography, useTheme} from "@mui/material";

const TabComponent = () => {
    const theme = useTheme();
    const [value, setValue] = React.useState('all');

    const handleChange = (newValue: string) => {
        setValue(newValue);
    };

    return (
        <Box sx={{
            display: 'flex',
            boxShadow: `0 0 10px rgba(0,0,0,0.2)`,
            backgroundColor: '#c2c2c2',
            borderRadius: '50px',
            overflow: 'hidden'
        }}>
            <Box
                onClick={() => handleChange('all')}
                 sx={{
                     backgroundColor: value === 'all' ? '#989898' : '#c2c2c2',
                     borderRadius: '50px 0 0 50px',
                     paddingLeft: '50px',
                     paddingRight: '50px',
                     paddingTop: '20px',
                     paddingBottom: '20px',
                     justifyContent: 'center',
                     alignItems: 'center',
                     cursor: 'pointer',
                     '&:hover': {
                         paddingLeft: '48px',
                         paddingRight: '48px',
                         paddingTop: '18px',
                         paddingBottom: '18px',
                         backgroundColor: '#ababab'
                     },
            }}>
                <Typography sx={
                    {textAlign: 'center',
                        fontSize: '15px',
                        color: '#ffffff',
                        textTransform: 'uppercase',
                        letterSpacing: '1px'
                    }}>
                    Összes
                </Typography>
            </Box>
            <Box
                onClick={() => handleChange('inprogress')}
                sx={{
                    backgroundColor: value === 'inprogress' ? '#989898' : '#c2c2c2',
                    borderRadius: '0 0 0 0',
                    paddingLeft: '50px',
                    paddingRight: '50px',
                    paddingTop: '20px',
                    paddingBottom: '20px',
                    justifyContent: 'center',
                    alignItems: 'center',
                    cursor: 'pointer',
                    '&:hover': {
                        paddingLeft: '48px',
                        paddingRight: '48px',
                        paddingTop: '18px',
                        paddingBottom: '18px',
                        backgroundColor: '#ababab'
                    },
            }}>
                <Typography sx={{
                    textAlign: 'center',
                    fontSize: '15px',
                    color: '#ffffff',
                    textTransform: 'uppercase',
                    letterSpacing: '1px'
                }}>
                    Folyamatban
                </Typography>
            </Box>
            <Box
                onClick={() => handleChange('ready')}
                sx={{
                    backgroundColor: value === 'ready' ? '#989898' : '#c2c2c2',
                    borderRadius: '0 0 0 0',
                    paddingLeft: '50px',
                    paddingRight: '50px',
                    paddingTop: '20px',
                    paddingBottom: '20px',
                    justifyContent: 'center',
                    alignItems: 'center',
                    cursor: 'pointer',
                    '&:hover': {
                        paddingLeft: '48px',
                        paddingRight: '48px',
                        paddingTop: '18px',
                        paddingBottom: '18px',
                        backgroundColor: '#ababab'
                    },
            }}>
                <Typography sx={{
                    textAlign: 'center',
                    fontSize: '15px',
                    color: '#ffffff',
                    textTransform: 'uppercase',
                    letterSpacing: '1px'
                }}>
                    Teljesített
                </Typography>
            </Box>
            <Box
                onClick={() => handleChange('removed')}
                sx={{
                    backgroundColor: value === 'removed' ? '#989898' : '#c2c2c2',
                    borderRadius: '0 50px 50px 0',
                    paddingLeft: '50px',
                    paddingRight: '50px',
                    paddingTop: '20px',
                    paddingBottom: '20px',
                    justifyContent: 'center',
                    alignItems: 'center',
                    cursor: 'pointer',
                    '&:hover': {
                        paddingLeft: '48px',
                        paddingRight: '48px',
                        paddingTop: '18px',
                        paddingBottom: '18px',
                        backgroundColor: '#ababab'
                    },
            }}>
                <Typography sx={{
                    textAlign: 'center',
                    fontSize: '15px',
                    color: '#ffffff',
                    textTransform: 'uppercase',
                    letterSpacing: '1px'
                }}>
                    Törölt
                </Typography>
            </Box>
        </Box>
    );
}

export default TabComponent;