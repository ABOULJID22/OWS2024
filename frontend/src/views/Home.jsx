import React, { useEffect, useState } from "react";
import axiosClient from "../axois-client.js";
import { Link } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider.jsx";
export default function Home() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const { setNotification } = useStateContext();
  const [selectedVille, setSelectedVille] = useState(""); //ville

  const [selectedRole, setSelectedRole] = useState("");
  const [query, setQuery] = useState("");

  const { user, currentUser, token, setUser, setToken, notification } =
    useStateContext();
  useEffect(() => {
    axiosClient.get("/user").then(({ data }) => {
      setUser(data);
    });
  }, []);

  useEffect(() => {
    getUsers();
  }, [selectedRole]);

  const getUsers = () => {
    setLoading(true);
    const endpoint = selectedRole ? `/users?role=${selectedRole}` : "/users";

    axiosClient
      .get(endpoint)
      .then(({ data }) => {
        setLoading(false);
        setUsers(data.data);
        updateFilteredUsersCount();
      })
      .catch(() => {
        setLoading(false);
      });
  };

  //filtrage
  const updateFilteredUsersCount = () => {
    const count = filteredItems.length;
    setFilteredUsersCount(count);
  };
  const [filteredUsersCount, setFilteredUsersCount] = useState(0);
  const [filterSectionVisible, setFilterSectionVisible] = useState(true);
  const toggleFilterSection = () => {
    setFilterSectionVisible(!filterSectionVisible);
  };

  const filteredItems = users.filter((user) => {
    const selectedVilleLower = selectedVille ? selectedVille.toLowerCase() : "";
    const isMatchingNameOrRole =
      user.name.toLowerCase().includes(query.toLowerCase()) ||
      user.role.toLowerCase().includes(query.toLowerCase()) ||
      (user.ville && user.ville.toLowerCase().includes(query.toLowerCase()));

    const isMatchingVille = selectedVille
      ? user.ville && user.ville.toLowerCase().includes(selectedVilleLower)
      : true;

    if (selectedRole === "") {
      return isMatchingNameOrRole && isMatchingVille;
    } else if (selectedRole === "All") {
      return isMatchingNameOrRole && isMatchingVille;
    } else {
      return (
        isMatchingNameOrRole && isMatchingVille && user.role === selectedRole
      );

      const isCurrentUser = user.id === currentUser.id;

      return (
        isMatchingNameOrRole &&
        isMatchingVille &&
        user.role === selectedRole &&
        !isCurrentUser
      );
    }
  });

  const handleRoleChange = (e) => {
    const role = e.target.value;
    setSelectedRole(role);
    setQuery("");
  };

  //friends
  const [friends, setFriends] = useState([]);
  useEffect(() => {
    axiosClient.get("/user").then(({ data }) => {
      setUser(data);

      axiosClient
        .get(`/user/${data.id}/friends`)
        .then(({ data: friendsData }) => {
          setFriends(friendsData);
        });
    });
  }, []);
  return (
    <div>
      <div className="flex ">
        <div className="p-8 ">
          <Link to="/profile">
            <div className=" flex items-center mb-4">
              <img
                className="w-10 h-10 border-4 border-white rounded-full"
                src={user.photo || "../imgs/avater.png"}
                alt="User Image"
                loading="lazy"
              />
              <div className="ml-4">
                <h3 className="text-lg font-semibold">{user.name}</h3>
                <p className="text-gray-600">{user.email}</p>
              </div>
            </div>
            <div className="ml-2 mb-3">
              <p className="text-gray-600">
                <span className="font-semibold">Role:</span> {user.role}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Ville:</span> {user.ville}
              </p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-gray-600"></p>
            </div>
          </Link>

          <div>
            <p className="mr-2 m-1">
              Nombre stagiaire : {filteredUsersCount || users.length}
            </p>
            <p className="mr-2 m-1">Nombre amis : {friends.length}</p>

            <label className=" relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                value=""
                className="sr-only peer"
                checked={filterSectionVisible}
                onChange={toggleFilterSection}
              />
              <div
                className={`w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer ${
                  filterSectionVisible
                    ? "peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white"
                    : ""
                } after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600`}
              ></div>
              <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                {filterSectionVisible ? "Cacher Filtre" : "Afficher Filtre"}
              </span>
            </label>
          </div>
        </div>

        <div className="w-3/4 p-4 2xl:container">
          {loading ? (
            <div
              className="flex items-center justify-center h-screen"
              role="status"
            >
              <svg
                aria-hidden="true"
                class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span class="sr-only">Loading...</span>
            </div>
          ) : (
            <div>
              <div
                className={`p-4 ${filterSectionVisible ? "" : "menu-hidden"}`}
              >
                {filterSectionVisible && (
                  <div className="flex items-center">
                    <input
                      className="ml-1 p-1 h-6 border-spacing-2"
                      type="text"
                      placeholder="Rechercher "
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                    />
                    <button
                      className="ml-1 p-1 h-6 bg-blue-500 text-white border-spacing-2"
                      onClick={getUsers}
                    >
                      Rechercher
                    </button>
                    <div className="m-1 ps-5 border-black flex items-center">
                      <label className="mr-4">
                        <input
                          type="radio"
                          name="role"
                          value=""
                          checked={selectedRole === ""}
                          onChange={() =>
                            handleRoleChange({ target: { value: "" } })
                          }
                        />
                        Tous
                      </label>
                      <label className="mr-4">
                        <input
                          type="radio"
                          name="role"
                          value="Admin"
                          checked={selectedRole === "Admin"}
                          onChange={() =>
                            handleRoleChange({ target: { value: "Admin" } })
                          }
                        />
                        Admin
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="role"
                          value="user"
                          checked={selectedRole === "user"}
                          onChange={() =>
                            handleRoleChange({ target: { value: "user" } })
                          }
                        />
                        user
                      </label>
                    </div>
                    <select
                      className="m-3 p-4 ps-10 border-black"
                      value={selectedVille}
                      onChange={(e) => setSelectedVille(e.target.value)}
                    >
                      <option value="">All Ville</option>
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
                  </div>
                )}
              </div>

              <div className=" flex justify-center items-center">
                <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
                  {filteredItems.map((user) => (
                    <div
                      key={user.id}
                      className="bg-white p-4 rounded shadow-md"
                    >
                      <img
                        className="w-10 border-4 border-white rounded-full"
                        src={user.photo || "../imgs/avater.png"}
                        alt="User Image"
                        loading="lazy"
                      />
                      <h3 className="text-lg font-semibold mb-2">
                        {user.name}
                      </h3>
                      <p className="text-gray-600 mb-2">Email: {user.email}</p>
                      <p className="text-gray-600 mb-2">Role: {user.role}</p>
                      <p className="text-gray-600 mb-2">Ville: {user.ville}</p>
                      <p className="text-gray-600">
                        Create Date: {user.created_at}
                      </p>
                      <div className="flex justify-between items-center mt-4">
                        <Link to={"/ShowDetail/" + user.id}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 text-green-500 cursor-pointer"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            onMouseEnter={() => <span>Détail</span>}
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M19  9l-7 7-7-7"
                            ></path>
                          </svg>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
