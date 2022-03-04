import { createContext, Dispatch, SetStateAction, useContext } from "react";

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  // role: string;
}

export interface IAuthContext {
  user: IUser | null;
  setUser: Dispatch<SetStateAction<IUser | null>>;
}

const DEFAULT_CONTEXT: IAuthContext = {
  user: null,
  setUser: () => {},
};

const AuthContext = createContext(DEFAULT_CONTEXT);

const useAuth = () => useContext(AuthContext);

export { AuthContext, useAuth };
