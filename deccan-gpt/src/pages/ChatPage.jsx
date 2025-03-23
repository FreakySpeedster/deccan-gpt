import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addUserMessage, addAiResponse, setConversations, 
  setActiveConversation, finishConversation, 
  startNewConversation, likeMessage, dislikeMessage, saveConversation } from '../features/conversationSlice';
import { Box, Button, TextField, Typography, Paper, IconButton, Rating } from '@mui/material';
import { ThumbUp, ThumbDown, ArrowCircleUp, Close, IosShare } from '@mui/icons-material';
import deccanSvg from '../assets/deccan.svg';
import Sidebar from '../components/SideBar/SideBar';
import FeedbackModal from '../components/FeedbackModal/FeedbackModal';
import ShareChatModal from '../components/ShareChatModal/ShareChatModal';
import { useStore } from 'react-redux';

export default function ChatPage() {
  const dispatch = useDispatch();
  const store = useStore();
  const conversation = useSelector(state => state.conversations.activeConversation);
  const conversations = useSelector((state) => state.conversations.conversations);

  const [input, setInput] = useState('');
  const [isLoadingConversations, setIsLoadingConversations] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [generatedLink, setGeneratedLink] = useState('');
  const [selectedConversationId, setSelectedConversationId] = useState(conversation.id ? conversation.id : '');
  

  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Scroll to the bottom whenever conversation changes
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation]);

  useEffect(() => {
    if (conversations.length === 0) {
      const fetchConversations = async () => {
        setIsLoadingConversations(true);
        const response = await fetch('/api/conversations');
        const formattedResponse = await response.json();
        dispatch(setConversations(formattedResponse));
        setIsLoadingConversations(false);
      };
      fetchConversations();
    }
  }, [conversations.length, dispatch]);
  
  const handleSend = async () => {
    if (!input.trim()) return;
    setInput('');
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
  };

  const triggerFeedbackModal = async () => {
    setIsFeedbackOpen(true);
  }

  const addConversation = async () => {
    dispatch(startNewConversation());
    setSelectedConversationId('');
  }

  const saveCurrentConversation = async () => {
    if (conversation.messages.length > 0) {
      dispatch(saveConversation());
      const updatedConversation = store.getState().conversations.activeConversation;
      await fetch('/api/save-conversation', {
        method: 'POST',
        body: JSON.stringify(updatedConversation),
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
  }

  const handleFeedbackSubmit = async (feedbackData) => {
    try {
      dispatch(finishConversation(feedbackData));
      saveCurrentConversation();
      setIsFeedbackOpen(false);
    }
    catch (error) {
      console.error(error);
      dispatch(addAiResponse("Noted! Thank you for the feedback."));
    }
  }

  const generateShareLink = () => {
    saveCurrentConversation();
    const generatedShareLink = `${window.location.origin}/shared-conversation/${selectedConversationId}`;
    setGeneratedLink(generatedShareLink);
    setIsShareOpen(true);
  };
  

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const handleSelectConversation = async (id) => {
    saveCurrentConversation();
    console.log('Selected conversation ID:', id);
    setSelectedConversationId(id);
    // Dispatch load conversation logic if available
    try {
      // Fetch the conversation details from MirageJS
      const response = await fetch(`/api/conversations/${id}`);
      const data = await response.json();

      // Dispatch to Redux to set it as activeConversation
      dispatch(setActiveConversation(data));
    } catch (error) {
      console.error('Failed to load conversation:', error);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', height: '100vh', width: '100vw' }}>
      <Sidebar
        conversations={conversations}
        addConversation={addConversation}
        onSelectConversation={handleSelectConversation}
        selectedConversationId={selectedConversationId}
        open={isSidebarOpen}
        toggleDrawer={toggleSidebar}
        isLoadingConversations={isLoadingConversations}
      />
      <Box sx={{ backgroundColor: '#fff',  height: '100vh', display: 'flex', flexDirection: 'column', flexGrow: 1,
      justifyContent: 'flex-end', boxSizing: 'border-box', padding: '20px', overflow: 'hidden' }}>
        <Box sx={{ display: 'flex', flexDirection: 'row'}}>
          <Typography variant="h4" gutterBottom>
            <img src={deccanSvg} alt="Deccan Logo" />
          </Typography>
          <Box sx={{marginLeft: 'auto'}}>
            <Button sx={{backgroundColor: '#fff', color: '#636363', borderRadius: '10px', height: '40px', boxShadow: 'none', border: '1px solid #636363',
              '&:hover': { backgroundColor: '#000', color: '#fff', boxShadow: 'none', border: '1px solid #f5f5f5' }
              }}
              variant="contained" 
              onClick={generateShareLink}>
              <IosShare sx={{ fontSize: '16px', marginBottom: '2px' }} /> 
              <Typography style={{ textTransform: 'none', fontSize: '14px' }}>Share</Typography>
            </Button>
          {!conversation?.isFinished && conversation?.messages.length > 0 && 
            (<Button sx={{backgroundColor: '#fff', color: '#636363', borderRadius: '10px', height: '40px', marginLeft: '20px', boxShadow: 'none', border: '1px solid #636363',
              '&:hover': { backgroundColor: '#000', color: '#fff', boxShadow: 'none', border: '1px solid #f5f5f5' }
              }}
              variant="contained" 
              onClick={triggerFeedbackModal}>
              <Close sx={{ fontSize: '18px' }} /> 
              <Typography style={{ textTransform: 'none', fontSize: '14px' }}>End</Typography>
            </Button>)}
          </Box>
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
              wordWrap: 'break-word',
              '&:hover .icon-buttons': {
                visibility: 'visible'
              }
            }}>
              <Typography>{msg.content}</Typography>

              {msg.role === 'ai' && (
                <Box
                  className="icon-buttons"
                  sx={{
                    visibility: 'hidden', // hide by default
                  }}
                >
                  <IconButton size='small'
                    onClick={() => dispatch(likeMessage(msg.id))}
                    color={msg.liked ? 'primary' : 'default'}
                  >
                    <ThumbUp fontSize='small'/>
                  </IconButton>
                  <IconButton size='small' sx={{ fontSize: '3px' }}
                    onClick={() => dispatch(dislikeMessage(msg.id))}
                    color={msg.disliked ? 'error' : 'default'}
                  >
                    <ThumbDown fontSize='small'/>
                  </IconButton>
                </Box>
              )}
            </Paper>
          ))}
          {conversation?.isFinished && (
            <Paper elevation={1} sx={{maxWidth: '60%', p: 2,
              mb: 1, alignSelf: 'flex-end'}}>
              <Typography variant="h5" gutterBottom>
                Your Feedback
              </Typography>
              <Rating
                name="user-rating"
                value={conversation.feedback.overallRating}
              />
              <div>{conversation.feedback.subjectiveFeedback}</div>
            </Paper>
          )}
          <div ref={messagesEndRef} />
        </Box>

        {!conversation?.isFinished && (<Box sx={{ display: 'flex', gap: 1 }}>
          <TextField
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '26px',
              },
            }}
            fullWidth
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Ask anything..."
          />
          <Button sx={{borderRadius: '40px', width: '40px'}} variant="contained" onClick={handleSend}>
            <ArrowCircleUp sx={{ fontSize: '36px' }} />
          </Button>
        </Box>)}
      </Box>
      <FeedbackModal
        open={isFeedbackOpen}
        onClose={() => setIsFeedbackOpen(false)}
        onSubmit={handleFeedbackSubmit}
      />
      <ShareChatModal
        open={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        generatedLink={generatedLink}
      />
    </Box>
  );
}