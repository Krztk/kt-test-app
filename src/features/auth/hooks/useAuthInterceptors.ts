import { axios } from "lib/axios";
import { useEffect } from "react";
import storage from "utils/storage";
import { useAuth } from "./useAuth";

const useAuthInterceptors = () => {
  const { userData, setUserData } = useAuth();

  useEffect(() => {
    const requestInterceptor = axios.interceptors.request.use(
      (config) => {
        if (!config.headers) {
          config.headers = {};
        }
        if (!config.headers?.["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${userData?.token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseInterceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          setUserData(null);
          storage.clearUserData();
        }
        return Promise.reject(error);
      }
    );
    return () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, [userData, setUserData]);
};

export default useAuthInterceptors;
