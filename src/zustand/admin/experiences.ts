import { UserLoginType } from "../auth/login";
import crud from "./crud";

interface AdminOfExperiencesType {
  _id: string;
  workName: string;
  description: string;
  companyName: string;
  startDate: string;
  endDate: string;
  __v: number;
  user: UserLoginType[];
}

const useExperiencesStoreOfAdmin = crud<AdminOfExperiencesType>("experiences");

export default useExperiencesStoreOfAdmin;
