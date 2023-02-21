/* eslint-disable @next/next/no-img-element */
import { type NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import type { SignInResponse } from 'next-auth/react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import type { GetServerSideProps } from 'next';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useState } from 'react';
import { useAutoAnimate } from '@formkit/auto-animate/react';

import { getServerAuthSession } from 'server/auth';
import Label from 'components/Label';
import Input from 'components/Input';

const sigupSchema = z.object({
  password: z.string().trim().min(8),
  email: z.string().trim().email(),
});

type FormData = z.infer<typeof sigupSchema>;

const Home: NextPage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(sigupSchema),
  });
  const [hasLoginErrors, setHasLoginErrors] = useState<boolean>(false);
  const [parent] = useAutoAnimate();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    signIn('credentials', {
      ...data,
      redirect: false,
    })
      .then(async (response) => {
        const { error } = response as SignInResponse;

        if (error) {
          // TODO: handle error
          setHasLoginErrors(true);
          return;
        }

        const { callbackUrl } = router.query;

        if (callbackUrl) {
          //this is the url that you want to redirect if callbackUrl exists
          await router.push(callbackUrl as string);
        } else {
          await router.push('/chat');
        }
      })
      .catch((err) => {
        // TODO: handle error
        console.log(err);
      });
  };

  return (
    <>
      <Head>
        <title>Chatty</title>
        <meta name="description" content="Chatty App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col justify-center bg-gradient-to-b from-indigo-100 to-indigo-500">
        <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            />
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Sign in to your account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Or{' '}
              <Link
                href="/auth/signup"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Create a new account
              </Link>
            </p>
          </div>

          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
              <form
                className="flex flex-col gap-6 "
                onSubmit={handleSubmit(onSubmit)}
                ref={parent}
              >
                <Label label="Email">
                  <Input
                    inputProps={{
                      ...register('email'),
                      type: 'email',
                    }}
                    error={errors?.email}
                  />
                </Label>

                <Label label="Password">
                  <Input
                    inputProps={{
                      ...register('password'),
                      type: 'password',
                    }}
                    error={errors?.password}
                  />
                </Label>

                {hasLoginErrors && (
                  <div className="text-red-500">
                    Invalid email or password! Please try again.
                  </div>
                )}

                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Sign in
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerAuthSession(ctx);

  if (session) {
    return {
      redirect: {
        destination: '/chat',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
