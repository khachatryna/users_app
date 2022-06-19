import React, { useEffect } from "react";
import {useLazyGetSingleUserQuery} from "../../services/users";
import { useParams } from 'react-router-dom';
import PagesBreadcrumbs from "../components/pagesBreadcrumbs";
import UserCardLoader from "../components/loading/userCardLoader";
import {
    Avatar, Box, Card, Container, Typography, CardContent, Grid,
    List, ListItem, ListItemText, ListItemAvatar, Alert
} from "@mui/material";
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BusinessIcon from '@mui/icons-material/Business';
import GitHubIcon from '@mui/icons-material/GitHub';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import AddToCommunity from "../components/user/addToCommunity";


function SingleUser()  {
    let { username } = useParams();
    let [fetchUser, prevFetchResult] = useLazyGetSingleUserQuery(username);
    const  {currentData, isLoading, error} = prevFetchResult;

   
    useEffect(() => {
        if (username) {
            fetchUser(username);
        }
    }, [username])

    return (
        <Container className="single-user">
            <Box>
              <PagesBreadcrumbs />
            </Box>
            <Box maxWidth="sm" className="single-user-box">
                {
                    isLoading? <UserCardLoader limit={1} /> : ""
                }
                 {
                error ? <Alert variant="outlined" severity="error">
                            {error}
                        </Alert> :""
                }
                {
                    currentData ?
                    <Card className="user-card">
                        <CardContent>
                        <Box component="div" className="user-card-info">
                            <Avatar className="avatar"
                                    alt={currentData.login}
                                    src={currentData.avatar_url}
                                    sx={{ width: 56, height: 56 }} />
                            <Typography gutterBottom variant="h5" component="div"  className="title" >
                                {currentData.name}
                            </Typography>
                        </Box>
                        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                            <Grid item xs={6}>
                                <List>
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <BookmarksIcon />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary="Followers" secondary={currentData.followers} />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <BookmarkAddIcon />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary="Following" secondary={currentData.following} />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <LocationOnIcon />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary="Location" secondary={currentData.location} />
                                    </ListItem>
                                </List>
                            </Grid>
                            <Grid item xs={6}>
                                <List >
                                    {
                                        currentData.company && <ListItem>
                                            <ListItemAvatar>
                                                <Avatar>
                                                    <BusinessIcon />
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText primary="Company" secondary={currentData.company} />
                                        </ListItem>
                                    }
                                    
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <GitHubIcon />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary="Public repos" secondary={currentData.public_repos} />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <PersonOutlineIcon />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary="Nickname" secondary={currentData.login} />
                                    </ListItem>
                                </List>
                            </Grid>
                        </Grid>
                        <div className="user-card-info">
                            <AddToCommunity userName={currentData.login} />
                        </div>
                        </CardContent>       
                    </Card> : ""
                }
               
            </Box>
        </Container>
    )
}

export default SingleUser