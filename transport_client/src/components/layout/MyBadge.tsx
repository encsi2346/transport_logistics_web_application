import {Box, Typography} from "@mui/material";

interface Props {
    text?: string;
}

const MyBadge = ({ text }: Props) => {
    return (
        <Box sx={{
            backgroundColor: "#00d7e4",
            borderRadius: 20,
            paddingLeft: 5,
            paddingRight: 5,
            paddingTop: 1,
            paddingBottom: 1
        }}>
            <Typography sx={{
                color: '#ffffff',
                fontWeight: '300px',
                fontSize: 20,
                letterSpacing: 2
            }}>
                {text}
            </Typography>
        </Box>
    );
};

export default MyBadge;