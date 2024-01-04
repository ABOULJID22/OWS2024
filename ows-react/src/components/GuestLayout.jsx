import {Navigate, Outlet} from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import NavBar from "../views/Navbar";
import Footr from "../views/Footr";
export default function GuestLayout() {
  const { token } = useStateContext();

  if (token) {
    return <Navigate to="/home" />;
  }

  return (
    <div id="guestLayout">
      <NavBar />
      <Outlet />
      <Footr/>


    </div>
  );
}
