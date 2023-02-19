/* eslint-disable @next/next/no-img-element */
import type { GetServerSideProps } from 'next';
import { type NextPage } from 'next';
import Head from 'next/head';

import { getServerAuthSession } from 'server/auth';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Chatty</title>
        <meta name="description" content="Chatty App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col justify-center bg-gradient-to-b from-indigo-100 to-indigo-500" />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerAuthSession(ctx);

  if (!session) {
    return {
      redirect: {
        destination: '/auth/signin',
        permanent: false,
      },
    };
  }

  return {
    redirect: {
      destination: '/chat',
      permanent: false,
    },
  };
};

export default Home;
