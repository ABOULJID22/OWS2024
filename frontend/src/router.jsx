import { Navigate, createBrowserRouter } from "react-router-dom";
import Login from "./views/Login";
import Signup from "./views/Signup";
import Users from "./views/Users";
import NotFound from "./views/NotFound.jsx";
import DefaultLayout from "./components/DefaultLayout.jsx";
import GuestLayout from "./components/GuestLayout.jsx";
import AdminLayout from "./components/AdminLayout.jsx";
import Dashboard from "./views/Dashboard.jsx";
import Home from "./views/Home.jsx";
import UserForm from "./views/UserForm.jsx";
import Contact from"./views/Contact.jsx";
import About from "./views/About.jsx";
import Profile from "./views/Profile.jsx";
import SettingProfile from "./views/SettingProfile.jsx";
import GuestHome from "./views/GeustHome.jsx";
import ShowDetail from "./views/ShowDetail.jsx";
const router = createBrowserRouter([

  // Routes pour GuestLayout
  {
    path: "/",
    element: <GuestLayout />,
    children: [
      {
        path: '/',
        element: <Navigate to='/Guesthome' />
      },
      {
        path: "/Guesthome",
        element: <GuestHome />,
      },
      {
        path: "/login",
        element: <Login/>,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: '/contact',
        element: <Contact/>
      },
      {
        path: '/about',
        element: <About/>
      },


    ],
  },

  // Routes pour DefaultLayout
  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      {
        path: '/',
        element: <Navigate to='/home' />
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: '/contact',
        element: <Contact/>
      },
      {
        path: '/about',
        element: <About/>
      },
      {
        path: '/profile',
        element: <Profile/>
      },
      {
        path: '/SettingProfile',
        element: <SettingProfile />
      },
      {
        path: '/ShowDetail/:id',
        element: <ShowDetail />
      },

    ]
  },

 // Routes pour AdminLayout
 {
  path: '/',
  element: <AdminLayout />,
  children: [
    {
      path: '/',
      element: <Navigate to='/users' />
    },
    {
      path: '/users',
      element: <Users />
    },
    {
      path: '/users/new',
      element: <UserForm key="userCreate" />
    },
    {
      path: '/users/:id',
      element: <UserForm key="userUpdate" />
    },
    {
      path: '/dashboard',
      element: <Dashboard />
    },

  ]
},

  // Route NotFound
  {
    path: "*",
    element: <NotFound />,
  },

  {
    path: '/home',
    element: <Home />
  },

]);

export default router;
