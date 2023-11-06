import Cookies from "js-cookie";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { LIMIT, USER_DATA_STATE, USER_ID } from "../../constants";
import request from "../../server/request";
import { UserLoginType } from "../auth/login";
import { FormInstance } from "antd";

interface ClientOfSkillsType {
  _id: string;
  name: string;
  percent: string;
  user: UserLoginType[];
  __v: number;
}

interface ClientOfSkillStoreType {
  loading: boolean;
  activePage: number;
  search: string;
  selected: string | null;
  skills: ClientOfSkillsType[];
  total: number;
  activeTab: string;
  setActivePage: (page: number) => void;
  setActiveTab: (key: string, form: FormInstance) => void;
  getSkills: () => void;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  deleteSkill: (id: string) => void;
  addSkill: (form: FormInstance) => void;
  editSkill: (id: string, form: FormInstance) => void;
}

const useSkillsStoreOfClient = create<ClientOfSkillStoreType>()(
  persist(
    (set, get) => ({
      loading: false,
      skills: [],
      search: "",
      selected: null,
      activePage: 1,
      total: 0,
      activeTab: "1",
      setActiveTab: (key, form) => {
        if (key === "1") {
          form.resetFields();
          set((state) => ({ ...state, selected: null }));
        }
        set((state) => ({ ...state, activeTab: key }));
      },
      setActivePage: (page) => {
        console.log(page);
      },
      getSkills: async () => {
        try {
          const params = {
            user: Cookies.get(USER_ID),
            search: get().search,
            page: get().activePage,
            limit: LIMIT,
          };
          set((state) => ({ ...state, loading: true }));
          const {
            data: { data, pagination },
          } = await request.get(`skills`, {
            params,
          });

          set((state) => ({
            ...state,
            skills: data,
            total: pagination.total,
          }));
        } finally {
          set((state) => ({ ...state, loading: false }));
        }
      },
      handleSearch: (e) => {
        set((state) => ({ ...state, search: e.target.value }));
        get().getSkills();
      },
      deleteSkill: async (id) => {
        try {
          set((state) => ({ ...state, loading: true }));
          await request.delete(`skills/${id}`);
          get().getSkills();
        } finally {
          set((state) => ({ ...state, loading: false }));
        }
      },
      addSkill: async (form) => {
        try {
          set((state) => ({ ...state, loading: true }));
          const data = await form.validateFields();
          if (get().selected === null) {
            await request.post("skills", data);
          } else {
            await request.put(`skills/${get().selected}`, data);
          }
          set((state) => ({ ...state, activeTab: "1", loading: true }));
          get().getSkills();
          form.resetFields();
        } finally {
          set((state) => ({ ...state, loading: false }));
        }
      },
      editSkill: async (id, form) => {
        try {
          set((state) => ({ ...state, loading: true, selected: id }));
          const { data } = await request.get(`skills/${id}`);
          form.setFieldsValue(data);
          set((state) => ({ ...state, activeTab: "2" }));
        } finally {
          set((state) => ({ ...state, loading: false }));
        }
      },
    }),
    {
      name: USER_DATA_STATE,
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useSkillsStoreOfClient;
