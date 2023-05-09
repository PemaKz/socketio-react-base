import { Bars3Icon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import IdenticonAvatar from "../../components/IdenticonAvatar";
import menuConfig from "../../config/menuConfig";
import { useStoreUser } from "../../hooks";

export default function TopbarMobile({ setSidebarOpen = () => {}, path}){
  const { user } = useStoreUser()
  return (<div className="sticky top-0 z-40 flex items-center gap-x-6 bg-white px-4 py-4 shadow-sm sm:px-6 lg:hidden">
  <button type="button" className="-m-2.5 p-2.5 text-gray-700 lg:hidden" onClick={() => setSidebarOpen(true)}>
    <span className="sr-only">Open sidebar</span>
    <Bars3Icon className="h-6 w-6" aria-hidden="true" />
  </button>
  <div className="flex-1 text-sm font-semibold leading-6 text-gray-900">
    {menuConfig.find(item => item.path === path)?.name || "Member Panel"}
  </div>
  <Link to="/profile">
    <span className="sr-only">Your profile</span>
    <IdenticonAvatar username={user.username} saturation="90" className="h-8 w-8 rounded-full bg-gray-50" />
  </Link>
</div>)
}