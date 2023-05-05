import { useContext, useEffect } from "react";
import { GlobalContext } from "../../context";
import { Navigate } from "react-router-dom";
import { socket } from "../../services/Socket";


export default function Logout(){
  const { setUser} = useContext(GlobalContext);

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