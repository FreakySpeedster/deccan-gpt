import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import deccanSvg from '../assets/deccan.svg';
import { Box, Typography, Paper } from '@mui/material';

const ShareChatModal = () => {
  const { id } = useParams();
  const [conversation, setConversation] = useState(null);

  useEffect(() => {
    const fetchConversation = async () => {
      try {
        const response = await fetch(`/api/conversations/${id}`);
        const data = await response.json();
        setConversation(data);
      } catch (error) {
        console.error('Error fetching conversation', error);
      }
    };

    fetchConversation();
  }, [id]);

  if (!conversation) return <div>Loading...</div>;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', height: '100vh', width: '100vw' }}>
      <Box sx={{ backgroundColor: '#fff',  height: '100vh', display: 'flex', flexDirection: 'column', flexGrow: 1,
            justifyContent: 'flex-end', boxSizing: 'border-box', padding: '20px', overflow: 'hidden' }}>
              <Box sx={{ display: 'flex', flexDirection: 'row'}}>
                <Typography variant="h4" gutterBottom>
                  <img src={deccanSvg} alt="Deccan Logo" />
                </Typography>
                <h2>Shared Conversation</h2>
              </Box>
        <Box sx={{ overflowY: 'auto', mb: 2, display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
            {conversation.messages.map((msg, idx) => (
              <Paper elevation={0} key={idx} sx={{ 
                p: 2,
                mb: 1,
                backgroundColor: msg.role === 'ai' ? '#fff' : '#f1f1f1',
                borderRadius: '10px',
                alignSelf: msg.role === 'ai' ? 'flex-start' : 'flex-end',
                maxWidth: msg.role === 'ai' ? '100%' : '60%',
                width: 'auto',
                wordWrap: 'break-word'
              }}>
                <Typography>{msg.content}</Typography>

              </Paper>
            ))}
          </Box>
        </Box>
    </Box>
  );
};

export default ShareChatModal;
