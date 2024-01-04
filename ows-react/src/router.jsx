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
const router = createBrowserRouter([
  // Routes sous AdminLayout
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

  // Routes sous DefaultLayout
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
    ]
  },

  // Routes sous GuestLayout
  {
    path: "/",
    element: <GuestLayout />,
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
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: '/contact',
        element: <Contact/>
      },
    ],
  },

  // Route indépendante

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
