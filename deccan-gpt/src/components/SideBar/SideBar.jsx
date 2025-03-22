import React, { useEffect } from 'react';
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
import { Add } from '@mui/icons-material';

const drawerWidth = 240;

export default function Sidebar({ conversations, onSelectConversation, selectedConversationId, 
                          open, isLoadingConversations, addConversation }) {


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
      <Box sx={{ p: 2, display: 'flex' }}>
        <Typography variant="h6">Conversations</Typography>
        <Button sx={{marginLeft: 'auto'}}>
          <Add sx={{color: '#000'}} onClick={addConversation}/>
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
    </Drawer>
  );
}
