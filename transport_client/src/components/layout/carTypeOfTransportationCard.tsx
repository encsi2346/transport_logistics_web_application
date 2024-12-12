import {Box, SxProps, Theme, Typography, useTheme} from "@mui/material";
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import DeleteIcon from '@mui/icons-material/Delete';

const textStyle: SxProps<Theme> = {
    fontWeight: 'bold',
    fontSize: '20px',
    color: '#DD1C13',
    textTransform: 'uppercase',
}

const smallTextStyle: SxProps<Theme> = {
    fontWeight: 'normal',
    fontSize: '12px',
    color: '#A3A3A3',
}

const iconStyle: SxProps<Theme> = {
    fontSize: 100,
    color: '#A3A3A3',
    marginLeft: '40px',
    marginRight: '50px',
}

interface Props {
    onClick: () => void;
    id: number;
    type: string;
    countOfCars: number;
    isEditing: boolean;
    refreshParent: () => void;
}

const CarTypeOfTransportationCard = ({ onClick, id, type, countOfCars, isEditing, refreshParent }: Props) => {
    const theme = useTheme();

    const deleteTypeOfTransportation = async (id: string) => {
        try {
            const deleteTypeOfTransportationResponse = await fetch(
                `http://localhost:3001/api/type-of-transportation/${id}`,
                {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json"},
                }
            );
            if (deleteTypeOfTransportationResponse.ok) {
                console.log(`Transportation type with ID ${id} deleted successfully.`);
                refreshParent(); // Call the parent refresh function
            } else {
                console.error(`Failed to delete transportation type with ID ${id}.`);
            }
        } catch (error) {
            console.error(`Error deleting type of transportation with ID ${id}:`, error);
        }
    };

    return (
        <Box>
            {isEditing && (
                <Box
                    onClick={() => deleteTypeOfTransportation(String(id))}
                    sx={{
                        backgroundColor: "#ffffff",
                        width: 60,
                        height: 60,
                        marginLeft: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '12px 12px 0 0',
                        cursor: 'pointer'
                }}>
                    <DeleteIcon
                        sx={{
                            width: 30,
                            height: 30,
                            color: '#DD1C13',
                        }}
                    />
                </Box>
            )}
            <Box
                onClick={onClick}
                sx={{
                    backgroundColor: `${theme.palette.component.lightMin}`,
                    borderRadius: '19px',
                    marginRight: '60px',
                    marginBottom: '60px',
                    paddingTop: '15px',
                    paddingBottom: '15px',
                    paddingLeft: '15px',
                    paddingRight: '15px',
                    boxShadow: `5px 7px 10px rgba(0,0,0,0.25)`,
                    cursor: 'pointer', //TODO: create hover-effect
                    justifyContent: 'center'
                }}
            >
                <Box sx={{display: 'flex', alignItems: 'center', marginTop: 3}}>
                    <Box>
                        <LocalShippingIcon sx={iconStyle}/>
                    </Box>
                    <Typography sx={textStyle}>
                        {type}
                    </Typography>
                </Box>
                <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
                    <Typography sx={smallTextStyle}>
                        {countOfCars} jármű
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default CarTypeOfTransportationCard;