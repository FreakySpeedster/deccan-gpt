import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import deccanSvg from '../assets/LeoAI.svg';
import { Box, Typography, Paper } from '@mui/material';
import { getConversationById } from '../services/api';


const ShareChatModal = () => {
  const { id } = useParams();
  const [conversation, setConversation] = useState(null);

  useEffect(() => {
    const fetchConversation = async () => {
      try {
        const data = await getConversationById(id);
        setConversation(data);
      } catch (error) {
        console.error('Error fetching conversation', error);
      }
    };

    fetchConversation();
  }, [id]);

  if (!conversation) return <div>Loading...</div>;

  return (
    <Box className='page-container'>
      <Box className='page-wrapper page-wrapper_flex-end'>
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
          <Typography variant="h4" gutterBottom>
            <img src={deccanSvg} alt="Deccan Logo" />
          </Typography>
          <Typography variant="h5" gutterBottom sx={{ backgroundColor: '#fff', color: '#000', m: 1 }}>
            Shared Conversation
          </Typography>
        </Box>
        <Box className='conversations-container'>
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
