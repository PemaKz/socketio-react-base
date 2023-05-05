import { Link } from "react-router-dom";
import PublicLayout from "../../layouts/PublicLayout";

export default function NotFound(){
  return (<PublicLayout>
    404 Not Found
    <Link to="/" className="m-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      Go to home
    </Link>
    <Link to="/login" className="m-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      Go to login
    </Link>
  </PublicLayout>)
}