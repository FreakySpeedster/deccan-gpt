export const getConversations = async () => {
    const response = await fetch('/api/conversations');
    return response.json();
  };
  
  export const postConversation = async (conversation) => {
    const response = await fetch('/api/save-conversation', {
      method: 'POST',
      body: JSON.stringify(conversation),
      headers: { 'Content-Type': 'application/json' }
    });
    return response.json();
  };
  
  export const postUserMessage = async (message) => {
    const response = await fetch('/api/chat', {
      method: 'POST',
      body: JSON.stringify({ message }),
      headers: { 'Content-Type': 'application/json' }
    });
    return response;
  };
  
  export const getConversationById = async (id) => {
    const response = await fetch(`/api/conversations/${id}`);
    return response.json();
  };
