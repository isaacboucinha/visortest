import { useState, useEffect } from 'react';
import type { MouseEvent, KeyboardEvent } from 'react';

import styles from './chat.module.css';

import { useAuth } from '@/contexts/auth.context';

import type Conversation from '@/types/conversation.type';

import * as client from '@/services/client.service';
import ConversationSidebarEntry from '@/components/conversation_sidebar_entry/conversation_sidebar_entry.component';
import ChatMessage from '@/components/chat_message/chat_message.component';

export default function Chat(): JSX.Element {
  const { user, userHasBeenSet, isAuthenticated, tryGetCurrentUser, logout } =
    useAuth();

  // const [loading, setLoading] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [firstMessageHasBeenSent, setFirstUserMessageHasBeenSent] =
    useState<boolean>(false);

  // urgent TODO change class's function so that conversation ids aren't exposed
  const [currentConversation, setCurrentConversation] =
    useState<Conversation | null>(null);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [botIsWritingMessage, setBotIsWritingMessage] =
    useState<boolean>(false);

  useEffect(() => {
    if (isAuthenticated !== undefined) {
      if (isAuthenticated) return;
    }

    // setLoading(true);
    // try to login
    tryGetCurrentUser()
      .then((success) => {
        if (success) return;

        window.location.pathname = '/';
      })
      .finally(() => {
        // setLoading(false);
      });
  }, [user, userHasBeenSet, isAuthenticated, tryGetCurrentUser]);

  useEffect(() => {
    if (user !== null && user !== undefined) {
      // load user conversations
      client
        .getConversations()
        .then((conversations) => {
          setConversations(conversations);
        })
        .catch((err) => {
          throw new Error(err);
        });
    }
  }, [user]);

  const logoutUser = (event: MouseEvent<HTMLElement>): void => {
    event.preventDefault();
    // setLoading(true);
    // try to login
    logout()
      .then((success) => {
        if (!success) return;

        window.location.pathname = '/';
      })
      .finally(() => {
        // setLoading(false);
      });
  };

  const startNewConversation = (event: MouseEvent<HTMLElement>): void => {
    event.preventDefault();
    // setLoading(true);
    setFirstUserMessageHasBeenSent(false);
    setCurrentPrompt('');
    setCurrentConversation(null);
    // setBotIsWritingMessage(false);
  };

  const selectConversation = (
    event: MouseEvent<HTMLElement>,
    conversation: Conversation
  ): void => {
    event.preventDefault();
    if (conversation !== undefined) setCurrentConversation(conversation);
  };

  const handleEnterKeyPress = (
    event: KeyboardEvent<HTMLInputElement>
  ): void => {
    if (event.key === 'Enter') {
      if (currentPrompt !== '') {
        // user pressed enter on his prompt, send the message
        setBotIsWritingMessage(true);

        // first, push the user message into the current conversation
        let conversation: Conversation;
        if (currentConversation !== null) {
          conversation = currentConversation;
        } else {
          // if there's no conversation, create a dummy one
          conversation = {
            createdAt: Date.now.toString(),
            updatedAt: Date.now.toString(),
            messages: []
          };
          conversations.push(conversation);
          setCurrentConversation(conversation);
        }

        // take note that this is a dummy message, real one will be stored in backend
        conversation.messages.push({
          content: currentPrompt,
          role: 'user',
          createdAt: Date.now.toString(),
          updatedAt: Date.now.toString()
        });

        client
          .sendMessage(currentPrompt, currentConversation)
          .then((res) => {
            if (conversation.id === undefined) {
              conversation.id = res?.conversationId;
            }

            setBotIsWritingMessage(false);

            // push the bot response into the conversation
            conversation.messages.push({
              content: res?.content ?? 'Something went wrong with my server',
              role: 'assistant',
              createdAt: Date.now.toString(),
              updatedAt: Date.now.toString()
            });
          })
          .catch((err) => {
            throw new Error(err);
          });

        setFirstUserMessageHasBeenSent(true);
        setCurrentPrompt('');
      }
    }
  };

  return (
    <main
      className={
        'flex min-h-screen flex-col items-center justify-center p-12 py-24'
      }
    >
      <div className='w-3/5 fixed bottom-0 ml-44 mb-14'>
        <div className='flex flex-row justify-between'>
          <label
            htmlFor='user-prompt'
            className='mb-2 text-m font-medium text-gray-900 dark:text-white'
          >
            Please enter your prompt below
          </label>
          {botIsWritingMessage ? (
            <p className='mb-2 text-sm font-medium text-gray-500 dark:text-white'>
              Bot is writing a message...
            </p>
          ) : (
            <></>
          )}
        </div>

        <input
          type='text'
          value={currentPrompt}
          onChange={(e) => {
            setCurrentPrompt(e.target.value);
          }}
          onKeyDown={handleEnterKeyPress}
          id='user-prompt'
          aria-describedby='helper-text-explanation'
          className='bg-gray-50 border border-gray-300 text-gray-900 text-m rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          placeholder={
            firstMessageHasBeenSent
              ? ''
              : 'e.g. "Hello, can you recite to me the first paragraph of the Grapes of Wrath?"'
          }
        />
      </div>
      <aside
        id='default-sidebar'
        className='fixed top-0 left-0 z-40 w-56 h-screen transition-transform -translate-x-full sm:translate-x-0'
        aria-label='Sidebar'
      >
        <div className='h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800'>
          <ul className='space-y-2 font-medium'>
            <li>
              <a
                onClick={logoutUser}
                href='#'
                className='flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
              >
                <svg
                  aria-hidden='true'
                  className='flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fillRule='evenodd'
                    d='M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z'
                    clipRule='evenodd'
                  ></path>
                </svg>
                <span className='flex-1 ml-3 whitespace-nowrap'>Sign Out</span>
              </a>
            </li>
            <li>
              <a
                onClick={startNewConversation}
                href='#'
                className='flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
              >
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
                    d='M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z'
                  />
                </svg>
                <span className='flex-1 ml-3 whitespace-nowrap'>
                  Start new chat
                </span>
              </a>
            </li>
            <hr />
            {conversations.length > 0 ? (
              <p className='text-center pb-3 text-slate-400 text-sm'>
                Past conversations
              </p>
            ) : (
              <></>
            )}
            {conversations.map((conversation, index) => {
              return (
                <div
                  onClick={(e) => {
                    selectConversation(e, conversation);
                  }}
                  key={index}
                >
                  <ConversationSidebarEntry
                    conversation={conversation}
                    highlighted={currentConversation?.id === conversation.id}
                  />
                </div>
              );
            })}
          </ul>
        </div>
      </aside>
      {!firstMessageHasBeenSent && currentConversation === null ? (
        <div
          className={`${styles.greeter} w-3/5 ml-44 text-5xl text-center justify-center`}
        >
          <h1>Hi, how can I help you today?</h1>
        </div>
      ) : (
        <div
          className={`${styles.chat_container} fixed top-0 right-0 h-5/6 sm:ml-32 flex flex-col p-6 py-12`}
        >
          {currentConversation?.messages
            .sort((x, y) => {
              return Date.parse(x.createdAt) - Date.parse(y.createdAt);
            })
            .map((message, index) => {
              return (
                <div key={index}>
                  <ChatMessage message={message} />
                </div>
              );
            })}
        </div>
      )}
    </main>
  );
}
