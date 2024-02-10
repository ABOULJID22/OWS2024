import {Link, Navigate, Outlet,useNavigate} from "react-router-dom";
import {useStateContext} from "../contexts/ContextProvider.jsx";
import axiosClient from "../axois-client.js";
import {useEffect,useState} from "react";

export default function AdminLayout() {
  const {user, token, setUser, setToken, notification} = useStateContext();
  const navigate = useNavigate();
  const [currentDateTime, setCurrentDateTime] = useState("");
  const [users, setUsers] = useState([]);

  if (!token) {
    return <Navigate to="/home"/>
  }




  const onLogout = ev => {
    ev.preventDefault()

    axiosClient.post('/logout')
      .then(() => {
        setUser({})
        setToken(null)
        navigate("/Guesthome");
      })
  }

//datetime
  useEffect(() => {
     const interval = setInterval(() => {
      const now = new Date();
      setCurrentDateTime(now.toLocaleString());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    axiosClient.get('/user')
      .then(({data}) => {
         setUser(data)
      })

  }, [])

  if (user.role === "user") {
    return<Navigate to="/home" />;
  } else if (user.role === "Admin") {
    <Navigate to="/home" />;
  }


  return (
    <div id="defaultLayout">
      <aside>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/users">Users</Link>

      </aside>
      <div className="content">
        <header>
          <div>
            Header
          </div>
          <div>{currentDateTime}</div>
          <Link className="p-4" to="/Home">To Home Page</Link>

          <div>


            {user.name} &nbsp; &nbsp;
            <a onClick={onLogout} className="btn-logout" href="#">Logout</a>

          </div>
        </header>
        <main>
          <Outlet/>
        </main>
        {notification &&
          <div className="notification">
            {notification}
          </div>
        }
      </div>
    </div>
  )
}
