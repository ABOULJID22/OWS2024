import React from 'react'
import store from'./views/Redux/store'
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from "./router";
import { ContextProvider } from './contexts/ContextProvider';
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <Provider store={store}>
     <ContextProvider>
      <RouterProvider router={router}/>
    </ContextProvider>
    </Provider>
  </React.StrictMode>,
)
