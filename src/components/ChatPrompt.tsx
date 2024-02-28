import { ArrowPathIcon, PaperAirplaneIcon } from '@heroicons/react/20/solid';
import clsx from 'clsx';
import { useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

export type ChatPromptProps = {
  placeholder?: string;
  generating?: boolean;
  onSend?: (message: string) => void;
};

export const ChatPrompt = ({
  placeholder,
  generating,
  onSend,
}: ChatPromptProps) => {
  const [message, setMessage] = useState('');

  const onMessageKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (message.trim() !== '' && !generating) {
        onSend?.(message);
        setMessage('');
      }
    }
  };

  const onSendClick = () => {
    if (message.trim() !== '' && !generating) {
      onSend?.(message);
      setMessage('');
    }
  };

  return (
    <div className="w-full flex justify-center px-3 pb-5">
      <div className="w-full max-w-3xl py-3.5 px-4 border border-neutral-500/70 focus-within:border-neutral-500 rounded-xl transition">
        <div className="flex items-start gap-3">
          <TextareaAutosize
            className="text-neutral-300 placeholder-neutral-500 bg-transparent w-full resize-none overflow-hidden focus:outline-none"
            placeholder={placeholder ?? 'Envoyer un message ...'}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={onMessageKeyDown}
            id="user-prompt"
            rows={1}
            spellCheck={false}
          />

          <button onClick={onSendClick} className="pt-0.5">
            {generating ? (
              <ArrowPathIcon className="size-5 text-neutral-400 animate-spin" />
            ) : (
              <PaperAirplaneIcon
                className={clsx(
                  'size-5 transition-transform',
                  message.trim().length > 0
                    ? 'text-neutral-300 scale-110 hover:scale-125'
                    : 'text-neutral-500',
                )}
              />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
