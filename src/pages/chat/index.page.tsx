import { useSession } from 'next-auth/react';

const ChatPage = () => {
  const { data: sessionData } = useSession();

  console.log({ sessionData });

  return (
    <div>
      <h1>Chat Page</h1>
    </div>
  );
};

export default ChatPage;
