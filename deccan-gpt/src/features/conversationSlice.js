import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  conversations: [],
  activeConversation: {
    id: `conv_${Date.now()}`,
    messages: [],
    feedback: {
      responses: [],
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
    },
    addAiResponse(state, action) {
      state.activeConversation.messages.push({
        id: `msg_${Date.now()}`,
        role: 'ai',
        content: action.payload
      });
    },
    addFeedbackToMessage(state, action) {
      state.activeConversation.feedback.responses.push(action.payload);
    },
    finishConversation(state, action) {
      state.activeConversation.feedback = action.payload;
      state.activeConversation.isFinished = true;
      state.conversations.push(state.activeConversation);
    }
  }
});

export const {
  addUserMessage,
  addAiResponse,
  addFeedbackToMessage,
  finishConversation
} = conversationSlice.actions;

export default conversationSlice.reducer;