import React from 'react';
import styles from './chat_message.module.css';
import type Message from '@/types/message.type';

interface ChatMessageProps extends React.PropsWithChildren {
  message: Message;
}

const ChatMessage = (props: ChatMessageProps): JSX.Element => {
  return (
    <div
      className={`${
        props.message.role === 'user'
          ? styles.user_message
          : styles.assistant_message
      } flex`}
    >
      <div className='w-3/4 rounded-lg px-6 pt-6 pb-8 mb-4 ring-1 ring-slate-900/5 shadow-xl'>
        <p>{props.message.content}</p>
      </div>
    </div>
  );
};

export default ChatMessage;
