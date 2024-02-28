import { CpuChipIcon, UserIcon, SparklesIcon } from '@heroicons/react/16/solid';
import { clsx } from 'clsx';
import ScrollToBottom from 'react-scroll-to-bottom';

export type ChatMessageProps = {
  author?: 'user' | 'bot';
  authorName?: string;
  children: React.ReactNode;
};

export const ChatMessage = ({
  author = 'user',
  authorName,
  children,
}: ChatMessageProps) => {
  const displayName = authorName ?? (author === 'user' ? 'You' : 'Bot');
  const avatarColor = author === 'user' ? 'bg-green-600' : 'bg-neutral-500';

  return (
    <div className="max-w-3xl px-8 w-full">
      <div className="flex items-start justify-start gap-3 pb-6">
        <span className={clsx(avatarColor, 'rounded-full p-1 flex')}>
          {author == 'user' && <UserIcon className="size-4" />}
          {author == 'bot' && <CpuChipIcon className="size-4" />}
        </span>

        <div className="flex flex-col gap-1.5">
          <div className="flex gap-2 items-center">
            <span className="font-bold">{displayName}</span>
          </div>

          <div className="whitespace-pre-line">{children}</div>
        </div>
      </div>
    </div>
  );
};

export type ChatMessageGeneratingProps = {
  message?: string;
};

export const ChatMessageGenerating = ({
  message,
}: ChatMessageGeneratingProps) => {
  return (
    <div className="flex items-center gap-2 animate-pulse">
      <SparklesIcon className="size-4 text-neutral-400" />
      <span className="text-neutral-400">
        {message ?? 'Génération en cours...'}
      </span>
    </div>
  );
};

export type ChatMessageListProps = {
  children: React.ReactNode;
};

export const ChatMessageList = ({ children }: ChatMessageListProps) => {
  return (
    <div className="flex-1 overflow-hidden flex">
      <ScrollToBottom
        className="w-full"
        scrollViewClassName="flex flex-col items-center pt-10"
        followButtonClassName="hidden"
      >
        {children}
      </ScrollToBottom>
    </div>
  );
};
