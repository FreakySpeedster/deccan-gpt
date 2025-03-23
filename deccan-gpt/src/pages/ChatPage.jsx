/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addUserMessage, addAiResponse, setConversations, setActiveConversation, finishConversation,
  startNewConversation, likeMessage, dislikeMessage, saveConversation
} from '../features/conversationSlice';
import { Box, Button, TextField, Typography, Paper, IconButton, Rating } from '@mui/material';
import { ThumbUp, ThumbDown, ArrowCircleUp, Close, IosShare } from '@mui/icons-material';
import deccanSvg from '../assets/deccan.svg';
import Sidebar from '../components/SideBar/SideBar';
import FeedbackModal from '../components/FeedbackModal/FeedbackModal';
import ShareChatModal from '../components/ShareChatModal/ShareChatModal';
import NewConversationSuggestion from '../components/NewConversationSuggestion/NewConversationSuggestion';
import { useStore } from 'react-redux';
import { getConversations, postConversation, postUserMessage, getConversationById } from '../services/api';

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
    // load all the conversations if none in store
    if (conversations.length === 0) {
      const loadConversations = async () => {
        setIsLoadingConversations(true);
        try {
          const data = await getConversations();
          dispatch(setConversations(data));
        } catch (error) {
          console.error('Failed to fetch conversations:', error);
        } finally {
          setIsLoadingConversations(false);
        }
      };
      loadConversations();
    }
  }, [conversations.length, dispatch]);

  const handleSend = async () => {
    // POST user message to /chat API
    if (!input.trim()) return;
    dispatch(addUserMessage(input));
    setInput('');
    try {
      const response = await postUserMessage(input);
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

  const triggerFeedbackModal = () => {
    setIsFeedbackOpen(true);
  }

  const addConversation = useCallback(async () => {
    // Initiates new conversation in store
    await saveCurrentConversation();
    dispatch(startNewConversation());
    setSelectedConversationId('');
  }, [dispatch]);

  const saveCurrentConversation = useCallback(async () => {
    // Triggers when user tries to navigate to other conversation
    // in the middle of chat
    const updatedConversation = store.getState().conversations.activeConversation;
    if (updatedConversation.messages.length > 0) {
      try {
        await postConversation(updatedConversation);
        dispatch(saveConversation());
      } catch (error) {
        console.error('Failed to save conversation:', error);
      }
    }
  }, [conversation.messages.length, dispatch, store]);

  const handleFeedbackSubmit = async (feedbackData) => {
    try {
      dispatch(finishConversation(feedbackData));
      await saveCurrentConversation();
      setIsFeedbackOpen(false);
    } catch (error) {
      console.error(error);
    }
  }

  const generateShareLink = useCallback(async () => {
    await saveCurrentConversation();
    const generatedShareLink = `${window.location.origin}/shared-conversation/${selectedConversationId}`;
    setGeneratedLink(generatedShareLink);
    setIsShareOpen(true);
  }, [saveCurrentConversation, selectedConversationId]);


  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const handleSelectConversation = async (id) => {
    saveCurrentConversation();
    console.log('Selected conversation ID:', id);
    setSelectedConversationId(id);
    try {
      // Fetch the conversation details from MirageJS
      const data = await getConversationById(id);

      // Dispatch to Redux to set it as activeConversation
      dispatch(setActiveConversation(data));
    } catch (error) {
      console.error('Failed to load conversation:', error);
    }
  };

  return (
    <Box className='page-container'>
      <Sidebar
        conversations={conversations}
        addConversation={addConversation}
        onSelectConversation={handleSelectConversation}
        selectedConversationId={selectedConversationId}
        open={isSidebarOpen}
        toggleDrawer={toggleSidebar}
        isLoadingConversations={isLoadingConversations}
      />
      <Box className='page-wrapper page-wrapper_flex-end'>
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
          <Typography variant="h4" gutterBottom>
            <img src={deccanSvg} alt="Deccan Logo" />
          </Typography>
          <Box sx={{ marginLeft: 'auto' }}>
            {conversation?.messages.length > 0 && <Button className='custom-button' variant="contained" onClick={generateShareLink}>
              <IosShare sx={{ fontSize: '16px', marginBottom: '2px' }} />
              <Typography style={{ textTransform: 'none', fontSize: '14px' }}>Share</Typography>
            </Button>}
            {!conversation?.isFinished && conversation?.messages.length > 0 &&
              (<Button className='custom-button ml-20'
                variant="contained"
                onClick={triggerFeedbackModal}>
                <Close sx={{ fontSize: '18px' }} />
                <Typography style={{ textTransform: 'none', fontSize: '14px' }}>End</Typography>
              </Button>)}
          </Box>
        </Box>

        <Box className='conversations-container'>
        {conversation?.messages.length === 0 ? (
          <NewConversationSuggestion/>
          ) : (
          conversation.messages.map((msg, idx) => (
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
                <Box className="icon-buttons" sx={{ visibility: 'hidden' }}>
                  <IconButton size='small'
                    onClick={() => dispatch(likeMessage(msg.id))}
                    color={msg.liked ? 'primary' : 'default'}
                  >
                    <ThumbUp fontSize='small' />
                  </IconButton>
                  <IconButton size='small' sx={{ fontSize: '3px' }}
                    onClick={() => dispatch(dislikeMessage(msg.id))}
                    color={msg.disliked ? 'error' : 'default'}
                  >
                    <ThumbDown fontSize='small' />
                  </IconButton>
                </Box>
              )}
            </Paper>
          )))}
          {conversation?.isFinished && (
            <Paper elevation={1} sx={{
              maxWidth: '60%', p: 2,
              mb: 1, alignSelf: 'flex-end'
            }}>
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
          <Button sx={{ borderRadius: '40px', width: '40px' }} variant="contained" onClick={handleSend}>
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