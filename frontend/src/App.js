import React, { useContext, useEffect, useState } from "react";
import ScrollToTop from "./components/scrolltotop";
import "./style/style.css"
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from "./pages/Home";
import BooksPage from "./pages/BooksPage";
import AboutPage from "./pages/AboutPage";
import ErrorPage from "./pages/ErrorPage";
import OutletMain from "./pages/OutletMain";
import Authentification from "./pages/Authentification";
import ProfilePage from "./pages/ProfilePage";
import axios from 'axios';
import Context from "./components/app_context";
import LoadingLayer from "./components/loadingLayer";

const App = () => {

  const ctx = useContext(Context);

  const [isLoading, setIsLoading] = useState(false);

  const initialIsLoginCheck = async () => {
    setIsLoading(true);
    const res = await axios({
      method: 'GET',
      withCredentials: true,
      url: 'https://stacked-shelves-hh7u2ufv7-kessas-youssef.vercel.app/checkAuth'
    }
    );
    if (res.data.status) {
      ctx.login(res.data.userData);
      ctx.setNotifHandler({ text: res.data.message, status: res.data.status });
    }

    setIsLoading(false);
  }

  useEffect(() => {
    initialIsLoginCheck();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])



  const router = createBrowserRouter([
    {
      path: '/', element: <OutletMain />, errorElement: <ErrorPage keyWord='Page' />,
      children: [
        { path: '/', element: <Home /> },
        { path: 'home', element: <Home /> },
        { path: 'books', element: <BooksPage /> },
        { path: 'about', element: <AboutPage /> },
        { path: 'profile', element: <ProfilePage /> },
        {
          path: 'auth', element: <Authentification />,
          children: [
            { path: ':logOrSignin', element: <Authentification /> }
          ]
        },
        { path: 'error', errorElement: <ErrorPage keyWord='Page' /> }
      ]
    },

  ])
  return (
    <div>
      <RouterProvider router={router} />
      <ScrollToTop />
      {
        isLoading
        &&
        <LoadingLayer />
      }
    </div>
  );
};

export default App;
