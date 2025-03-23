import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ChatPage from './pages/ChatPage';
import SharedConversationPage from './pages/SharedConversationPage';
import FeedbackOverviewPage from './pages/FeedbackOverviewPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ChatPage />} />
        <Route path="/shared-conversation/:id" element={<SharedConversationPage />} />
        <Route path="/feedback-overview" element={<FeedbackOverviewPage />} />
      </Routes>
    </Router>
  );
};

export default App
