import { PhotoDataTypes } from "../../types";
import { UserLoginType } from "../auth/login";
import crud from "./crud";

interface ClientOfPortfoliosType {
  _id: string;
  name: string;
  url: string;
  description: string;
  photo: PhotoDataTypes[];
  user: UserLoginType[];
  __v: number;
}

const usePortfoliosStoreOfClient = crud<ClientOfPortfoliosType>("portfolios");

export default usePortfoliosStoreOfClient;
