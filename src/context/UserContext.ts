import { createContext } from "react";
import type { User } from "@auth0/auth0-react";

export interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const UserContext = createContext<UserContextType | null>(null);

export default UserContext;
