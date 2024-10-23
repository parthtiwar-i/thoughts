import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface AuthContextType {
  login: (token: string) => void;
  logout: () => void;
  jwt: string | null | undefined;
}
const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [jwt, setJwt] = useState<string | null>();

  useEffect(() => {
    // TODO:validate token from backend
    const token = localStorage.getItem("jwt");
    setJwt(token);
  }, []);

  const login = (token: string) => {
    localStorage.setItem("jwt", token);
    setJwt(token);
  };

  const logout = () => {
    localStorage.removeItem("jwt");
  };

  return (
    <AuthContext.Provider value={{ login, logout, jwt }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
