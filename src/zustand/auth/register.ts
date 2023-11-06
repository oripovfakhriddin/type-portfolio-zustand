import { create } from "zustand";
import Cookies from "js-cookie";
import { FormInstance } from "antd";
import { createJSONStorage, persist } from "zustand/middleware";

import request from "../../server/request";
import { TOKEN_PORTFOLIO, USER_PORTFOLIO, USER_STATE } from "../../constants";
import { NavigateFunction } from "react-router-dom";

interface UserRegisterType {
  token: string;
  role: string;
  fields: string[];
  username: string;
  password: string;
  client: boolean;
  createdAt: string;
  firstName: string;
  lastName: string;
  __v: string;
  _id: string;
}

interface LoginStoreType {
  loading: boolean;
  isAuthenticated: boolean;
  user: UserRegisterType[] | null;
  token: string | null;
  role: string | null;
  register: (form: FormInstance, navigate: NavigateFunction) => void;
}

const useRegisterStore = create<LoginStoreType>()(
  persist(
    (set, get) => ({
      loading: false,
      user: null,
      isAuthenticated: false,
      token: null,
      role: null,
      register: async (form, navigate) => {
        try {
          set((state) => ({ ...state, loading: true }));
          const values = await form.validateFields();
          const { data } = await request.post("auth/register", values);
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
          request.defaults.headers.Authorization = `Bearer ${data.token}`;
        } finally {
          set((state) => ({ ...state, loading: false }));
        }
      },
    }),
    {
      name: USER_STATE,
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useRegisterStore;
