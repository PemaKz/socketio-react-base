import { Route, Routes } from "react-router-dom";
import Landing from "./landing";
import Home from "./home";
import Profile from "./profile";
import Login from "./login";
import Register from "./register";
import NotLoggedRoute from "../middlewares/NotLoggedRoute";
import UserRoute from "../middlewares/UserRoute";
import NotFound from "./404";
import Logout from "./logout";

export default function Pages(){
  return (<Routes>
    <Route path="/" element={<Landing />} />
    <Route path="/home" element={<UserRoute><Home /></UserRoute>} />
    <Route path="/profile" element={<UserRoute><Profile /></UserRoute>} />
    <Route path="/login" element={<NotLoggedRoute><Login /></NotLoggedRoute>} />
    <Route path="/register" element={<NotLoggedRoute><Register /></NotLoggedRoute>} />
    <Route path="/logout" element={<UserRoute><Logout /></UserRoute>} />
    <Route path="*" element={<NotFound />} />
  </Routes>)
}