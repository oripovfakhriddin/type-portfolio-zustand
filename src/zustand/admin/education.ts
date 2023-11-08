import { UserLoginType } from "../auth/login";
import crud from "./crud";

interface AdminOfEducationType {
  _id: string;
  name: string;
  level: string;
  description: string;
  startDate: string;
  endDate: string;
  user: UserLoginType;
  __v: number;
}

const useEducationStoreOfAdmin = crud<AdminOfEducationType>("education");

export default useEducationStoreOfAdmin;
