import React from 'react';
import {
  Drawer,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  Button
} from '@mui/material';
import Loader1 from '../Loader/Loader1';
import { Add, BarChart } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 240;

export default function Sidebar({ conversations, onSelectConversation, selectedConversationId,
  open, isLoadingConversations, addConversation }) {

  const navigate = useNavigate();
  const goToFeedbackOverview = () => {
    navigate('/feedback-overview');
  };
  return (
    <Drawer
      variant="persistent"   // stays open (can also be temporary if mobile)
      anchor="left"
      open={open}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box'
        }
      }}
    >
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '5px' }}>
        <Typography variant="h6" className='ml-5'>Conversations</Typography>
        <Button className='custom-button' >
          <Add onClick={addConversation} />
        </Button>
      </Box>
      <List>
        {conversations.length === 0 ? (
          <>
            {isLoadingConversations ? (
              <div className='load-conversations'>
                <Loader1 />
              </div>
            ) : (
              <ListItem>
                <ListItemText primary="No conversations yet!" />
              </ListItem>
            )}
          </>

        ) : (
          conversations.map((conv) => (
            <ListItem key={conv.id} disablePadding>
              <ListItemButton
                onClick={() => onSelectConversation(conv.id)}
                selected={conv.id === selectedConversationId}
              >
                <ListItemText
                  primary={conv.title || `Conversation ${conv.id}`}
                />
              </ListItemButton>
            </ListItem>
          ))
        )}
      </List>
      <Button
        variant="outlined"
        sx={{
          textTransform: 'none', marginTop: 'auto', marginBottom: '20px', p: 4, backgroundColor: '#fff', color: '#636363', height: '40px', boxShadow: 'none', border: 'none',
          '&:hover': { backgroundColor: '#0000000a', color: '#000', boxShadow: 'none' }
        }}
        onClick={goToFeedbackOverview}
      >
        <BarChart sx={{ fontSize: '20px', marginBottom: '2px' }} />
        <Typography style={{ textTransform: 'none', fontSize: '16px' }}>Feedback Overview</Typography>
      </Button>
    </Drawer>
  );
}
