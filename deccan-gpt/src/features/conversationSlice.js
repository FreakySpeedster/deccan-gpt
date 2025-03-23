import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  conversations: [],
  activeConversation: {
    id: `conv_${Date.now()}`,
    title: '',
    messages: [],
    feedback: {
      overallRating: null,
      subjectiveFeedback: ''
    },
    isFinished: false
  }
};

const conversationSlice = createSlice({
  name: 'conversations',
  initialState,
  reducers: {
    addUserMessage(state, action) {
      state.activeConversation.messages.push({
        id: `msg_${Date.now()}`,
        role: 'user',
        content: action.payload
      });
      if (state.activeConversation.messages.length === 1) {
        state.activeConversation.title = action.payload;
      }
    },
    addAiResponse(state, action) {
      state.activeConversation.messages.push({
        id: `msg_${Date.now()}`,
        role: 'ai',
        content: action.payload,
        liked: false,
        disliked: false
      });
    },

    likeMessage(state, action) {
      const message = state.activeConversation.messages.find(msg => msg.id === action.payload);
      if (message) {
        message.liked = !message.liked;
        if (message.liked) {
          message.disliked = false; // un-dislike if liked
        }
      }
    },
    
    dislikeMessage(state, action) {
      const message = state.activeConversation.messages.find(msg => msg.id === action.payload);
      if (message) {
        message.disliked = !message.disliked;
        if (message.disliked) {
          message.liked = false; // un-like if disliked
        }
      }
    },
    addFeedbackToMessage(state, action) {
      state.activeConversation.feedback.responses.push(action.payload);
    },
    finishConversation(state, action) {
      state.activeConversation.feedback = action.payload;
      state.activeConversation.isFinished = true;
      let isExistingConversation = state.conversations.find(item => item.id === state.activeConversation.id);
      if (!isExistingConversation) state.conversations.unshift(state.activeConversation);
    },
    saveConversation(state) {
      let isExistingConversation = state.conversations.find(item => item.id === state.activeConversation.id);
      if (!isExistingConversation) state.conversations.unshift(state.activeConversation);
    },
    setConversations(state, action) {
      state.conversations = action.payload;
    },
    setActiveConversation(state, action) {
      state.activeConversation = action.payload;
    },
    startNewConversation(state) {
      state.activeConversation = {
        id: `conv_${Date.now()}`,
        messages: [],
        feedback: {
          responses: [],
          overallRating: null,
          subjectiveFeedback: ''
        },
        isFinished: false
      };
    }
  }
});

export const {
  addUserMessage,
  addAiResponse,
  addFeedbackToMessage,
  finishConversation,
  setConversations,
  setActiveConversation,
  startNewConversation,
  likeMessage,
  dislikeMessage,
  saveConversation
} = conversationSlice.actions;

export default conversationSlice.reducer;