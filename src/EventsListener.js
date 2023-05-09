import { useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { useStoreUser, useStoreSocket } from './hooks'
import lang from './lang'

export default function EventsListener(){
  const {setUser} = useStoreUser()
  const {socket} = useStoreSocket();

  const onUserUpdate = (msg) => {
    try{
      const {token, user} = JSON.parse(msg)
      localStorage.setItem("token", token)
      setUser(user)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if(!socket) return
    socket.on('user', onUserUpdate)

    return () => {
      socket.off('user', onUserUpdate);
    }
  }, [socket])
  return ''
}