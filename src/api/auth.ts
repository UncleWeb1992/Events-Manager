import { IUser } from "@/types/types";
import api from "./api";

interface AuthData {
  name: string;
  password: string;
}

export class Auth {
  static auth = async ({ name, password }: AuthData): Promise<IUser[]> => {
    const result = await api.get<IUser[]>("users", {
      params: {
        user: name,
        password,
      },
    });

    return result.data;
  };
}
