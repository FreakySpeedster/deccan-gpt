import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ChatPage from './pages/ChatPage';
import SharedConversationPage from './pages/SharedConversationPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ChatPage />} />
        <Route path="/shared-conversation/:id" element={<SharedConversationPage />} />
      </Routes>
    </Router>
  );
};

export default App
