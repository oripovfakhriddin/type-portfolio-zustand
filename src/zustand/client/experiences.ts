import { UserLoginType } from "./../auth/login";
import crud from "./crud";

interface ClientOfExperiencesType {
  _id: string;
  workName: string;
  description: string;
  companyName: string;
  startDate: string;
  endDate: string;
  user: UserLoginType[];
}

const useExperiencesStoreOfClient =
  crud<ClientOfExperiencesType>("experiences");

export default useExperiencesStoreOfClient;
