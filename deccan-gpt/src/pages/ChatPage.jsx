import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addUserMessage, addAiResponse } from '../features/conversationSlice';
import { Box, Button, TextField, Typography, Paper, IconButton } from '@mui/material';
import { ThumbUp, ThumbDown, ArrowCircleUp } from '@mui/icons-material';
import deccanSvg from '../assets/deccan.svg';

export default function ChatPage() {
  const dispatch = useDispatch();
  const conversation = useSelector(state => state.conversations.activeConversation);
  const [input, setInput] = useState('');

  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Scroll to the bottom whenever conversation changes
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation]);
  
  const handleSend = async () => {
    if (!input.trim()) return;

    dispatch(addUserMessage(input));

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        body: JSON.stringify({ message: input }),
        headers: { 'Content-Type': 'application/json' }
      });

      if (!response.ok) {
        throw new Error('AI failed to respond.');
      }

      const data = await response.json();
      dispatch(addAiResponse(data.response));
    } catch (error) {
      console.error(error);
      dispatch(addAiResponse("Error: AI could not generate a response. Try again!"));
    }

    setInput('');
  };

  return (
    <Box sx={{ backgroundColor: '#fff', width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', 
    justifyContent: 'flex-end', boxSizing: 'border-box', padding: '20px', borderBottom: '1px solid #c4c4c4' }}>
      <Typography variant="h4" gutterBottom>
        <img src={deccanSvg} alt="Deccan Logo" />
      </Typography>

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

            {msg.role === 'ai' && (
              <Box sx={{ mt: 1 }}>
                <IconButton color="#000" onClick={() => console.log('Thumb Up')}>
                  <ThumbUp />
                </IconButton>
                <IconButton color="error" onClick={() => console.log('Thumb Down')}>
                  <ThumbDown />
                </IconButton>
              </Box>
            )}
          </Paper>
        ))}
        <div ref={messagesEndRef} />
      </Box>

      <Box sx={{ display: 'flex', gap: 1 }}>
        <TextField
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '26px',
            },
          }}
          fullWidth
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask anything..."
        />
        <Button sx={{borderRadius: '40px', width: '40px'}}variant="contained" onClick={handleSend}>
          <ArrowCircleUp sx={{ fontSize: '36px' }} />
        </Button>
      </Box>
    </Box>
  );
}