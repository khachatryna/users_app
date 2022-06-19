import React from "react";
import {Card, CardContent, Typography, Avatar} from '@mui/material';
import AddToCommunity from "./addToCommunity";
import { Link } from "react-router-dom";


function UserCard({user}) {
    return (
    <Card className="user-card">
        <CardContent>
            <Link to={`/users/${user.login}`} className="user-card-info">
                <Avatar
                className="avatar"
                alt={user.login}
                src={user.avatar_url}
                sx={{ width: 56, height: 56 }}/>
                <Typography gutterBottom variant="h5" component="div"  className="title" >
                    {user.login}
                </Typography>
            </Link>
            <div className="user-card-info">
                <AddToCommunity userName={user.login} />
            </div>
        </CardContent>
    </Card>
    )
}

export default UserCard;