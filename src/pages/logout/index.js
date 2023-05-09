import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useStoreUser, useStoreSocket } from "../../hooks";

export default function Logout(){
  const { setUser} = useStoreUser()
  const { socket } = useStoreSocket();

  useEffect(() => {
    setUser(null);
    localStorage.removeItem("token");
    socket.send(JSON.stringify({
      action: 'logout',
      params: {}
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  return <Navigate to="/" />
}