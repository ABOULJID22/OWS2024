import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axiosClient from "../axois-client.js";
import {useStateContext} from "../contexts/ContextProvider.jsx";

export default function UserForm() {
  const navigate = useNavigate();
  let {id} = useParams();
  const [user, setUser] = useState({
    id: null,
    name: '',
    email: '',
    telephone: '',
    sexe: '',
    nationalite: '',
    photo: '',
    adresse: '',
    ville: '',
    password: '',
    password_confirmation: ''
  })
  const [errors, setErrors] = useState(null)
  const [loading, setLoading] = useState(false)
  const {setNotification} = useStateContext()

  if (id) {
    useEffect(() => {
      setLoading(true)
      axiosClient.get(`/users/${id}`)
        .then(({data}) => {
          setLoading(false)
          setUser(data)
        })
        .catch(() => {
          setLoading(false)
        })
    }, [])
  }

  const onSubmit = ev => {
    ev.preventDefault()
    if (user.id) {
      axiosClient.put(`/users/${user.id}`, user)
        .then(() => {
          setNotification('User was successfully updated')
          navigate('/users')
        })
        .catch(err => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors)
          }
        })
    } else {
      axiosClient.post('/users', user)
        .then(() => {
          setNotification('User was successfully created')
          navigate('/users')
        })
        .catch(err => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors)
          }
        })
    }
  }

  return (
    <>
      {user.id && <h1>Update User: {user.name}</h1>}
      {!user.id && <h1>New User</h1>}
      <div className="card animated fadeInDown">
        {loading && (
          <div className="text-center">
            Loading...
          </div>
        )}
        {errors &&
          <div className="alert">
            {Object.keys(errors).map(key => (
              <p key={key}>{errors[key][0]}</p>
            ))}
          </div>
        }
        {!loading && (
          <form onSubmit={onSubmit}>
            <input value={user.name} className="m-3 p-1" onChange={ev => setUser({...user, name: ev.target.value})} placeholder="Name"/>
            <input value={user.email}  className="m-3 p-1"  onChange={ev => setUser({...user, email: ev.target.value})} placeholder="Email"/>
            <input value={user.telephone}  className="m-3 p-1" onChange={ev => setUser({...user, telephone: ev.target.value})} placeholder="Telephone"/>
            <input value={user.sexe} className="m-3 p-1"  onChange={ev => setUser({...user, sexe: ev.target.value})} placeholder="Sexe"/>
            <input value={user.ville}  className="m-3 p-1" onChange={ev => setUser({...user, ville: ev.target.value})} placeholder="Ville"/>
            <input value={user.adresse}  className="m-3 p-1" onChange={ev => setUser({...user, adresse: ev.target.value})} placeholder="Anationalitedresse"/>
            <input value={user.nationalite}  className="m-3 p-1" onChange={ev => setUser({...user, nationalite: ev.target.value})} placeholder="Nationalite"/>
            <input type="password"  className="m-3 p-1" onChange={ev => setUser({...user, password: ev.target.value})} placeholder="Password"/>
            <input type="password" className="m-3 p-1"  onChange={ev => setUser({...user, password_confirmation: ev.target.value})} placeholder="Password Confirmation"/>
            <button className="btn">Save</button>
          </form>
        )}
      </div>
    </>
  )
}
