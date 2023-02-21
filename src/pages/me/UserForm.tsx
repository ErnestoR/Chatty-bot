import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';

import Label from 'components/Label';
import Input from 'components/Input';
import { api } from 'utils/api';

type UserFormProps = {
  user?: {
    id: string;
    name: string;
    email: string;
  };
};

const userSchema = z.object({
  id: z.string(),
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

type FormData = z.infer<typeof userSchema>;

const UserForm = (props: UserFormProps) => {
  const { user } = props;
  const { mutate } = api.user.updateUserbyId.useMutation({
    onSuccess: () => {
      toast.success('User updated');
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(userSchema),
    defaultValues: user,
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    mutate(data);
  };

  return (
    <form
      className="w-full divide-y divide-gray-200"
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* Profile section */}
      <div className="py-6 px-4 sm:p-6 lg:pb-8">
        <div>
          <h2 className="text-lg font-medium leading-6 text-gray-900">
            My information
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            This information will be displayed publicly so be careful what you
            share.
          </p>
        </div>

        <div className="mt-6 grid grid-cols-12 gap-6">
          <div className="hidden">
            <Input inputProps={register('id')} />
          </div>

          <Label label="Name" className="col-span-12 sm:col-span-6">
            <Input inputProps={register('name')} error={errors?.name} />
          </Label>
          <Label label="Password" className="col-span-12 sm:col-span-6">
            <Input
              inputProps={{
                ...register('password'),
                type: 'password',
              }}
              error={errors?.password}
            />
          </Label>
          <Label label="Email" className="col-span-12 ">
            <Input
              inputProps={{
                ...register('email'),
                type: 'email',
              }}
              error={errors?.email}
            />
          </Label>
        </div>
      </div>

      <div className="divide-y divide-gray-200">
        <div className="flex justify-end py-4 px-4 sm:px-6">
          <button
            type="submit"
            className="ml-5 inline-flex justify-center rounded-md border border-transparent bg-sky-700 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-sky-800 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  );
};

export default UserForm;
