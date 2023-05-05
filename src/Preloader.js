import { useContext, useEffect, useState } from "react";
import WebFont from "webfontloader";
import Preload from "./components/Preload";
import { socket } from "./services/Socket";
import { GlobalContext } from "./context";
import { toast } from "react-hot-toast";

export default function Preloader({children}){
  const { setUser } = useContext(GlobalContext)
  const [loading, setLoading] = useState(true);

  const loadFonts = async () => {
    WebFont.load({
      google: {
        families: ['Changa']
      }
    })
  }

  useEffect(() => {
    loadFonts();
    console.log('Preloader');
    socket.connect();
    function onConnect() {
      console.log('connected');
      if(localStorage.getItem("token")){
        socket.send(JSON.stringify({
          action: "checkUser",
          params: {}
        }))
      } else loading && setLoading(false);
    }

    function onDisconnect() {
      console.log('disconnected');
    }

    function onMessageEvent(msg) {
      try{
        msg = JSON.parse(msg)
        if(msg.action === "checkUser"){
          if(msg.success){
            const user  = msg.data
            setUser(user)
          } else localStorage.removeItem("token")
          loading && setLoading(false);
        }
      } catch (error) {
        console.log(error)
      }
    }

    function onError(error) {
      console.log('error', error);
      loading && setLoading(false);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('message', onMessageEvent);
    socket.on('error', onError);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('message', onMessageEvent);
    };
  }, [])

  if(loading) return <Preload />
  
  return children
}