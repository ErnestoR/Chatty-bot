import { zodResolver } from '@hookform/resolvers/zod';
import type { Messages } from '@prisma/client';
import clsx from 'clsx';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { AiOutlineRobot } from 'react-icons/ai';
import { HiOutlineUser } from 'react-icons/hi2';
import * as z from 'zod';
import { useScrollIntoView } from '@mantine/hooks';
import { useEffect } from 'react';

import { api } from 'utils/api';

type ChatCardProps = {
  messages: Array<Messages>;
};

const chatSchema = z.object({
  message: z
    .string({
      required_error: 'Name must be a string',
    })
    .trim()
    .min(1, {
      message: 'Name must be at least 1 characters',
    }),
});

type FormData = z.infer<typeof chatSchema>;

const ChatCard = ({ messages }: ChatCardProps) => {
  const { register, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(chatSchema),
  });
  const { mutate } = api.chat.chatWithBot.useMutation();

  const { scrollIntoView, targetRef, scrollableRef } =
    useScrollIntoView<HTMLDivElement>({
      offset: 60,
    });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
    mutate(data, {
      onSuccess: (response) => {
        console.log(response.result);
      },
    });
  };

  useEffect(() => {
    scrollIntoView({ alignment: 'center' });
  }, [messages, scrollIntoView]);

  return (
    <div className=" flex max-h-[calc(100vh-176px)] flex-1  flex-col rounded-lg bg-white p-4 shadow">
      <div className="overflow-y-scroll " ref={scrollableRef}>
        {messages.map((message: Messages) => (
          <div
            key={message.id}
            className={clsx('chat', !message.isBot ? 'chat-start' : 'chat-end')}
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
        <div ref={targetRef} className="h-1" />
      </div>

      <form className="h-20" onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register('message')}
          type="text"
          className="input-bordered input-primary input mt-8 w-full rounded"
          onFocus={() => {
            scrollIntoView({ alignment: 'center' });
          }}
        />
      </form>
    </div>
  );
};

export default ChatCard;
