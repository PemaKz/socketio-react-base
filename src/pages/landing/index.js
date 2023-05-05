import { Link } from "react-router-dom";
import PublicLayout from "../../layouts/PublicLayout";
import lang from "../../lang";

export default function Landing(){
  return (<PublicLayout className={`w-screen h-screen flex justify-center items-center`}>
    Landing
    <Link to="/login" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      {lang("signIn")}
    </Link>
  </PublicLayout>)
}