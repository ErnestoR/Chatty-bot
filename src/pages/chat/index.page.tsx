import type { GetServerSideProps } from 'next';

import { getServerAuthSession } from 'server/auth';
import NavBar from 'components/NavBar';

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

  return (
    <NavBar
      navLinks={navigationLinks}
      dropdownLinks={dropdownNavigation}
      sessionUser={sessionUser}
    >
      chat page
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
