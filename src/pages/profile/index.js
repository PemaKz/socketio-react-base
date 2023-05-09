import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import DashboardLayout from "../../layouts/DashboardLayout";
import { useStoreSocket, useStoreUser } from "../../hooks";
export default function Profile(){
  const { user } = useStoreSocket()
  const { socket } = useStoreUser();
  const [authTokens, setAuthTokens] = useState([]);

  useEffect(() => {
    socket.send(JSON.stringify({
      action: 'myAuthTokens',
      params: {}
    }))
    socket.on('message', (data) => {
      try{
        data = JSON.parse(data)
        if(data.action === "myAuthTokens"){
          if(data.success){
            const allTokens  = data.data
            setAuthTokens(allTokens)
          }else{
            toast.error(data.message)
          }
        }
      } catch (error) {
        console.log(error)
      }
    })
    return () => {
      socket.off('message')
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (<DashboardLayout>
    Profile {user.username} - {user.role?.name}
    {authTokens.map((token, index) => (<div key={index}>{JSON.stringify(token)}</div>))}
  </DashboardLayout>)
}