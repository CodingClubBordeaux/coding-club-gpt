import { useCallback } from 'react';
import type { ChatMessage } from './useChatMessages';

const OPENAI_COMPLETIONS_ENDPONT = 'https://api.openai.com/v1/chat/completions';

export type GenerateMessageOptions = {
  messages: ChatMessage[];
  systemMessage?: string;
  temperature?: number;
  frequencyPenalty?: number;
  presencePenalty?: number;
};

type OpenAIMessage = {
  role: 'user' | 'assistant' | 'system';
  content: string;
};

type OpenAICompletionOptions = {
  model: 'gpt-3.5-turbo';
  messages: OpenAIMessage[];
  max_tokens?: number;
  temperature?: number;
  frequencyPenalty?: number;
  presencePenalty?: number;
};

type OpenAICompletionResponse = {
  choices: {
    message: OpenAIMessage;
    finish_reason: string;
  }[];
};

const generateOpenAIMessage = async (
  apiKey: string,
  { messages, systemMessage, ...options }: GenerateMessageOptions,
) => {
  const formattedSystemMessage =
    systemMessage &&
    ({
      role: 'system',
      content: systemMessage,
    } satisfies OpenAIMessage);

  const formattedUserMessages = messages.map(
    ({ author, content }) =>
      ({
        role: author === 'user' ? 'user' : 'assistant',
        content,
      }) satisfies OpenAIMessage,
  );

  const response = await fetch(OPENAI_COMPLETIONS_ENDPONT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      messages: [formattedSystemMessage, ...formattedUserMessages].filter(
        Boolean,
      ),
      model: 'gpt-3.5-turbo',
      ...options,
    } satisfies OpenAICompletionOptions),
  });

  const completion = (await response.json()) as OpenAICompletionResponse;
  return completion.choices[0].message.content;
};

export const useGpt = (apiKey: string) => {
  const generateMessage = useCallback(
    (options: GenerateMessageOptions) => generateOpenAIMessage(apiKey, options),
    [apiKey],
  );

  return { generateMessage };
};
