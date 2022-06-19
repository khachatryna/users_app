import React, {useEffect, useState} from "react";
import UserCard from "../components/user/userCard";
import {useLazyGetUsersQuery} from "../../services/users";
import {Box, Grid, Container, Pagination} from '@mui/material';
import PagesBreadcrumbs from "../components/pagesBreadcrumbs";
import UserCardLoader from "../components/loading/userCardLoader";
import {useSearchParams} from "react-router-dom";
import {Outlet} from "react-router-dom";



function Users() {
    const [limit] = useState(8);
    const [page, setPage] = useState(1);
    let [searchParams, setSearchParams] = useSearchParams();
    const [ fetchUsers, prevFetchResult ] = useLazyGetUsersQuery({page, limit});
    const  {currentData, isLoading} = prevFetchResult;

    const changePage = (value) => {
        setPage(value)
        setSearchParams(`?page=${value}`)
        fetchUsers({page: value, limit})
    }
    

    useEffect(() => {
        const value = searchParams.get("page")
        setPage(+value || 1)
        setSearchParams(`?page=${+value || 1}`)
        fetchUsers({page: +value || 1, limit})
    }, [])

    return (
        <Container className="users">
            <PagesBreadcrumbs />
             <Box sx={{ flexGrow: 1 }}>
             <Grid container spacing={2}>                
                 {
                       !isLoading && currentData?.items && currentData.items.length ? currentData.items.map(user =>  (
                            <Grid item xs={12} sm={6} md={3} lg={4} key={user.id}>
                                <UserCard user={user} />
                            </Grid>
                        )) : <UserCardLoader limit={limit} />
                 }
            
                  </Grid>
            </Box>
            {
                currentData && currentData.total_count &&  <Pagination  count={currentData.total_count} 
                                                                        className="pagination"
                                                                        onChange={(_,value) => changePage(value)}
                                                                        page={page}
                                                                        color="primary" />
            }
            <Outlet />
        </Container>
    )
}

export default Users