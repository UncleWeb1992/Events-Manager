export interface IUser {
  user: string;
  password: string;
  name: string;
  role: "ADMIN" | "USER";
}

export interface IEvents {
  id: number;
  name: string;
  address: string;
  date: string;
  status: "Выполнен" | "Новый";
  comment: string;
}

export type SortedType = "asc" | "desc";
