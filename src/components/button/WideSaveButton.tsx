import {Button, SxProps, Theme} from "@mui/material";

const titleStyle: SxProps<Theme> = {
    fontWeight: 'regular',
    fontSize: '14px',
    color: '#ffffff',
    backgroundColor: '#DD1C13',
    borderRadius: '31px',
    marginLeft: '20px',
    marginRight: '20px',
    marginTop: '20px',
    marginBottom: '20px',
    paddingTop: '4px',
    paddingBottom: '4px',
    paddingLeft: '100px',
    paddingRight: '100px',
    textTransform: 'none',
}

interface Props {
    text: string;
}

const WideSaveButton = ({ text }: Props) => {
    return (
        <Button sx={titleStyle}>
            {text}
        </Button>
    );
};

export default WideSaveButton;