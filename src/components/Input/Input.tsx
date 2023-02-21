import { ExclamationCircleIcon } from '@heroicons/react/20/solid';
import type { FieldError } from 'react-hook-form';
import clsx from 'clsx';
import { useAutoAnimate } from '@formkit/auto-animate/react';

type InputProps = {
  inputProps: React.InputHTMLAttributes<HTMLInputElement>;
  error?: FieldError;
};

const Input = ({ inputProps, error }: InputProps) => {
  const { id = '' } = inputProps;
  const [parent] = useAutoAnimate();

  return (
    <div ref={parent}>
      <div className="relative mt-1 rounded-md shadow-sm">
        <input
          {...inputProps}
          className={clsx(
            'block w-full appearance-none rounded-md border py-2 px-3 shadow-sm focus:outline-none sm:text-sm',
            error
              ? 'border-red-300 pr-10 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500'
              : 'border-gray-300 placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500',
          )}
          {...{
            ...(error
              ? {
                  'aria-invalid': true,
                  'aria-describedby': `${id}-error`,
                }
              : {}),
          }}
        />
        {error && (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <ExclamationCircleIcon
              className="h-5 w-5 text-red-500"
              aria-hidden="true"
            />
          </div>
        )}
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-600" id="email-error">
          {error?.message}
        </p>
      )}
    </div>
  );
};

export default Input;
