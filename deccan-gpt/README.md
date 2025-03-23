# Deccan GPT

Deccan GPT is a React project created with Vite. It uses Mirage JS for mocking APIs, which is enabled in both development and production environments.

Hosted the app on Vercel. Click to check it out in action -> https://deccan-gpt.vercel.app/

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


