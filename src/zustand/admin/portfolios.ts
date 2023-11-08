import { PhotoDataTypes } from "../../types";
import { UserLoginType } from "../auth/login";
import crud from "./crud";

interface AdminOfPortfoliosType {
  _id: string;
  name: string;
  description: string;
  photo: PhotoDataTypes[];
  url: string;
  user: UserLoginType[];
  __v: number;
}

const usePortfoliosStoreOfAdmin = crud<AdminOfPortfoliosType>("portfolios");

export default usePortfoliosStoreOfAdmin;
