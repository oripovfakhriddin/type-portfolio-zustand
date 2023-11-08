import { FormInstance } from "antd";
import { RcFile, UploadChangeParam, UploadFile } from "antd/es/upload";

import dayjs from "dayjs";
import Cookies from "js-cookie";
import { create } from "zustand";

import { LIMIT, USER_ID } from "../../constants";
import request from "../../server/request";
import { PaginationDataTypes, PhotoDataTypes } from "../../types";

const crud = <T>(url: string) => {
  interface ApiData {
    pagination: PaginationDataTypes;
    data: T[];
  }

  interface ClientOfDataStoreType {
    loading: boolean;
    loadingPhoto: boolean;
    activePage: number;
    search: string;
    selected: string | null;
    data: T[];
    total: number;
    activeTab: string;
    photoData: PhotoDataTypes | null;
    setActivePage: (page: number) => void;
    setActiveTab: (key: string, form: FormInstance) => void;
    getData: () => void;
    handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
    deleteData: (id: string) => void;
    addData: (form: FormInstance) => void;
    editData: (id: string, form: FormInstance) => void;
    handlePhoto: (info: UploadChangeParam<UploadFile>) => void;
  }

  return create<ClientOfDataStoreType>()((set, get) => ({
    loading: false,
    loadingPhoto: false,
    data: [],
    search: "",
    selected: null,
    activePage: 1,
    total: 0,
    activeTab: "1",
    photoData: null,

    handlePhoto: async (info) => {
      try {
        set({ loadingPhoto: true });
        const formdata = new FormData();
        formdata.append("file", info.file.originFileObj as RcFile);
        const { data } = await request.post<PhotoDataTypes>("upload", formdata);
        set({ photoData: data });
      } finally {
        set({ loadingPhoto: false });
      }
    },

    getData: async () => {
      try {
        set((state) => ({ ...state, loading: true }));
        const params = {
          user: Cookies.get(USER_ID),
          search: get().search,
          page: get().activePage,
          limit: LIMIT,
        };
        const {
          data: {
            data,
            pagination: { total },
          },
        } = await request.get<ApiData>(url, {
          params,
        });
        set((state) => ({ ...state, data, total }));
      } finally {
        set((state) => ({ ...state, loading: false }));
      }
    },

    setActiveTab: async (key, form) => {
      if (key === "1") {
        form.resetFields();
        set((state) => ({ ...state, selected: null }));
      }
      set((state) => ({ ...state, activeTab: key }));
    },

    setActivePage: async (page) => {
      set((state) => ({ ...state, activePage: page }));
      get().getData();
    },

    handleSearch: async (e) => {
      set((state) => ({ ...state, search: e.target.value }));
      get().getData();
    },

    deleteData: async (id) => {
      try {
        set((state) => ({ ...state, loading: true }));
        await request.delete(`${url}/${id}`);
        set({ activePage: 1 });
        get().getData();
      } finally {
        set((state) => ({ ...state, loading: false }));
      }
    },

    addData: async (form) => {
      try {
        set((state) => ({ ...state, loading: true }));
        let data = await form.validateFields();

        if (url === "experiences" || url === "education") {
          const start: string = data?.startDate?.toISOString().split("T")[0];
          const end: string = data?.endDate?.toISOString().split("T")[0];
          data = { ...data, startDate: start, endDate: end };
        }

        if (url === "portfolios") {
          data = { ...data, photo: get().photoData?._id };
          console.log(data);
        }

        if (get().selected === null) {
          await request.post(url, data);
        } else {
          await request.put(`${url}/${get().selected}`, data);
        }

        set((state) => ({ ...state, activeTab: "1", loading: true }));
        get().getData();
        form.resetFields();
      } finally {
        set((state) => ({ ...state, loading: false, selected: null }));
      }
    },

    editData: async (id, form) => {
      try {
        set((state) => ({ ...state, loading: true }));
        let { data } = await request.get(`${url}/${id}`);
        if (url === "experiences" || url === "education") {
          const start = dayjs(data?.startDate);
          const end = dayjs(data?.endDate);
          data = { ...data, startDate: start, endDate: end };
        }

        if (url === "portfolios") {
          set({ photoData: data.photo });
        }

        form.setFieldsValue(data);
        set((state) => ({ ...state, activeTab: "2", selected: id }));
      } finally {
        set((state) => ({ ...state, loading: false }));
      }
    },
  }));
};

export default crud;
