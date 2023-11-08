import { ENDPOINT } from "../constants";
import { PhotoDataTypes } from "../types";

const getPhoto = (data: PhotoDataTypes): string => {
  return `${ENDPOINT}upload/${data?._id}.${data?.name?.split(".")[1]}`;
};

const getUsersImage = (data: string): string => {
  return `${ENDPOINT}upload/${data}`;
};

export { getPhoto, getUsersImage };
