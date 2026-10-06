import { createContext, useContext } from "react";

// Create context
const AuthContext = createContext();

// Provide context
export const AuthProvider = ({ children }) => {
    const user = null

  return (
    <AuthContext.Provider
      value={{ user }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Consume context
export const useAuth = () => {
  return useContext(AuthContext);
};
