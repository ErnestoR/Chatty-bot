import { signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const SignoutPage = () => {
  const router = useRouter();

  useEffect(() => {
    void signOut({
      redirect: false,
    }).then(() => {
      void router.push('/');
    });
  }, [router]);

  return (
    <main className="flex min-h-screen flex-col justify-center bg-gradient-to-b from-indigo-100 to-indigo-500">
      <h1>Signing out...</h1>
    </main>
  );
};

export default SignoutPage;
