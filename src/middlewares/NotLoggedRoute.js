import { useContext } from "react"
import { GlobalContext } from "../context"
import { Navigate } from "react-router-dom"

export default function NotLoggedRoute({ children }){
  const {user} = useContext(GlobalContext)
  if(user) return <Navigate to="/home"/>
  return children
}