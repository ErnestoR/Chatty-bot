import type { GetServerSideProps } from 'next';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { getServerAuthSession } from 'server/auth';
import NavBar from 'components/NavBar';
import Label from 'components/Label';
import Input from 'components/Input';
import { api } from 'utils/api';
import { user } from 'server/api/routers/user';

import UserForm from './UserForm';

const navigationLinks = [{ name: 'Chat', href: '/chat' }];

const dropdownNavigation = [
  { name: 'Your Profile', href: '/me' },
  { name: 'Sign out', href: '/auth/signout' },
];

type ChatPageProps = {
  sessionUser: {
    id: string;
    name: string;
    email: string;
  };
};

const ChatPage = (props: ChatPageProps) => {
  const { sessionUser } = props;
  const { data, isLoading, error } = api.user.getUserById.useQuery(
    sessionUser?.id,
  );

  return (
    <NavBar
      navLinks={navigationLinks}
      dropdownLinks={dropdownNavigation}
      sessionUser={sessionUser}
    >
      <main className="relative ">
        <div className=" mx-auto max-w-screen-xl pb-6 pt-8 sm:px-6 lg:px-8 lg:pb-16">
          <h1 className="mb-4 ml-4 text-2xl font-bold tracking-tight text-gray-800 sm:ml-6 sm:text-3xl">
            Profile
          </h1>
          <div className="overflow-hidden rounded-lg bg-white shadow">
            <div className="divide-y divide-gray-200  lg:divide-y-0 lg:divide-x">
              {error ? (
                <div className="flex h-32 w-full flex-col items-center justify-center ">
                  <div className="text-lg text-indigo-900 ">
                    {error.message} :(
                  </div>
                  <div className="text-gray-400">
                    please reload page or contact admin
                  </div>
                </div>
              ) : isLoading ? (
                'Loading...'
              ) : (
                <UserForm user={data?.result as unknown as undefined} />
              )}
            </div>
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
