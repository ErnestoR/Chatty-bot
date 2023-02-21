/* eslint-disable @next/next/no-img-element */
import { type NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import Input from 'components/Input';
import Label from 'components/Label';

const sigupSchema = z.object({
  name: z
    .string({
      required_error: 'Name must be a string',
    })
    .trim()
    .min(4, {
      message: 'Name must be at least 4 characters',
    }),
  password: z.string().trim().min(8),
  email: z.string().trim().email(),
});

type FormData = z.infer<typeof sigupSchema>;

const Signup: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(sigupSchema),
  });

  const onSubmit: SubmitHandler<FormData> = (data) => console.log(data);

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
              Create a new account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Or{' '}
              <Link
                href="/"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Already have an account? Sign in!
              </Link>
            </p>
          </div>

          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
              <form
                className="flex flex-col gap-4"
                onSubmit={handleSubmit(onSubmit)}
              >
                <Label label="Name">
                  <Input inputProps={register('name')} error={errors?.name} />
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
                <Label label="Email">
                  <Input
                    inputProps={{
                      ...register('email'),
                      type: 'email',
                    }}
                    error={errors?.email}
                  />
                </Label>

                <div className="pt-6">
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Create Account
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

export default Signup;
