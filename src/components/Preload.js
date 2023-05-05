export default function Preload(){
  return (<div className="h-screen w-screen flex items-center justify-center gap-x-4"> 
    <div className="bg-blue-600 p-2  w-4 h-4 rounded-full animate-[bounce_0.8s_ease-in-out_infinite_100ms]" />
    <div className="bg-green-600 p-2 w-4 h-4 rounded-full animate-[bounce_0.8s_ease-in-out_infinite_300ms]" />
    <div className="bg-red-600 p-2  w-4 h-4 rounded-full animate-[bounce_0.8s_ease-in-out_infinite_500ms]" />
  </div>)
}