import React, { useEffect, useState } from "react";
import axiosClient from "../axois-client.js";
import { useStateContext } from "../contexts/ContextProvider.jsx";
import { useParams, Link } from "react-router-dom";

export default function ShowDetail({ onAddFriend }) {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { notification } = useStateContext();
  const { id } = useParams();

  const addFriend = () => {
    axiosClient
      .post(`/users/add-friend/${user.id}`)
      .then(({ data }) => {
        console.log("Ami ajouté avec succès !");
        setUser((prevUser) => ({ ...prevUser, isFriend: true }));
      })
      .catch((error) => {
        console.error("Erreur lors de l'ajout d'un ami :", error);
      });
  };

  useEffect(() => {
    setLoading(true);

    axiosClient
      .get(`/users/${id}`)
      .then(({ data }) => {
        setLoading(false);
        setUser(data);
      })
      .catch((error) => {
        setLoading(false);
        setError(error.message);
      });
  }, [id]);

  //friends
 // State pour stocker les amis de l'utilisateur
 const [friends, setFriends] = useState([]);

 useEffect(() => {
   setLoading(true);

   // Récupérer les informations de l'utilisateur
   axiosClient.get(`/users/${id}`)
     .then(({ data }) => {
       setUser(data);

       // Récupérer la liste d'amis de l'utilisateur
       axiosClient.get(`/user/${data.id}/friends`)
         .then(({ data: friendsData }) => {
           setFriends(friendsData);
           setLoading(false);
         })
         .catch((error) => {
           setLoading(false);
           console.error("Erreur lors de la récupération des amis :", error);
         });
     })
     .catch((error) => {
       setLoading(false);
       setError(error.message);
     });
 }, [id]);



  return (
    <div className="h-full bg-gray-200 p-8">
      {notification && <div className="notification">{notification}</div>}

      <div className="bg-white rounded-lg shadow-xl pb-8">
        <div className="w-full h-[250px]">
          <img
            src="https://vojislavd.com/ta-template-demo/assets/img/profile-background.jpg"
            className="w-full h-full rounded-tl-lg rounded-tr-lg"
          />
        </div>

        <div className="flex flex-col items-center -mt-20">
          <img
            className="w-40 border-4 border-white rounded-full"
            src={user.photo || "../imgs/avater.png"}
            alt="User Image"
            loading="lazy"
          />
          <div className="flex items-center space-x-2 mt-2">
            {user.id && (
              <p className="text-2xl">
                {user.name}
                <sup className="text-sm text-gray-500">{user.role}</sup>
              </p>
            )}
            <span className="bg-blue-500 rounded-full p-1" title="Verified">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="text-gray-100 h-2.5 w-2.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="4"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
            </span>
          </div>

          <p className="text-gray-700">{user.email}</p>
          <p className="text-sm text-gray-500">
            {user.ville}, {user.nationalite}
          </p>
        </div>
        <div className="flex-1 flex flex-col items-center lg:items-end justify-end px-8 mt-2">
          <div className="flex items-center space-x-4 mt-2">
            <button
              onClick={addFriend}
              className={`flex items-center bg-blue-600 hover:bg-blue-700 text-gray-100 px-4 py-2 rounded text-sm space-x-2 transition duration-100 ${
                user.isFriend ? "cursor-not-allowed" : ""
              }`}
              disabled={user.isFriend}
            >
              {user.isFriend ? (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-green-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M17.707 4.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span>Déjà ajouté</span>
                </>
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"></path>
                  </svg>
                  <span>Ajouter</span>
                </>
              )}
              {error}
            </button>

            <Link to="/Home">
              <button className="flex items-center bg-blue-600 hover:bg-blue-700 text-gray-100 px-4 py-2 rounded text-sm space-x-2 transition duration-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-gray-100"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 19l-7-7 7-7"
                  ></path>
                </svg>
                <span className="text-sm text-gray-100">Retour</span>
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div className="my-4 flex flex-col 2xl:flex-row space-y-4 2xl:space-y-0 2xl:space-x-4">
        <div className="w-full flex flex-col 2xl:w-1/3">
          <div className="flex-1 bg-white rounded-lg shadow-xl p-8">
            <h4 className="text-xl text-gray-900 font-bold">Personal Info</h4>
            <ul className="mt-2 text-gray-700">
              <li className="flex border-y py-2">
                <span className="font-bold w-24">Full name:</span>
                <span className="text-gray-700">{user.name}</span>
              </li>
              <li className="flex border-b py-2">
                <span className="font-bold w-24">Mobile:</span>
                <span className="text-gray-700">{user.telephone}</span>
              </li>
              <li className="flex border-b py-2">
                <span className="font-bold w-24">Email:</span>
                <span className="text-gray-700">{user.email}</span>
              </li>
              <li className="flex border-b py-2">
                <span className="font-bold w-24">Gender:</span>
                <span className="text-gray-700">{user.sexe}</span>
              </li>
              <li className="flex border-b py-2">
                <span className="font-bold w-24">Nationalite:</span>
                <span className="text-gray-700">{user.nationalite}</span>
              </li>
              <li className="flex border-b py-2">
                <span className="font-bold w-24">Ville:</span>
                <span className="text-gray-700">{user.ville}</span>
              </li>
              <li className="flex border-b py-2">
                <span className="font-bold w-24">Adress:</span>
                <span className="text-gray-700">{user.adresse}</span>
              </li>
            </ul>
          </div>

        </div>
        <div  className="w-full md:w-2/3 mt-4 md:mt-0">
        <div className="flex-1 bg-white rounded-lg shadow-xl mt-4 p-8">
  <h4 className="text-xl text-gray-900 font-bold">les amis {user.name}</h4>

  <ul className="mt-4 space-y-2">
    {friends.map((friend) => (
      <li key={friend.id} className="flex items-center space-x-4">
        <img
          className="w-12 h-12 border-4 border-white rounded-full"
          src={friend.photo || "../imgs/avater.png"}
          alt="User Image"
          loading="lazy"
        />
        <span className="text-gray-700 text-lg">{friend.name}</span>
      </li>
    ))}
  </ul>
</div>

        </div>
      </div>
    </div>
  );
}
