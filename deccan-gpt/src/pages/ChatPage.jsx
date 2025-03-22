import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addUserMessage, addAiResponse, setConversations, 
  setActiveConversation, finishConversation, startNewConversation } from '../features/conversationSlice';
import { Box, Button, TextField, Typography, Paper, IconButton, Rating } from '@mui/material';
import { ThumbUp, ThumbDown, ArrowCircleUp, Close } from '@mui/icons-material';
import deccanSvg from '../assets/deccan.svg';
import Sidebar from '../components/SideBar/SideBar';
import FeedbackModal from '../components/FeedbackModal/FeedbackModal';

export default function ChatPage() {
  const dispatch = useDispatch();
  const conversation = useSelector(state => state.conversations.activeConversation);
  const conversations = useSelector((state) => state.conversations.conversations);

  const [input, setInput] = useState('');
  const [isLoadingConversations, setIsLoadingConversations] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [selectedConversationId, setSelectedConversationId] = useState('');
  

  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Scroll to the bottom whenever conversation changes
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation]);

  useEffect(() => {
    const fetchConversations = async () => {
      setIsLoadingConversations(true);
      const response = await fetch('/api/conversations');
      const formattedResponse = await response.json();
      dispatch(setConversations(formattedResponse));
      setIsLoadingConversations(false);
    };
  
    fetchConversations();
  }, [dispatch]);
  
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

  const handleFeedbackSubmit = async (feedbackData) => {
    try {
      dispatch(finishConversation(feedbackData));
      dispatch(addAiResponse("Noted! Thank you for the feedback."));
      console.log(feedbackData);
      const response = await fetch('/api/save-conversation', {
        method: 'POST',
        body: JSON.stringify({ conversation }),
        headers: { 'Content-Type': 'application/json' }
      });
      setIsFeedbackOpen(false);
      dispatch(startNewConversation());
    }
    catch (error) {
      console.error(error);
      dispatch(addAiResponse("Noted! Thank you for the feedback."));
    }
  }
  

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const handleSelectConversation = async (id) => {
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
          {!conversation?.isFinished && conversation?.messages.length > 0 && (<Button sx={{backgroundColor: '#fff', borderRadius: '10px', height: '40px', marginLeft: 'auto', boxShadow: 'none'}} variant="contained" onClick={triggerFeedbackModal}>
            <Close sx={{ color: '#d3302f', fontSize: '30px' }} />
          </Button>)}
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
    </Box>
  );
}