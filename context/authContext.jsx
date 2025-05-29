import {
  Children,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
const AuthContext = createContext();

export const authProvider = ({ Children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const localuser = JSON.parse(localStorage.getItem("user"));
    if (localuser) setUser(localuser);
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {Children}
    </AuthContext.Provider>
  );
};

export const auth = () => useContext(AuthContext);
