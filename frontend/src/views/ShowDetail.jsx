import React, { useEffect, useState } from 'react';
import axiosClient from '../axois-client.js';
import { useStateContext } from '../contexts/ContextProvider.jsx';
import { useParams,Link } from 'react-router-dom';

export default function ShowDetail() {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { notification } = useStateContext();
  const { id } = useParams();

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


  return (
    <div className="h-full bg-gray-200 p-8">
       {notification &&
          <div className="notification">
            {notification}
          </div>
        }

      <div className="bg-white rounded-lg shadow-xl pb-8">

            <div className="w-full h-[250px]">

                <img src="https://vojislavd.com/ta-template-demo/assets/img/profile-background.jpg"
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
                {user.id && <p className="text-2xl">{user.name}<sup className="text-sm text-gray-500">{user.role}</sup></p>}
                <span className="bg-blue-500 rounded-full p-1" title="Verified">
                        <svg xmlns="http://www.w3.org/2000/svg" className="text-gray-100 h-2.5 w-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M5 13l4 4L19 7"></path>
                        </svg>
                    </span>
                </div>


                <p className="text-gray-700">{user.email}</p>
                <p className="text-sm text-gray-500">{user.ville}, {user.nationalite}</p>

            </div>
            <div className="flex-1 flex flex-col items-center lg:items-end justify-end px-8 mt-2">
            <div className="flex items-center space-x-4 mt-2">
              <Link to="">
                <button className="flex items-center bg-blue-600 hover:bg-blue-700 text-gray-100 px-4 py-2 rounded text-sm space-x-2 transition duration-100">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"></path>
                  </svg>
                  <span>Add</span>
                </button>
              </Link>
              <Link to="/Home">
              <button className="flex items-center bg-blue-600 hover:bg-blue-700 text-gray-100 px-4 py-2 rounded text-sm space-x-2 transition duration-100">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path>
                        </svg>
                <span>Return</span>
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
      </div>

    </div>

  );
}
