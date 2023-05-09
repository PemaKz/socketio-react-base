import { Link } from "react-router-dom";
import menuConfig from "../../config/menuConfig";
import IdenticonAvatar from "../../components/IdenticonAvatar";
import { PowerIcon } from "@heroicons/react/24/outline";
import lang from "../../lang";
import { useStoreUser } from "../../hooks";

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function DashboardSidebarDesktop({ path }){
  const { user } = useStoreUser()
  return (<div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
    <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6">
      <div className="flex h-16 shrink-0 items-center justify-center">
        <h1 className="text-lg font-semibold leading-6 text-gray-900">Socket.io Base</h1>
      </div>
      <nav className="flex flex-1 flex-col">
        <ul className="flex flex-1 flex-col">
          <li className="flex-1">
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
          <li className="-mx-6 ">
            <Link
              to="/profile"
              className={`flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-50 
              ${path === '/profile' ? 'bg-gray-50 text-indigo-600' : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-5'}`}
            >
              <IdenticonAvatar username={user.username} saturation="90" className="h-8 w-8 rounded-full bg-gray-50" />
              <span className="sr-only">Your profile</span>
              <span aria-hidden="true">{user.username}</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  </div>)
}