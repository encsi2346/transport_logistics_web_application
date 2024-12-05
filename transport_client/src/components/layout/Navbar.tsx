import { AppBar, Container } from '@mui/material';
import React, {useEffect, useState} from 'react';
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import {useSelector} from "react-redux";
import axios from "axios";

const Navbar = () => {
    const user = useSelector((state) => state.user);
    const [userData, setUserData] = useState(null);
    const [image, setImage] = useState(null);

    const getUser = async (id: string) => {
        try {
            console.log('id', id);
            const getUserResponse = await fetch(
                `http://localhost:3001/api/users/${id}`,
                {
                    method: "GET",
                    headers: { "Content-Type": "application/json"},
                }
            );
            const getUserData = await getUserResponse.json();
            const getStatus = getUserResponse.status;
            console.log('getUserDataaaaaaa', getUserData);
            console.log('getUserStatus', getStatus);
            setUserData(getUserData);
        } catch (error) {
            console.error('Error get user:', error);
        }
    }

    const getImage = async () => {
        try {
            const response = await axios.get("http://localhost:3001/api/get-image", {
                params: {
                    userId: user._id,
                },
            });
            setImage(response.data.data);
        } catch (error) {
            console.error("Error fetching images:", error);
        }
    };

    useEffect(() => {
        getUser(user._id);
    }, [user]);

    useEffect(() => {
        console.log('userData', userData);
    }, [userData]);

    useEffect(() => {
        getImage();
    }, []);

    return (
        <AppBar
            style={{
                background: "#DD1C13",
                height: 60
            }}
        >
            <Container>
                <Toolbar
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between', // Ensures proper spacing between left and right
                        alignItems: 'center',
                    }}
                >
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            fontFamily: "monospace",
                            fontWeight: 700,
                            letterSpacing: ".3rem",
                            color: "inherit",
                            textDecoration: "none",
                        }}
                        className="cursorp"
                    >
                        My App
                    </Typography>

                    <Avatar
                        sx={{ display: 'flex' }}
                    >
                        <img
                            src={image}
                            style={{ width: "100%", height: "auto" }}
                            alt="logo"
                            width={100}
                            height={100}
                            loading="lazy"
                        />
                    </Avatar>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Navbar;