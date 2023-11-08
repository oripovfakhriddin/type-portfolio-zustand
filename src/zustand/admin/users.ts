import crud from "./crud";

interface AdminOfUsersType {
  role: string;
  fields: string[];
  client: boolean;
  _id: string;
  firstName: string;
  lastName: string;
  username: string;
  createdAt: string;
  __v: number;
  photo: string;
  info: string;
}

const useUsersStoreOfAdmin = crud<AdminOfUsersType>("users");

export default useUsersStoreOfAdmin;
