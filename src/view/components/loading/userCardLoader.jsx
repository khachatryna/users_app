import React, { useState } from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import Grid from "@mui/material/Grid";

function UserCardLoader({limit}) {
    const [list] = useState(new Array(limit).fill(""))

    return (
        <>
            {
            list.map((_,index) => (
                <Grid item xs={12} sm={6} md={3} lg={4} key={index}>
                    <Box sx={{ margin: 1 }}>
                        <Skeleton variant="rectangular" width="100%">
                            <div style={{ paddingTop: '57%' }} />
                        </Skeleton>
                        <Skeleton width="100%">
                            <Typography>.</Typography>
                        </Skeleton>
                    </Box>
                </Grid>
            ))            
            }
        </>
    )

}

export default UserCardLoader