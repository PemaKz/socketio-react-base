import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import lang from "../../lang";
import { useStoreUser, useStoreSocket } from "../../hooks";

export default function Login() {
  const { setUser} = useStoreUser()
  const { socket } = useStoreSocket();
  const [loginInfo, setLoginInfo] = useState({ username: "", password: "" })
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e) => {
    if (loading) return
    if(!loginInfo.username) return toast.error(lang("usernameRequired"))
    if(!loginInfo.password) return toast.error(lang("passwordRequired"))
    setLoading(true)
    try {
      socket.send(JSON.stringify({
        action: "login",
        params: loginInfo
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
        if(data.action === "login"){
          if(data.success){
            toast.success(lang("loginSuccess"))
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
            {lang("signInToYourAccount")}
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
                  <input type="text" required value={loginInfo.username} onChange={(e) => setLoginInfo({ ...loginInfo, username: e.target.value })}
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
                  <input type="password" required value={loginInfo.password} onChange={e => setLoginInfo({ ...loginInfo, password: e.target.value })}
                    className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset 
                    ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label htmlFor="remember-me" className="ml-3 block text-sm leading-6 text-gray-900">
                    {lang("rememberMe")}
                  </label>
                </div>

                <div className="text-sm leading-6">
                  <Link to="/recover-account" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    {lang("forgotPassword")}
                  </Link>
                </div>
              </div>

              <div>
                <button onClick={handleLogin}W
                  type="submit"
                  className={`flex w-full justify-center rounded-md  px-3 py-1.5 text-sm leading-6 font-semibold 
                  bg-indigo-600 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                >
                  {lang('signIn')}
                </button>
              </div>
            </div>
          </div>

          <p className="mt-10 text-center text-sm text-gray-500">
            {lang("notAMember")} {" "}
            <Link to="/register" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              {lang("registerNow")}
            </Link>
          </p>
        </div>
      </div>
    </div>
  </div>)
}
