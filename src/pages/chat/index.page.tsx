/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access */
// TODO fix eslint errors above

import type { GetServerSideProps } from 'next';
import { HiOutlineUser } from 'react-icons/hi2';
import { AiOutlineRobot } from 'react-icons/ai';
import type { Messages } from '@prisma/client';
import clsx from 'clsx';

import { getServerAuthSession } from 'server/auth';
import NavBar from 'components/NavBar';
import { api } from 'utils/api';

const navigationLinks = [{ name: 'Chat', href: '/chat' }];

const dropdownNavigation = [
  { name: 'Your Profile', href: '/me' },
  { name: 'Sign out', href: '/auth/signout' },
];

type ChatPageProps = {
  sessionUser: {
    name: string;
    email: string;
  };
};

const ChatPage = (props: ChatPageProps) => {
  const { sessionUser } = props;
  const { data, isLoading } = api.chat.getMessages.useQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const messages = data?.result.messages as Array<Messages>;

  return (
    <NavBar
      navLinks={navigationLinks}
      dropdownLinks={dropdownNavigation}
      sessionUser={sessionUser}
    >
      <main>
        <div className="mx-auto max-w-screen-xl pb-6 pt-8 sm:px-6 lg:px-8 lg:pb-16">
          <h1 className="mb-4 ml-4 text-2xl font-bold tracking-tight text-gray-800 sm:ml-2 sm:text-3xl">
            Chat
          </h1>
          <div className="min-h-[200px] overflow-hidden rounded-lg bg-white p-4 shadow">
            {messages.map((message: Messages) => (
              <div
                key={message.id}
                className={clsx(
                  'chat',

                  !message.isBot ? 'chat-start' : 'chat-end',
                )}
              >
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full">
                    {message.isBot ? (
                      <AiOutlineRobot className="h-10 w-10" />
                    ) : (
                      <HiOutlineUser className="h-10 w-10" />
                    )}
                  </div>
                </div>
                <div className="chat-header">
                  {message.isBot ? 'Chatty bot' : 'You'}
                  <time className="ml-2 text-xs opacity-50">
                    {new Date(message.createdAt).toLocaleTimeString()}
                  </time>
                </div>
                <div
                  className={clsx('chat-bubble', {
                    'chat-bubble-secondary': message.isBot,
                  })}
                >
                  {message.message}
                </div>
              </div>
            ))}

            <form>
              <input
                type="text"
                className="input-bordered input-primary input mt-8 w-full rounded"
              />
            </form>
          </div>
        </div>
      </main>
    </NavBar>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerAuthSession(ctx);

  return {
    props: {
      sessionUser: session?.user,
    },
  };
};

export default ChatPage;
