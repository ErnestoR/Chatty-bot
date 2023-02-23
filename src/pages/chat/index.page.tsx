import type { GetServerSideProps } from 'next';
import type { Messages } from '@prisma/client';

import { getServerAuthSession } from 'server/auth';
import NavBar from 'components/NavBar';
import { api } from 'utils/api';

import ChatCard from './ChatCard';

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

  const messages = data?.result.messages as Array<Messages>;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <NavBar
      navLinks={navigationLinks}
      dropdownLinks={dropdownNavigation}
      sessionUser={sessionUser}
    >
      <main>
        <div className="mx-auto flex max-w-screen-xl flex-col pb-6 pt-8 sm:px-6 lg:px-8 lg:pb-16">
          <h1 className="mb-4 ml-4 text-2xl font-bold tracking-tight text-gray-800 sm:ml-2 sm:text-3xl">
            Chat
          </h1>
          {/* <div className="min-h-[200px] overflow-hidden rounded-lg bg-white p-4 shadow"></div> */}

          <ChatCard messages={messages} />
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
