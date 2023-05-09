
import { Navigate } from "react-router-dom"
import { useStoreUser } from "../hooks"

export default function NotLoggedRoute({ children }){
  const { user } = useStoreUser()
  if(user) return <Navigate to="/home"/>
  return children
}