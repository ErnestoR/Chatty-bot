/* eslint-disable @next/next/no-img-element */
import { Fragment } from 'react';
import clsx from 'clsx';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import {
  Bars3Icon,
  UserCircleIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useRouter } from 'next/router';

type NavBarProps = {
  navLinks: Array<{ name: string; href: string }>;
  dropdownLinks: Array<{ name: string; href: string }>;
  sessionUser: {
    name: string;
    email: string;
  };
  children: React.ReactNode;
};

const NavBar = (props: NavBarProps) => {
  const { sessionUser, navLinks, dropdownLinks, children } = props;
  const router = useRouter();

  return (
    <>
      <Disclosure as="nav" className="bg-gray-800">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 items-center justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <img
                      className="block h-8 w-auto "
                      src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                      alt="Your Company"
                    />
                  </div>
                  <div className="hidden sm:ml-6 sm:block">
                    <div className="flex space-x-4">
                      {navLinks.map((item, index) => (
                        <Link
                          key={`${item.name}-${index}`}
                          href={item.href}
                          className={clsx(
                            'rounded-md px-3 py-2 text-sm font-medium ',
                            router.pathname === item.href
                              ? 'bg-gray-900 text-white'
                              : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          )}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex items-center">
                    {/* Profile dropdown */}
                    <Menu as="div" className="relative ml-3">
                      <div>
                        <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                          <span className="sr-only">Open user menu</span>
                          <UserCircleIcon className="h-8 w-8 rounded-full text-white" />
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          {dropdownLinks.map((item, index) => (
                            <Menu.Item key={`${index}-${item.name}`}>
                              {({ active }) => (
                                <Link
                                  href={item.href}
                                  className={clsx(
                                    'block px-4 py-2 text-sm text-gray-700',
                                    router.pathname === item.href || active
                                      ? 'bg-gray-700 text-white'
                                      : '',
                                  )}
                                >
                                  {item.name}
                                </Link>
                              )}
                            </Menu.Item>
                          ))}
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                </div>
                <div className="-mr-2 flex sm:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 px-2 pt-2 pb-3">
                {navLinks.map((item, index) => (
                  <Disclosure.Button
                    as={Link}
                    key={`${item.name}-${index}`}
                    href={item.href}
                    className={clsx(
                      'block rounded-md px-3 py-2 text-base font-medium',
                      router.pathname === item.href
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    )}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
              <div className="border-t border-gray-700 pt-4 pb-3">
                <div className="flex items-center px-5">
                  <div className="flex-shrink-0">
                    <UserCircleIcon className="h-10 w-10 rounded-full text-white" />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-white">
                      {sessionUser?.name}
                    </div>
                    <div className="text-sm font-medium text-gray-400">
                      {sessionUser?.email}
                    </div>
                  </div>
                </div>
                <div className="mt-3 space-y-1 px-2">
                  {dropdownLinks.map((item, index) => (
                    <Disclosure.Button
                      key={`${index}-${item.name}`}
                      as={Link}
                      href={item.href}
                      className={clsx(
                        'block rounded-md px-3 py-2 text-base font-medium',
                        router.pathname === item.href
                          ? 'bg-gray-900 text-white'
                          : 'text-gray-400 hover:bg-gray-700 hover:text-white',
                      )}
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      {children}
    </>
  );
};

export default NavBar;
