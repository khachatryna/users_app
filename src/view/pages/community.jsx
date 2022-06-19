import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import {
    Container, Box, List, Avatar, ListItem, ListItemButton, ListItemAvatar, 
    ListItemText, IconButton, Alert, CircularProgress, Chip
} from "@mui/material";
import PagesBreadcrumbs from "../components/pagesBreadcrumbs";
import DeleteIcon from '@mui/icons-material/Delete';
import {getCommunity, communityUsers, remove} from "./../../features/community/communitySlice";
import { useEffect } from "react";

function Community() {
    const dispatch = useDispatch();
    const {userList, error, isLoading} = useSelector(communityUsers);

    useEffect(() => {
        dispatch(getCommunity())
    }, [])

    return (
    <Container className="community">
        <Box>
            <PagesBreadcrumbs />
        </Box>
        <Box maxWidth="sm" className="community-box">
            {
                !isLoading && !userList.length && <Chip label="No Data" />
            }
            {
                isLoading ? <CircularProgress /> : ""
            }
            {
                error ? <Alert variant="outlined" severity="error">
               {error}
              </Alert> :""
            }
            {
                userList && userList.length ? <List dense  className="community-box-list">
                    {
                         userList.map((user) => (
                            <ListItem
                            key={user.login}
                            secondaryAction={
                                <IconButton aria-label="delete" onClick={() => dispatch(remove(user.login))}>
                                    <DeleteIcon />
                                </IconButton>
                             }
                             disablePadding>
                                <ListItemButton>
                                    <ListItemAvatar>
                                        <Avatar
                                        alt={user.login}
                                        src={user.avatar_url}
                                        />
                                    </ListItemAvatar>
                                    <ListItemText  primary={user.login} />
                                </ListItemButton>
                            </ListItem>
                        ))
                    }
            </List> : ""
            }
            
        </Box>
    </Container>
    )
}

export default Community