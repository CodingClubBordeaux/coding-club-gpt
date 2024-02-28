import { useState } from 'react';

export type ChatMessage = {
  author: 'user' | 'bot';
  content: string;
};

export const useChatMessages = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const addMessage = (message: ChatMessage) => {
    let newMessages: ChatMessage[] = [];

    setMessages((prevMessages) => {
      newMessages = [...prevMessages, message]; // this is really hacky, don't do it in real code
      return newMessages;
    });

    return newMessages;
  };

  return {
    messages,
    addMessage,
  };
};
