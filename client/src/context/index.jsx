import { useState, createContext } from "react";
import AuthService from "../services/auth-service";

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {
  const [formData, setFormData] = useState({
    title: "",
    text: "",
  });

  const [postList, setPostList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser());

  return (
    <GlobalContext.Provider
      value={{
        formData,
        setFormData,
        postList,
        setPostList,
        loading,
        setLoading,
        currentUser,
        setCurrentUser,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
