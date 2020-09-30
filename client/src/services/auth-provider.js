import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Loader } from 'ui/Components/Loader';

const AuthContext = createContext({ user: null });
export const useAuth = () => useContext(AuthContext);

const setAxiosDefaults = () => {
  axios.defaults.headers.common['Authorization'] = window.localStorage.getItem(
    'token'
  );
};

export const AuthProvider = (props) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  console.log(user);

  useEffect(() => {
    if (!user) return;
    setAxiosDefaults();
  }, [user]);

  useEffect(() => {
    if (!window.localStorage.getItem('token')) {
      return setLoading(false);
    }
    setAxiosDefaults();
    auth();
  }, []);

  const auth = async () => {
    try {
      const { data } = await axios.get('/auth');
      setUser(data);
      setTimeout(() => {
        setLoading(false);
      }, 200);
    } catch (e) {
      console.log(e);
    }
  };

  const logout = () => {
    window.localStorage.removeItem('token');
    setUser(null);
  };

  const login = async (loginData) => {
    try {
      let { data } = await axios.post('/login', loginData);
      window.localStorage.setItem('token', data.token);
      setUser(data.user);
      return data;
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Loader loading={loading} />
      <AuthContext.Provider value={{ user, loading, logout, login }} {...props} />
    </>
  );
};
