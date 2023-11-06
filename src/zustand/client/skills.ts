import crud from "./crud";
import { UserLoginType } from "../auth/login";

interface ClientOfSkillsType {
  _id: string;
  name: string;
  percent: string;
  user: UserLoginType[];
  __v: number;
}

const useSkillsStoreOfClient = crud<ClientOfSkillsType>("skills");
export default useSkillsStoreOfClient;
