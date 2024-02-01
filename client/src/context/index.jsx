import { useState, createContext } from "react";
import AuthService from "../services/auth-service";

export const GlobalContext = createContext(null);
export const initFormData = {
  title: "",
  text: "",
  authorID: "",
};

export default function GlobalState({ children }) {
  const [formData, setFormData] = useState(initFormData);

  const [postList, setPostList] = useState([]);
  const [loading, setLoading] = useState(true);
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
