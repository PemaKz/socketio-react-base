import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'

import { PowerIcon, XMarkIcon } from '@heroicons/react/24/outline'
import menuConfig from '../../config/menuConfig'
import { Link } from 'react-router-dom'
import lang from '../../lang'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function DashboardSidebarMobile({ sidebarOpen, setSidebarOpen, path }){
  return (<Transition.Root show={sidebarOpen} as={Fragment}>
    <Dialog as="div" className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
      <Transition.Child
        as={Fragment}
        enter="transition-opacity ease-linear duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity ease-linear duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="fixed inset-0 bg-gray-900/80" />
      </Transition.Child>

      <div className="fixed inset-0 flex">
        <Transition.Child
          as={Fragment}
          enter="transition ease-in-out duration-300 transform"
          enterFrom="-translate-x-full"
          enterTo="translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leaveFrom="translate-x-0"
          leaveTo="-translate-x-full"
        >
          <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
            <Transition.Child
              as={Fragment}
              enter="ease-in-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in-out duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                <button type="button" className="-m-2.5 p-2.5" onClick={() => setSidebarOpen(false)}>
                  <span className="sr-only">Close sidebar</span>
                  <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                </button>
              </div>
            </Transition.Child>
            {/* Sidebar component, swap this element with another sidebar if you like */}
            <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-2">
              <div className="flex h-16 shrink-0 items-center">
                <h1 className="text-lg font-semibold leading-6 text-gray-900">Socket.io Base</h1>
              </div>
              <nav className="flex flex-1 flex-col">
                <ul className="flex flex-1 flex-col gap-y-7">
                  <li className='flex-1'>
                    <ul className="-mx-2 space-y-1">
                      {menuConfig.map((item) => (
                        <li key={item.name}>
                          <Link
                            to={item.path}
                            className={classNames(
                              item.path === path
                                ? 'bg-gray-50 text-indigo-600'
                                : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50',
                              'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                            )}
                          >
                            <item.icon
                              className={classNames(
                                item.path === path ? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-600',
                                'h-6 w-6 shrink-0'
                              )}
                              aria-hidden="true"
                            />
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                  <li className="-mx-6 mt-6">
                    <Link
                      to="/logout"
                      className={`flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-red-700 hover:bg-gray-50 `}
                    >
                      <PowerIcon className="h-6 w-6 shrink-0" aria-hidden="true" />
                      {lang("logout")}
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </Dialog.Panel>
        </Transition.Child>
      </div>
    </Dialog>
  </Transition.Root>)
}