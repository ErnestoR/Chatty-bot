import { prisma } from '../src/server/db';

async function main() {
  const defaultUser = await prisma.user.upsert({
    where: {
      id: 'cle8zst2e0230ypfn3pew738s',
    },
    create: {
      id: 'cle8zst2e0230ypfn3pew738s',
      name: 'John Doe',
      email: 'john@mail.com',
      password: 'qwer1234',
    },
    update: {},
  });

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  await prisma.chat.upsert({
    where: {
      id: 'clef9a8y33401ypctjma6uv3j',
    },
    create: {
      id: 'clef9a8y33401ypctjma6uv3j',
      userId: defaultUser.id,
      messages: {
        create: [
          {
            message: 'What have you been up to?',
            isBot: false,
          },
          {
            message: 'Watching old movies.',
            isBot: true,
          },

          {
            message: 'Did you watch anything interesting?',
            isBot: false,
          },
          {
            message: 'Yes, I watched Casablanca. It was really great!',
            isBot: true,
          },
        ],
      },
    },
    update: {},
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
