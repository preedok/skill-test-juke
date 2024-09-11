import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Typography, Button, TablePagination } from '@mui/material';
import { usePosts } from '../hooks/usePosts';
import { styled } from '@mui/material/styles';

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:hover': {
        backgroundColor: theme.palette.action.selected,
    },
}));

const HomePage = () => {
    const { posts, loading, error } = usePosts();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </div>
        );
    }
    if (error) {
        return <Typography variant="h6">Error loading posts: {error.message}</Typography>;
    }

    const startIndex = page * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const paginatedPosts = posts.slice(startIndex, endIndex);

    return (
        <div style={{ padding: '20px' }}>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{
                                backgroundColor: "#0C359E",
                                border: "none",
                                color: 'white'
                            }}>ID</TableCell>
                            <TableCell style={{
                                backgroundColor: "#0C359E",
                                border: "none",
                                color: 'white'
                            }}>Judul</TableCell>
                            <TableCell style={{
                                backgroundColor: "#0C359E",
                                border: "none",
                                color: 'white'
                            }} align="center">Aksi</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedPosts.map((post) => (
                            <StyledTableRow key={post.id}>
                                <TableCell>{post.id}</TableCell>
                                <TableCell>{post.title}</TableCell>
                                <TableCell align="center">
                                    <Link to={`/posts/${post.id}`} style={{ textDecoration: 'none' }}>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            style={{ backgroundColor: '#6200ea', color: '#fff', borderRadius: '20px' }}
                                        >
                                            Detail
                                        </Button>
                                    </Link>
                                </TableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <TablePagination
                component="div"
                count={posts.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                rowsPerPageOptions={[5, 10, 25]}
            />
        </div>
    );
};

export default HomePage;
