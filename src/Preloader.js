import { useEffect, useState } from "react";
import WebFont from "webfontloader";
import Preload from "./components/Preload";
import { socketService } from "./services/Socket";
import { useStoreSocket } from './hooks'

export default function Preloader({children}){
  const { setSocket } = useStoreSocket();
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
    const socket = socketService;
    setSocket(socket);
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
      msg = JSON.parse(msg)
      try{
        if(msg.action === "checkUser") {
          loading && setLoading(false)
          if(!msg.success) localStorage.removeItem("token")
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if(loading) return <Preload />
  
  return children
}