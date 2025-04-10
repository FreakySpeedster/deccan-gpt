import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    Box,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    TableSortLabel,
    Button
} from '@mui/material';
import { setConversations } from '../features/conversationSlice';
import deccanSvg from '../assets/LeoAI.svg';
import { useNavigate } from 'react-router-dom';

const RATING_OPTIONS = [
    { value: '', label: 'All Ratings' },
    { value: 5, label: '5 Stars' },
    { value: 4, label: '4 Stars' },
    { value: 3, label: '3 Stars' },
    { value: 2, label: '2 Stars' },
    { value: 1, label: '1 Star' }
];

const FeedbackOverview = () => {
    const dispatch = useDispatch();
    const [filterRating, setFilterRating] = useState('');
    const [order, setOrder] = useState('asc');
    const conversations = useSelector((state) => state.conversations.conversations);
    const navigate = useNavigate();
    const handleGoBack = () => {
        navigate('/');
    };

    useEffect(() => {
        if (conversations.length === 0) {
            const fetchConversations = async () => {
                const response = await fetch('/api/conversations');
                const data = await response.json();
                dispatch(setConversations(data));
            };
            fetchConversations();
        }
    }, [dispatch, conversations.length]);

    const handleFilterChange = (event) => {
        setFilterRating(event.target.value);
    };

    const handleSortClick = () => {
        setOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
    };

    const filteredData = conversations
        .filter((item) => {
            if (filterRating === '') return true;
            return item.feedback?.overallRating === filterRating;
        })
        .sort((a, b) => {
            if (order === 'asc') return (a.feedback?.overallRating || 0) - (b.feedback?.overallRating || 0);
            return (b.feedback?.overallRating || 0) - (a.feedback?.overallRating || 0);
        });

    return (
        <Box className='page-container'>
            <Box className='page-wrapper page-wrapper_flex-start'>
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start' }}>
                    <Typography variant="h4" gutterBottom>
                        <img src={deccanSvg} alt="Deccan Logo" />
                    </Typography>
                    <Typography variant="h5" gutterBottom sx={{ backgroundColor: '#fff', color: '#000', m: 1 }}>
                        Analytics
                    </Typography>
                    <Button
                        className='custom-button ml-auto'
                        variant="outlined"
                        onClick={handleGoBack}
                    >
                        Go back to Chats
                    </Button>
                </Box>


                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <FormControl sx={{ minWidth: 200 }}>
                        <InputLabel id="filter-rating-label">Filter by Rating</InputLabel>
                        <Select
                            labelId="filter-rating-label"
                            value={filterRating}
                            label="Filter by Rating"
                            onChange={handleFilterChange}
                        >
                            {RATING_OPTIONS.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>

                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell><strong>Conversation ID</strong></TableCell>
                                <TableCell><strong>Title</strong></TableCell>
                                <TableCell>
                                    <TableSortLabel
                                        active
                                        direction={order}
                                        onClick={handleSortClick}
                                    >
                                        <strong>Rating</strong>
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell><strong>Feedback</strong></TableCell>
                                <TableCell><strong>Status</strong></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredData.map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell>{row.id}</TableCell>
                                    <TableCell>{row.title || '~'}</TableCell>
                                    <TableCell>{row.feedback?.overallRating ? row.feedback?.overallRating : 'N/A'}</TableCell>
                                    <TableCell>{row.feedback.subjectiveFeedback || 'No feedback provided'}</TableCell>
                                    <TableCell>{row.isFinished ? 'Finished' : 'In Progress'}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    );
};

export default FeedbackOverview;