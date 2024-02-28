import {Link, Navigate, Outlet} from "react-router-dom";
import {useStateContext} from "../contexts/ContextProvider.jsx";
import axiosClient from "../axois-client.js";
import {useEffect} from "react";
import NavBar from "../views/Navbar.jsx";
import Footr from "../views/Footr.jsx";

export default function DefaultLayout() {
  const {token, setUser, notification} = useStateContext();





  useEffect(() => {
    axiosClient.get('/user')
      .then(({data}) => {
         setUser(data)
      })
  }, [])

  return (
    <><NavBar/>
          <Outlet/>
          <Footr/>


        {notification &&
          <div className="notification">
            {notification}
          </div>
        }</>

  )
}
