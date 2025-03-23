import { createServer, Response, Model } from 'miragejs';
import conversations from '../fixtures/conversations';
import conversationLists from '../fixtures/conversationLists';


export function makeServer() {
  createServer({
    models: {
      conversationList: Model,
      conversation: Model
    },

    seeds(server) {
      server.db.loadData({
        conversationLists,
        conversations
      });
    },
    routes() {
      this.namespace = 'api';

      // POST /chat: AI responses (60% failure simulation)
      this.post('/chat', (schema, request) => {
        const responses = [
          "Hello! How can I assist you in the best way today?",
          "Great question! Let me provide you with some insightful information.",
          "I'm here to help! What would you like to explore?",
          "Let me think... Here's something that might interest you!",
          "That’s a fascinating topic! Let’s dive deeper into it.",
          "I love curiosity! Here’s an interesting perspective.",
          "Let me analyze that for you and give you the best answer!",
          "You're onto something intriguing! Let's break it down step by step.",
          "That’s a thought-provoking question. Here's what I found!",
          "I appreciate the question! Here's my take on it."
        ];

        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        return { response: randomResponse };
      });

      // POST /save-conversation
      this.post('/save-conversation', (schema, request) => {
        const attrs = JSON.parse(request.requestBody);
        const { id } = attrs;
        const existingConversation = schema.db.conversations.find(id);

        if (existingConversation) {
          // Update existing conversation with feedback data
          schema.db.conversations.update(id, attrs);
          let targetData = schema.db.conversationLists.find(id);
          targetData.feedback = attrs.feedback;
          targetData.isFinished = attrs.isFinished;
          schema.db.conversationLists.update(id, targetData);
          return { message: 'Conversation updated successfully', conversation: schema.db.conversations.find(id) };
        } else {
          schema.db.conversations.insert(attrs);
          schema.db.conversationList.insert(attrs);
          return { message: 'Conversation saved successfully', conversation: schema.db.conversations.find(id) };
        }
      });

      // GET /conversations
      this.get('/conversations', (schema) => {
        return schema.db.conversationLists;
      });
      
      // GET /conversations/:id
      this.get('/conversations/:id', (schema, request) => {
        const id = request.params.id;
        const conversation = schema.db.conversations.find(id);
      
        if (!conversation) {
          return new Response(404, {}, { error: 'Conversation not found' });
        }
      
        return conversation;
      });
    }
  });
}