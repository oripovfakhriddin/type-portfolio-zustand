import { UserLoginType } from "../auth/login";
import crud from "./crud";

interface AdminOfSkillsType {
  _id: string;
  name: string;
  percent: string;
  user: UserLoginType[];
  __v: number;
}

const useSkillsStoreOfAdmin = crud<AdminOfSkillsType>("skills");

export default useSkillsStoreOfAdmin;
