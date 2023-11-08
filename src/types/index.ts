export interface PaginationDataTypes {
  next: number;
  limit: number;
  page: number;
  total: number;
}

export interface PhotoDataTypes {
  _id: string;
  name: string;
  user: string;
  __v: number;
}
