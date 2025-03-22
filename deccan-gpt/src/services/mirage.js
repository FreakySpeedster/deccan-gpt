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
          { id: 'conv_1', title: 'How to use cook Dum Biriyani?' },
          { id: 'conv_2', title: 'Explain Hoisting' },
          { id: 'conv_3', title: 'Workouts for flat abs' },
          { id: 'conv_4', title: 'Productivity Hacks' },
          { id: 'conv_5', title: 'Nutrition Tips' }
        ];
      });
      
      // GET /conversations/:id
      this.get('/conversations/:id', (schema, request) => {
        const id = request.params.id;
      
        const messages = [
          { id: 'msg_1', role: 'user', content: 'Hello AI!' },
          { id: 'msg_2', role: 'ai', content: 'Hi there! How can I assist you today?' },
        
          { id: 'msg_3', role: 'user', content: 'Can you explain what machine learning is?' },
          { id: 'msg_4', role: 'ai', content: 'Absolutely! Machine learning is a branch of artificial intelligence where computers learn from data without being explicitly programmed.' },
        
          { id: 'msg_5', role: 'user', content: 'That sounds cool! How does it work?' },
          { id: 'msg_6', role: 'ai', content: 'It works by feeding data into algorithms that identify patterns and make decisions based on those patterns. Over time, the system improves its predictions or classifications.' },
        
          { id: 'msg_7', role: 'user', content: 'Interesting! Can you give me an example?' },
          { id: 'msg_8', role: 'ai', content: 'Sure! A common example is email spam filtering. The system learns to recognize spam emails by analyzing thousands of examples and detecting common traits.' },
        
          { id: 'msg_9', role: 'user', content: 'That makes sense. Do you know any good jokes?' },
          { id: 'msg_10', role: 'ai', content: 'Of course! Why did the scarecrow win an award? Because he was outstanding in his field!' },
        
          { id: 'msg_11', role: 'user', content: 'Haha! Got another one?' },
          { id: 'msg_12', role: 'ai', content: 'Sure! Why can’t your nose be 12 inches long? Because then it would be a foot!' },
        
          { id: 'msg_13', role: 'user', content: 'Lol, you’re hilarious. Can you help me write a short poem?' },
          { id: 'msg_14', role: 'ai', content: 'Certainly! Here’s a short poem:\n\nIn the sky so high and blue,\nDreams take flight and hopes renew.\nWith each dawn, a chance to start,\nCarry courage in your heart.' },
        
          { id: 'msg_15', role: 'user', content: 'That’s beautiful! Thank you.' },
          { id: 'msg_16', role: 'ai', content: 'You’re welcome! I’m glad you liked it. Let me know if you need anything else!' },
        
          { id: 'msg_17', role: 'user', content: 'Can you remind me what machine learning is again?' },
          { id: 'msg_18', role: 'ai', content: 'Sure! Machine learning is a way for computers to learn from data and improve their performance on tasks without being explicitly programmed for each task.' },
        
          { id: 'msg_19', role: 'user', content: 'Thanks for the refresher!' },
          { id: 'msg_20', role: 'ai', content: 'Anytime! Feel free to ask me anything else.' }
        ];
      
        const feedbackOptions = [
          { overallRating: 5, subjectiveFeedback: 'Very helpful!' },
          { overallRating: 4, subjectiveFeedback: 'Good, but can be better.' },
          { overallRating: 3, subjectiveFeedback: 'Average experience.' },
          { overallRating: 2, subjectiveFeedback: 'Not very helpful.' },
          { overallRating: 1, subjectiveFeedback: 'Bad experience.' }
        ];
        const isFinished = Math.random() < 0.5;

        const feedback = isFinished ? feedbackOptions[Math.floor(Math.random() * feedbackOptions.length)] : {};
        return {
          id,
          messages,
          feedback,
          isFinished
        };
      });
    }
  });
}