export default [
  {
    id: 'conv_1',
    messages: [
      { id: 'msg_1', role: 'user', content: 'Hello AI!' },
      { id: 'msg_2', role: 'ai', content: 'Hi there! How can I assist you today?' },
      { id: 'msg_3', role: 'user', content: 'Can you explain what machine learning is?' },
      { id: 'msg_4', role: 'ai', content: 'Absolutely! Machine learning is a branch of artificial intelligence where computers learn from data without being explicitly programmed.' },
      { id: 'msg_5', role: 'user', content: 'That sounds cool! How does it work?' },
      { id: 'msg_6', role: 'ai', content: 'It works by feeding data into algorithms that identify patterns and make decisions based on those patterns. Over time, the system improves its predictions or classifications.' },
      { id: 'msg_7', role: 'user', content: 'Can you give me a real-world example?' },
      { id: 'msg_8', role: 'ai', content: 'Sure! One common example is spam email filtering. The system learns to identify spam messages based on patterns in the data, such as specific words or the sender\'s reputation. As it processes more emails, it becomes better at accurately classifying messages as spam or legitimate.' },
      { id: 'msg_9', role: 'user', content: 'Wow, that makes sense! Are there different types of machine learning?' },
      { id: 'msg_10', role: 'ai', content: 'Yes, there are three main types: supervised learning, unsupervised learning, and reinforcement learning. Supervised learning uses labeled data to teach the model, unsupervised learning finds hidden patterns in data without labels, and reinforcement learning trains models through rewards and penalties based on actions.' }
    ],
    feedback: {
      overallRating: 5,
      subjectiveFeedback: 'Very informative and easy to understand!'
    },
    isFinished: true
  },
  {
    id: 'conv_2',
    messages: [
      { id: 'msg_1', role: 'user', content: 'What’s the weather like today?' },
      { id: 'msg_2', role: 'ai', content: 'It’s sunny and bright today with a high of 25°C!' }
    ],
    feedback: {
      overallRating: 4,
      subjectiveFeedback: 'Accurate, but delayed response.'
    },
    isFinished: true
  },
  {
    id: 'conv_3',
    messages: [
      { id: 'msg_1', role: 'user', content: 'Tell me a joke!' },
      { id: 'msg_2', role: 'ai', content: 'Why did the scarecrow win an award? Because he was outstanding in his field!' },
      { id: 'msg_3', role: 'user', content: 'Haha! Give me another one.' },
      { id: 'msg_4', role: 'ai', content: 'Why don’t scientists trust atoms? Because they make up everything!' },
      { id: 'msg_5', role: 'user', content: 'That’s a good one! How about a programming joke?' },
      { id: 'msg_6', role: 'ai', content: 'Why do programmers prefer dark mode? Because light attracts bugs!' },
      { id: 'msg_7', role: 'user', content: 'I love that. You’re hilarious!' }
    ],
    feedback: {
      overallRating: 4,
      subjectiveFeedback: 'Loved the jokes! Especially the programming one.'
    },
    isFinished: true
  },
  {
    id: 'conv_4',
    messages: [
      { id: 'msg_1', role: 'user', content: 'Can you write me a poem?' },
      { id: 'msg_2', role: 'ai', content: 'Certainly! Here’s a short poem:\n\nIn the sky so high and blue,\nDreams take flight and hopes renew.\nWith each dawn, a chance to start,\nCarry courage in your heart.' },
      { id: 'msg_3', role: 'user', content: 'That’s lovely! Can you make it longer and about finding inner peace?' },
      { id: 'msg_4', role: 'ai', content: 'Of course! Here’s an extended version:\n\nIn quiet moments, peace is found,\nBeyond the noise, a softer sound.\nA gentle breeze, a whispered cheer,\nTo calm the heart and draw it near.\n\nThe river flows, the mountains stand,\nNature’s grace at your command.\nClose your eyes, release your fear,\nLet silence speak, and all is clear.\n\nWithin your soul, a light will glow,\nGuiding you where truth may flow.\nWith every breath, a brand new start,\nFind harmony inside your heart.' },
      { id: 'msg_5', role: 'user', content: 'That’s exactly what I needed. Thank you!' }
    ],
    feedback: {
      overallRating: 5,
      subjectiveFeedback: 'Beautiful and calming. I felt really at peace reading it.'
    },
    isFinished: true
  },
  {
    id: 'conv_5',
    messages: [
      { id: 'msg_1', role: 'user', content: 'Remind me what machine learning is again?' },
      { id: 'msg_2', role: 'ai', content: 'Machine learning is a way for computers to learn from data and improve their performance on tasks without being explicitly programmed for each task.' }
    ],
    feedback: {},
    isFinished: false
  }
];
