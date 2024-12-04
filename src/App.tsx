import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import axios from 'axios';

import Layout from 'layout';
import Home from "pages/home";
import Loader from "components/common/Loader";

import routes from 'routes';
import { useAuthStore } from "store";
import { toast } from "sonner";

export default function App() {
  const [loading, setLoading] = useState<boolean>(false);
  const { token, logIn, logOut } = useAuthStore() as {
    token: string,
    logIn: (token: string) => void,
    logOut: () => void
  };

  useEffect(() => {
    if (token !== null) {
      logIn(token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      logOut();
      delete axios.defaults.headers.common['Authorization'];
    }

    const interceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 401) {
          logOut();
          toast('Your session has expired. Please log in again.');
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.response.eject(interceptor);
    };

  }, [token]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <Routes>
      <Route index element={<Home />} />
      <Route element={<Layout />}>
        {routes.map((route: { path: string; component: React.FC }, index: number) => {
          const { path, component: Component } = route;
          return (
            <Route
              key={index}
              path={path}
              element={
                <Component />
              }
            />
          );
        })}
      </Route>
    </Routes>
  )
}