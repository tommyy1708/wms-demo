import React from 'react';

const ReadMessageContent = React.createContext({
  messages: [],
  setMessages: () => {},
  fetchMessages: () => {},
});

export default ReadMessageContent;