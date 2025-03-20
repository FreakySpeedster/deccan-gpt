import { createServer, Response } from 'miragejs';

export function makeServer() {
  createServer({
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
        const conversation = JSON.parse(request.requestBody);
        console.log('Saving conversation:', conversation);
        return { message: 'Conversation saved successfully!' };
      });

      // GET /conversations
      this.get('/conversations', () => {
        return [
          { id: 'conv_1', title: 'Chat Session 1', rating: 5 },
          { id: 'conv_2', title: 'Chat Session 2', rating: 4 }
        ];
      });

      // GET /conversations/:id
      this.get('/conversations/:id', (schema, request) => {
        const id = request.params.id;
        return {
          id,
          messages: [
            { id: 'msg_1', role: 'user', content: 'Hello AI!' },
            { id: 'msg_2', role: 'ai', content: 'Hi there! How can I help?' }
          ],
          feedback: {
            overallRating: 5,
            subjectiveFeedback: 'Very helpful!'
          }
        };
      });
    }
  });
}