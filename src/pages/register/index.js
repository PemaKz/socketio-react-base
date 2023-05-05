import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {socket} from "../../services/Socket";
import { toast } from "react-hot-toast";
import { GlobalContext } from "../../context";
import lang from "../../lang";

export default function Login() {
  const { setUser} = useContext(GlobalContext)
  const [registerInfo, setRegisterInfo] = useState({ username: "", password: "" })
  const [loading, setLoading] = useState(false)

  const handleRegister = async (e) => {
    if (loading) return
    if(!registerInfo.username) return toast.error(lang("usernameRequired"))
    if(!registerInfo.password) return toast.error(lang("passwordRequired"))
    setLoading(true)
    try {
      socket.send(JSON.stringify({
        action: "register",
        params: registerInfo
      }))
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }

  useEffect(() => {
    socket.on('message', (data) => {
      try{
        data = JSON.parse(data)
        if(data.action === "register"){
          if(data.success){
            const {token, user: newUser}  = data.data
            localStorage.setItem("token", token)
            setUser(newUser)
            toast.success(lang("registerSuccess"));
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

  return (<div className="h-screen w-full flex justify-center items-center">
    <div className="w-full">
      <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h1 className="text-2xl font-semibold leading-6 text-gray-900 text-center">Socket.io Base</h1>
          <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            {lang("registerYourAccount")}
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
            <div className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                {lang("username")}
                </label>
                <div className="mt-2">
                  <input type="text" required value={registerInfo.username} onChange={(e) => setRegisterInfo({ ...registerInfo, username: e.target.value })}
                    className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset 
                    ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                {lang("password")}
                </label>
                <div className="mt-2">
                  <input type="password" required value={registerInfo.password} onChange={e => setRegisterInfo({ ...registerInfo, password: e.target.value })}
                    className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset 
                    ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                  />
                </div>
              </div>

              <div>
                <button onClick={handleRegister}
                  type="submit"
                  className={`flex w-full justify-center rounded-md  px-3 py-1.5 text-sm leading-6 font-semibold 
                  bg-indigo-600 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                >
                  {lang("register")}
                </button>
              </div>
            </div>
          </div>

          <p className="mt-10 text-center text-sm text-gray-500">
            {lang("alreadyHaveAnAccount")}{' '}
            <Link to="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              {lang("loginNow")}
            </Link>
          </p>
        </div>
      </div>
    </div>
  </div>)
}
