import { useState, createContext } from "react";

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {
  const [formData, setFormData] = useState({
    title: "",
    text: "",
  });

  const [postList, setPostList] = useState([]);
  const [loading, setLoading] = useState(false);

  return (
    <GlobalContext.Provider
      value={{
        formData,
        setFormData,
        postList,
        setPostList,
        loading,
        setLoading,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
