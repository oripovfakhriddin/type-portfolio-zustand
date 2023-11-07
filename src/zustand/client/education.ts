import { UserLoginType } from "../auth/login";
import crud from "./crud";

interface ClientOfEducationType {
  _id: string;
  name: string;
  description: string;
  level: string;
  startDate: string;
  endDate: string;
  user: UserLoginType[];
}

const useEducationStoreOfClient = crud<ClientOfEducationType>("education");

export default useEducationStoreOfClient;
