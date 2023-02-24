# Chatty bot

OpenAI chat app

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

- [Next.js](https://nextjs.org)
- [NextAuth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)

### Additional libraries

- [openai-api](https://platform.openai.com/) - OpenAI API
- [headlessui/react](https://headlessui.dev/react) - accessible UI components
- [react-hook-form](https://react-hook-form.com) - frontend form validation
- [react-toastify](https://fkhadra.github.io/react-toastify) - toast notifications
- [@formkit/auto-animate](https://github.com/formkit/auto-animate) - simple enter/exit animations
- [daisyui](https://daisyui.com) - Tailwind CSS chat UI components
- [react-icons](https://react-icons.github.io/react-icons) - icons
- [@mantine/hooks](https://mantine.dev/hooks/use-click-outside/) - scroll to element hook
- [tsx](https://github.com/esbuild-kit/tsx) - typescript runner for db seed
- [eslint-plugin-import](https://github.com/import-js/eslint-plugin-import) - eslint plugin for import sorting

## Getting Started

1. First, clone the repo:

   ```bash
   git clone git@github.com:ErnestoR/Chatty-bot.git

   cd Chatty-bot
   ```

2. Then, install the dependencies:

   ```bash
   yarn
   ```

3. Create a `.env.local` file and add the following:

   ```bash
   NEXTAUTH_SECRET="YOUR_SECRET"
   CHATGPT3_API_KEY="YOUR_API_KEY"
   ```

   CHATGPT3_API_KEY needs to be obtained from [OpenAI](https://platform.openai.com/)

4. Generate the Prisma client:

   ```bash
   yarn prisma generate
   ```

5. Optionally, you can seed the database with some dummy data:

   ```bash
   yarn prisma db seed
   ```

6. Finally, run the development server:

   ```bash
   yarn dev
   ```

7. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
8. Log in with the following credentials: (these are the credentials for the seeded user)

   ```bash
    email: john@mail.com
    password: adminadmin

    yeah I know, not very secure 😅
    note to self: use a hash/crypto library to hash the password before storing it in the db
   ```
