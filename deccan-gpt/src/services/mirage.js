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
          "Hello! How can I help you today?",
          "Sure! Here's something interesting.",
          "That's a great question!",
          "Let me check on that for you!"
        ];

        if (Math.random() < 0.6) {
          return new Response(500, {}, { error: "AI model failed to respond." });
        }

        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        return { response: randomResponse };
      });

      // POST /save-conversation
      this.post('/save-conversation', (schema, request) => {
        const attrs = JSON.parse(request.requestBody);
        const { id } = attrs;
        const existingConversation = schema.db.conversations.find(id);

        if (existingConversation) {
          // Update existing
          schema.db.conversations.update(id, attrs);
          return { message: 'Conversation updated successfully', conversation: schema.db.conversations.find(id) };
        } else {
          schema.db.conversations.insert(attrs);
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