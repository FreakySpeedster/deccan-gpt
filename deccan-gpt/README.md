# Leo GPT

Leo GPT is a React project created with Vite. It uses Mirage JS for mocking APIs, which is enabled in both development and production environments.

Hosted the app on Vercel. Click to check it out in action -> https://leo-gpt-ai.vercel.app/

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/FreakySpeedster/deccan-gpt.git
   cd deccan-gpt

2. To install the project dependencies, run:

```bash
npm install
```

3. Create a .env file in the root and add the below variable

```
VITE_ENABLE_MIRAGE=true
```

## Usage

To start the development server, run:

```bash
npm run dev
```

To build the project for production, run:

```bash
npm run build
```

To preview the production build, run:

```bash
npm run preview
```

## Mirage JS

Mirage JS is used to mock APIs. It is enabled based on the environment variable `VITE_ENABLE_MIRAGE`. To enable Mirage JS, set the environment variable in your `.env` file:

```
VITE_ENABLE_MIRAGE=true
```

# 📝 Functional Document  
**Project Name**: AI Chat Feedback System  
**Version**: 1.0  
**Prepared By**: Sridhar Murali 
**Date**: 23rd March

---

## ✅ Overview  
This application allows users to have a chat-based conversation with an AI (mocked response). It supports providing feedback, managing conversations, reviewing past interactions and feedbacks.

---

## ✅ Core User Actions and Behaviors

### 1. Start a New Conversation
- **Behavior**:  
  - On opening the app or clicking **"New Conversation/ Add Button"** in the sidebar, the user sees an empty chat screen with suggested prompts.

---

### 2. Send a Message to the AI
- **Action**:  
  - User types a message in the input field.
  - On pressing **Enter** or clicking the **Send** button, the message is sent.
- **Behavior**:  
  - The message appears in the chat UI immediately.
  - A mocked AI response is fetched and displayed below the user message.

---

### 3. AI Response Feedback (Thumbs Up/Down)
- **Action**:  
  - User hovers over any AI response.
- **Behavior**:  
  - Feedback icons (**Thumbs Up & Thumbs Down**) become visible.
  - Clicking one of these records the feedback for that AI message.

---

### 4. End a Conversation & Provide Final Feedback
- **Action**:  
  - User clicks an **"End Conversation"** button.
- **Behavior**:  
  - A feedback modal appears where the user can:
    - Rate the conversation (1-5 stars).
    - Provide subjective written feedback.
  - On submit:
    - The conversation and feedback are saved (mock API call).

---

### 5. Access Past Conversations
- **Action**:  
  - User clicks on any listed past conversation from the **sidebar**
- **Behavior**:  
  - Loads the selected conversation.
  - Displays all exchanged messages and previously provided feedback.

---

### 6. Share a Conversation
- **Action**:  
  - User clicks a **"Share"** button.
- **Behavior**:  
  - Generates a unique shareable link (mocked).
  - User can copy the link to share externally.
  - PS: Links will load in local. Not loading in Production
---

### 7. Feedback Overview Page
- **Action**:  
  - User navigates to the **Feedback Overview** section.
- **Behavior**:  
  - Displays all feedback across conversations in a table.
  - Supports sorting and filtering by rating.

---

## ✅ Application Behaviors

| **User Action**                | **App Behavior**                                            |
|--------------------------------|-------------------------------------------------------------|
| Send message                   | Displays message & fetches AI response                      |
| Hover AI response              | Shows thumbs up/down feedback buttons                      |
| End conversation               | Triggers feedback modal for rating + subjective input       |
| Access previous conversations  | Loads past conversations and associated feedback            |
| Share conversation             | Generates and copies shareable link (mocked)                |
| View Feedback Overview         | Displays sortable, filterable feedback data                 |

---

## ✅ Not Implemented (Optional Features)
- Dark Mode Toggle  
- AI error handling with retry  
- Text formatting support in chat (bold/italic shortcuts)

---

## ✅ Technical Stack
- **Frontend**: ReactJS (Vite)  
- **State Management**: Redux Toolkit  
- **Styling**: Material UI (MUI)  
- **Mock API**: MirageJS (enabled via `VITE_ENABLE_MIRAGE` flag)

---

## 🤔 Technical Choices, Design Decisions and Tradeoffs

### 1. **MirageJS**:
🛠️ Used to mock backend APIs without depending on actual backend development or network conditions. Useful for both development and production demos, ensuring the app works as expected, even with mocked responses. The VITE_ENABLE_MIRAGE=true flag adds flexibility in enabling/disabling Mirage.   

### 2. **End Conversation functionality**:

After the user clicks **"End Conversation"**, the input field is hidden, and the user is encouraged to create a **new conversation** instead of continuing the old one.

#### 1. **Encourages Focused, Contextual Interactions**
- **Why it matters**:  
  Ending a conversation sets a **contextual boundary**.
- **Benefit**:  
  Encourages users to **refocus** their questions or discussions in a new, relevant session rather than cluttering old conversations with unrelated messages.

#### 2. **Improves Organization**
- **Why it matters**:  
  Each conversation is treated as an **independent unit**.
- **Benefit**:  
  Makes it easier to **organize, retrieve, and check back** conversations later. Useful for **feedback analytics** and **training data** separation.

#### 3. **[Technical] Simplifies State Management**
- **Why it matters**:  
  There’s no need to track whether the AI should still be “in context” after a session ends.
- **Benefit**:  
  Cleaner **frontend logic** and **context management**—no accidental mixing of old/new contexts.

## ⭐ Features left out that should be considered immediately
- **Autofill input from suggestions in New Conversation**
- **Do not force user for feedback to end conversation. Have a skip button in Feedback Modal**
- **Error handling and retry options**
- **Support for markdown and formatting in input field**
- **Rename conversations in list to find easily and have clear organised chats**
- **Support for Searching conversations in Sidebar**
- **Make Sidebar collapsible**
- **Dark Theme Support**

