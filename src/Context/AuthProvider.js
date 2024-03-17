import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("site") || "");
  const navigate = useNavigate();

  const loginAction = async (data) => {
    try {
      const response = await fetch("http://localhost:4000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        // Handle non-successful response (e.g., 4xx or 5xx errors)
        throw new Error(`Failed to log in. Status: ${response.status}`);
      }

      const res = await response.json();
      console.log(res);

      if (res.token) {
        setUser(res.token);
        setToken(res.token);
        localStorage.setItem("site", res.token);
        navigate("/admin");
        return;
      } else {
        // If the response doesn't contain data, something unexpected happened
        throw new Error("Invalid response format. Data not available.");
      }
    } catch (err) {
      // Log and re-throw the error for further investigation
      console.error("Login failed:", err);
      throw err;
    }
  };

  const logOut = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("site");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ token, user, loginAction, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
