import React, { useState } from "react";
import {add} from "./../../../features/community/communitySlice";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {isCommunityFull, isExistInCommunity} from "./../../../features/community/communityServices";
import { useDispatch } from 'react-redux';
import {Button} from '@mui/material';
import { useEffect } from "react";


function AddToCommunity({userName}) {
    const [disabled, setDisabled] = useState(false);

    useEffect(() => {
        setDisabled(isCommunityFull() || isExistInCommunity(userName))
    }, []);

    const addCommunity = () => {
        dispatch(add(userName))
        setDisabled(isCommunityFull() || isExistInCommunity(userName))
    }
    const dispatch = useDispatch();
    return (
    <Button variant="outlined" 
            disabled={disabled}
            onClick={addCommunity}>
            <AddCircleOutlineIcon /> Add Community
    </Button>
    )
}

export default AddToCommunity