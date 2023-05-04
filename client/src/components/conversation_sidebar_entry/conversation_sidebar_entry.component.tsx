import React from 'react';
import styles from './conversation_sidebar_entry.module.css';
import type Conversation from '@/types/conversation.type';

interface ConversationSidebarEntryProps extends React.PropsWithChildren {
  conversation: Conversation;
  highlighted: boolean;
}

const ConversationSidebarEntry = (
  props: ConversationSidebarEntryProps
): JSX.Element => {
  return (
    <li className={`${props.highlighted ? styles.highlighted : ''}`}>
      <a href='#' className='flex items-center p-2'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth='1.5'
          stroke='currentColor'
          className='w-6 h-6'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z'
          />
        </svg>

        <span className='flex-1 ml-3 whitespace-nowrap'>
          {props.conversation.id?.substring(0, 10)}
        </span>
      </a>
    </li>
  );
};

export default ConversationSidebarEntry;
