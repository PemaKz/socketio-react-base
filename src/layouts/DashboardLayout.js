import { useState } from 'react'
import DashboardSidebarDesktop from './components/DashboardSidebarDesktop'
import TopbarMobile from './components/TopbarMobile'
import DashboardSidebarMobile from './components/DashboardSidebarMobile'
import { useLocation } from 'react-router-dom'




export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()
  const path = location.pathname

  return (<div>
      <DashboardSidebarMobile sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} path={path} />
      <DashboardSidebarDesktop path={path} />
      <TopbarMobile setSidebarOpen={setSidebarOpen} path={path} />
      <main className="py-10 lg:pl-72 truncate">
        <div className="px-4 sm:px-6 lg:px-8">{children}</div>
      </main>
  </div>)
}