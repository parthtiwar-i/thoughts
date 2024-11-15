import axios from "axios";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { BACKEND_URL } from "./config";
import showAlert from "./helper/Alert";

interface User {
  id: string;
  name: string;
  email: string;
  // ... add other user properties
}

interface AuthContextType {
  login: (token: string) => void;
  logout: () => void;
  jwt: string | null | undefined;
  user: User | null;
  isLoading: boolean;
  refetchUser: () => Promise<void>; // Added for manual user data refresh
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [jwt, setJwt] = useState<string | null>(() =>
    localStorage.getItem("jwt")
  );
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch user data function
  const fetchUserData = async (token: string) => {
    try {
      const response = await axios.get(`${BACKEND_URL}/user/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data.userData);
    } catch (error) {
      showAlert("Please try again", "error");
      // Handle error appropriately
    }
  };

  // Function to manually refresh user data
  const refetchUser = async () => {
    if (jwt) {
      await fetchUserData(jwt);
    }
  };

  useEffect(() => {
    const verifyAndFetchUser = async (token: string) => {
      setIsLoading(true);
      try {
        // First verify the token
        const authResponse = await axios.get(
          `${BACKEND_URL}/user/authenticate`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (authResponse.data.verified) {
          setJwt(token);
          // If token is valid, fetch user data
          await fetchUserData(token);
        } else {
          logout();
        }
      } catch (error) {
        console.error("Authentication error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    const token = localStorage.getItem("jwt");
    if (token) {
      verifyAndFetchUser(token);
    } else {
      setIsLoading(false);
    }
  }, [jwt]);

  const login = async (token: string) => {
    localStorage.setItem("jwt", token);
    setJwt(token);
    await fetchUserData(token);
  };

  const logout = () => {
    localStorage.removeItem("jwt");
    setJwt(null);
    setUser(null);
    showAlert("Logged out", "success");
  };

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        jwt,
        user,
        isLoading,
        refetchUser,
      }}
    >
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
