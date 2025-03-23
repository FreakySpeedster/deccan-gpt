import React from 'react';
import { Box, Typography, Paper, Stack } from '@mui/material';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';

const suggestions = [
  'Say hello to our AI!',
  'Ask me for coding tips!',
  'What’s the weather today?',
  'Give me a motivational quote.',
];

const NewConversationSuggestion = () => {
  return (
    <Box
      sx={{
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        color: 'text.secondary',
        padding: 4,
      }}
    >
      <ChatBubbleOutlineIcon sx={{ fontSize: 64, color: '#747070', mb: 2 }} />

      <Typography variant="h5" gutterBottom>
        Start a new conversation
      </Typography>

      <Typography variant="body1" sx={{ mb: 4 }}>
        Here are some things you can try asking:
      </Typography>

      <Stack spacing={2} sx={{ width: '100%', maxWidth: 400 }}>
        {suggestions.map((text, idx) => (
          <Paper
            key={idx}
            elevation={0}
            sx={{
              padding: 2,
              textAlign: 'left',
              cursor: 'not-allowed',
              backgroundColor: '#fff',
              borderRadius: '20px',
              border: '1px solid rgb(195, 195, 195)'
            }}
          >
            {text}
          </Paper>
        ))}
      </Stack>
    </Box>
  );
};

export default NewConversationSuggestion;