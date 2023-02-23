import { prisma } from '../src/server/db';

async function main() {
  await prisma.user.upsert({
    where: {
      id: 'cle8zst2e0230ypfn3pew738s',
    },
    create: {
      id: 'cle8zst2e0230ypfn3pew738s',
      name: 'John Doe',
      email: 'john@mail.com',
      password: 'adminadmin',
      chats: {
        create: [
          {
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
