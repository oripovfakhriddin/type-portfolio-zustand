import { NavigateFunction } from "react-router-dom";

import { FormInstance } from "antd";

import Cookies from "js-cookie";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import {
  TOKEN_PORTFOLIO,
  USER_ID,
  USER_PORTFOLIO,
  USER_STATE,
} from "../../constants";
import request from "../../server/request";

export interface UserLoginType {
  token: string;
  role: string;
  fields: string[];
  username: string;
  password: string;
  address: string;
  birthday: string;
  client: boolean;
  createdAt: string;
  email: string;
  facebook: string;
  firstName: string;
  github: string;
  info: string;
  instagram: string;
  lastName: string;
  phoneNumber: string;
  photo: string;
  telegram: string;
  youtube: string;
  __v: string;
  _id: string;
}

interface LoginStoreType {
  loading: boolean;
  isAuthenticated: boolean;
  user: UserLoginType[] | null;
  token: string | null;
  role: string | null;
  login: (form: FormInstance, navigate: NavigateFunction) => void;
  logOut: (navigate: NavigateFunction) => void;
}

const useLoginStore = create<LoginStoreType>()(
  persist(
    (set, get) => ({
      loading: false,
      user: null,
      isAuthenticated: false,
      token: null,
      role: null,
      login: async (form, navigate) => {
        try {
          set((state) => ({ ...state, loading: true }));
          const values = await form.validateFields();
          const { data } = await request.post("auth/login", values);
          set((state) => ({
            ...state,
            token: data.token,
            user: data,
            isAuthenticated: true,
            role: data.user.role,
          }));
          if (get().role === "admin") {
            navigate("/dashboard");
          } else if (get().role === "client") {
            navigate("/client-home");
          } else {
            navigate("/");
          }
          localStorage.setItem(USER_PORTFOLIO, JSON.stringify(data));
          Cookies.set(TOKEN_PORTFOLIO, data.token);
          Cookies.set(USER_ID, data.user._id);
          request.defaults.headers.Authorization = `Bearer ${data.token}`;
        } finally {
          set((state) => ({ ...state, loading: false }));
        }
      },

      logOut: async (navigate) => {
        set({
          loading: false,
          user: null,
          isAuthenticated: false,
          token: null,
          role: null,
        });
        Cookies.remove(TOKEN_PORTFOLIO);
        Cookies.remove(USER_ID);
        localStorage.removeItem(USER_PORTFOLIO);
        navigate("/");
      },
    }),
    {
      name: USER_STATE,
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useLoginStore;
