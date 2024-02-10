import React, { useEffect, useState } from "react";
import axiosClient from "../axois-client.js";
import { Link } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider.jsx";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const { setNotification } = useStateContext();
  const [totalUsers, setTotalUsers] = useState(0);
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedVille, setSelectedVille] = useState("");
  const [query, setQuery] = useState("");

  useEffect(() => {
    getUsers();
  }, [selectedRole, selectedVille, query]);

  const onDeleteClick = (user) => {
    if (!window.confirm("Are you sure you want to delete this user?")) {
      return;
    }
    axiosClient.delete(`/users/${user.id}`).then(() => {
      setNotification("User was successfully deleted");
      getUsers();
    });
  };

  const getUsers = () => {
    setLoading(true);
    const endpoint = selectedRole
      ? `/users?role=${selectedRole}&ville=${selectedVille}&query=${query}`
      : "/users";

    axiosClient
      .get(endpoint)
      .then(({ data }) => {
        setLoading(false);
        setUsers(data.data);
        setTotalUsers(data.data.length);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  return (
    <div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>Welcom Back Admin !</h1>
        <p>Total Users: {totalUsers}</p>

        <Link className="btn-add" to="/users/new">
          Add new
        </Link>
      </div>
      <div className="flex items-center">
  <label className="mr-4">
    <input
      type="text"
      placeholder="Rechercher"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      className="p-2 border border-gray-300 rounded"
    />
  </label>
  <label className="mr-4">
    Rôle:
    <select
      className="p-2 border border-gray-300 rounded"
      value={selectedRole}
      onChange={(e) => setSelectedRole(e.target.value)}
    >
      <option value="">Tous les rôles</option>
      <option value="Admin">Admin</option>
      <option value="user">Utilisateur</option>
    </select>
  </label>
  <label>
    Ville:
    <select
      className="p-2 border border-gray-300 rounded"
      value={selectedVille}
      onChange={(e) => setSelectedVille(e.target.value)}
    >
      <option value="">Toutes les villes</option>
      <option value="Casablanca">Casablanca</option>
        <option value="Rabat">Rabat</option>
        <option value="Marrakech">Marrakech</option>
        <option value="Fes">Fès</option>
        <option value="Agadir">Agadir</option>
        <option value="Tanger">Tanger</option>
        <option value="Meknès">Meknès</option>
        <option value="Tiznit">Tiznit</option>
        <option value="Kenitra">Kenitra</option>
        <option value="Tétouan">Tétouan</option>
    </select>
  </label>
</div>

      <div className="card animated fadeInDown">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Ville</th>
              <th>Create Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="text-center">
                  Loading...
                </td>
              </tr>
            ) : (
              users
                .filter((u) =>
                  u.name.toLowerCase().includes(query.toLowerCase()) &&
                  (selectedRole ? u.role === selectedRole : true) &&
                  (selectedVille ? u.ville === selectedVille : true)
                )
                .map((u) => (
                  <tr key={u.id}>
                    <td>{u.id}</td>
                    <td>{u.name}</td>
                    <td>{u.email}</td>
                    <td>{u.ville}</td>
                    <td>{u.created_at}</td>
                    <td>
                      <Link className="btn-edit" to={"/users/" + u.id}>
                        Edit
                      </Link>
                      &nbsp;
                      <button className="btn-delete" onClick={(ev) => onDeleteClick(u)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
