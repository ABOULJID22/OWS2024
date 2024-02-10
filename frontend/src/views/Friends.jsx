/* import {useEffect, useState} from "react";
import axiosClient from "../axois-client.js";
import {Link} from "react-router-dom";
import {useStateContext} from "../contexts/ContextProvider.jsx";

export default function Friends() {
  const [Friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(false);
  const {setNotification} = useStateContext()
  const [totalFriends, setTotalFriends] = useState(0);
  useEffect(() => {
    getFriends();
  }, [])

  const onDeleteClick = user => {
    if (!window.confirm("Are you sure you want to delete this user?")) {
      return
    }
    axiosClient.delete(`/Friends/${user.id}`)
      .then(() => {
        setNotification('User was successfully deleted')
        getFriends()
      })
  }

  const getFriends = () => {
    setLoading(true)
    axiosClient.get('/Friends')
      .then(({ data }) => {
        setLoading(false)
        setFriends(data.data)
        setTotalFriends(data.data.length);
      })
      .catch(() => {
        setLoading(false)
      })
  }

  return (
    <div>
      <div style={{display: 'flex', justifyContent: "space-between", alignItems: "center"}}>
        <h1>Welcom Back Admin !</h1>
        <Link className="btn-add" to="/Friends/new">Add new</Link>
      </div>
       <p>Total Friends: {totalFriends}</p>
      <div className="card animated fadeInDown">
        <table>
          <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Nationalite</th>
            <th>Create Date</th>
            <th>Actions</th>
          </tr>
          </thead>
          {loading &&
            <tbody>
            <tr>
              <td colSpan="5" class="text-center">
                Loading...
              </td>
            </tr>
            </tbody>
          }
          {!loading &&
            <tbody>
            {Friends.map(u => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.name}</td>
                <td>{u.email}</td>

              </tr>
            ))}
            </tbody>
          }
        </table>
      </div>
    </div>
  )
}
 */