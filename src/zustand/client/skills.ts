import { UserLoginType } from "../auth/login";
import crud from "./crud";

interface ClientOfSkillsType {
  _id: string;
  name: string;
  percent: string;
  user: UserLoginType[];
  __v: number;
}

const useSkillsStoreOfClient = crud<ClientOfSkillsType>("skills");
export default useSkillsStoreOfClient;
