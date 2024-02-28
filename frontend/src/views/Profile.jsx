import React, { useEffect, useState } from 'react';
import {useNavigate, useParams,Link} from "react-router-dom";

import axiosClient from '../axois-client';
import { useStateContext } from "../contexts/ContextProvider";

const Profile = () => {

  const [openSettings, setOpenSettings] = useState(false);
  const navigate = useNavigate();

  const { user, token, setUser, setToken, notification } = useStateContext();
  useEffect(() => {
    axiosClient.get("/user").then(({ data }) => {
      setUser(data);
    });
  }, []);

  const handleSettingsClick = () => {
    setOpenSettings(!openSettings);
  };

  const handleSettingsClose = () => {
    setOpenSettings(false);
  };

  const onLogout = (ev) => {
    ev.preventDefault();
    axiosClient.post("/logout").then(() => {
      setUser({});
      setToken(null);
      navigate("/Guesthome");
    });
  };


  const baseUrl = "http://localhost:8000"; // Remplacez par votre URL de base
const imageUrl = `${baseUrl}/uploads/${user.photo}`;
/*   const imageUrl = `/storage${user.photo}`; */
  return (


    <div className="h-full bg-gray-200 p-8">
       {notification &&
          <div className="notification">
            {notification}
          </div>
        }

      <div className="bg-white rounded-lg shadow-xl pb-8">
        <div x-data="{ openSettings: false }" className="absolute right-12 mt-4 rounded">
        <button
            onClick={handleSettingsClick}
            className="border border-gray-400 p-2 rounded text-gray-300 hover:text-gray-300 bg-gray-100 bg-opacity-10 hover:bg-opacity-20"
            title="Settings"
          >
           <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path>
                    </svg>
          </button>
          <div  className="bg-white absolute right-0 w-40 py-2 mt-1 border border-gray-200 shadow-2xl" x-show="openSettings" onClick={handleSettingsClose} style={{ display: openSettings ? 'block' : 'none' }}>
          <div className="py-2 border-b">
                        <p className="text-gray-400 text-xs px-6 uppercase mb-1">Settings</p>
                        <Link to="/Home">
                        <button className="w-full flex items-center px-6 py-1.5 space-x-2 hover:bg-gray-200">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path>
                            </svg>
                            <span className="text-sm text-gray-700">Return</span>
                        </button>
                        </Link>
                        <button className="w-full flex items-center py-1.5 px-6 space-x-2 hover:bg-gray-200">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"></path>
                            </svg>
                            <span className="text-sm text-gray-700">Password</span>
                        </button>
                        <Link to="/SettingProfile">
                        <button className="w-full flex items-center py-1.5 px-6 space-x-2 hover:bg-gray-200">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            <span className="text-sm text-gray-700">Modifier</span>
                        </button>
                        </Link>
                    </div>
                    <div className="py-2">
                        <button   onClick={onLogout} className="w-full flex items-center py-1.5 px-6 space-x-2 hover:bg-gray-200">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                            </svg>
                            <span className="text-sm text-gray-700">Logout</span>
                        </button>
                    </div>
                </div>
            </div>
            <div className="w-full h-[250px]">

                <img src="https://vojislavd.com/ta-template-demo/assets/img/profile-background.jpg"
                className="w-full h-full rounded-tl-lg rounded-tr-lg"
                />
            </div>

            <div className="flex flex-col items-center -mt-20">
            <img
                  className="w-40 border-4 border-white rounded-full"
                  src={imageUrl}
                  alt="User Image"
                  loading="lazy"
              />

                <div className="flex items-center space-x-2 mt-2">
                {user.id && <p className="text-2xl">{user.name}<sup className="text-sm text-gray-500">{user.role}</sup></p>}

                </div>


                <p className="text-gray-700">{user.email}</p>
                <p className="text-sm text-gray-500">{user.ville}, {user.nationalite}</p>

            </div>
            {/* <div className="flex-1 flex flex-col items-center lg:items-end justify-end px-8 mt-2">
            <div className="flex items-center space-x-4 mt-2">
              <Link to="/SettingProfile">
                <button className="flex items-center bg-blue-600 hover:bg-blue-700 text-gray-100 px-4 py-2 rounded text-sm space-x-2 transition duration-100">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"></path>
                  </svg>
                  <span>Modifier</span>
                </button>
              </Link>
              <button className="flex items-center bg-blue-600 hover:bg-blue-700 text-gray-100 px-4 py-2 rounded text-sm space-x-2 transition duration-100">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clipRule="evenodd"></path>
                </svg>
                <span>Notification</span>
              </button>
            </div>
          </div> */}

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

          <div className="flex-1 bg-white rounded-lg shadow-xl mt-4 p-8">
            <h4 className="text-xl text-gray-900 font-bold">My Activity</h4>
            <div className="relative px-4">
            </div>
          </div>

        </div>
      </div>

    </div>


  );
};



export default Profile;
