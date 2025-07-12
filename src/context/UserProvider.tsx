import { useState, useEffect, type ReactNode } from "react";
import { useAuth0, type User } from "@auth0/auth0-react";
import UserContext from "./UserContext";

interface Props {
  children: ReactNode;
}

const UserProvider: React.FC<Props> = ({ children }) => {
  const { user: auth0User, isAuthenticated } = useAuth0();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (isAuthenticated && auth0User) {
      setUser(auth0User);
    }
  }, [auth0User, isAuthenticated]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
