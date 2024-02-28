/**
 * WARNING
 *
 * This is a subject solution for reference. Please try to do it yourself
 * instead of copying this code.
 */

import { useState } from 'react';
import {
  ChatMessage,
  ChatMessageList,
  ChatMessageGenerating,
  ChatPrompt,
  Layout,
} from './components';
import { useGpt, useChatMessages } from './hooks';

function AppSolved() {
  const { messages, addMessage } = useChatMessages();
  const { generateMessage } = useGpt(
    import.meta.env.VITE_OPENAPI_KEY as string,
  );

  const [isGenerating, setIsGenerating] = useState(false);

  const onMessageGenerated = (message: string) => {
    addMessage({ author: 'bot', content: message });
    setIsGenerating(false);
  };

  const onSendMessage = (content: string) => {
    const newMessages = addMessage({ author: 'user', content });
    setIsGenerating(true);

    generateMessage({
      messages: newMessages,
      systemMessage: 'You are a chatbot named CodingClubBot!',
    }).then(onMessageGenerated);
  };

  return (
    <Layout>
      <ChatMessageList>
        {messages.map((message, index) => (
          <ChatMessage key={index} author={message.author}>
            {message.content}
          </ChatMessage>
        ))}

        {isGenerating && (
          <ChatMessage author="bot">
            <ChatMessageGenerating />
          </ChatMessage>
        )}
      </ChatMessageList>

      <ChatPrompt generating={isGenerating} onSend={onSendMessage} />
    </Layout>
  );
}

export default AppSolved;
