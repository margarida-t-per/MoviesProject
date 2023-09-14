import React, { createContext, useState, useEffect } from "react";
import { AuthProvider } from "./AuthContext";

const MyContext = createContext();

const AppProvider = ({ children }) => {
  const [myInfo, setMyInfo] = useState([]);
  const [projects, setProjects] = useState([]);
  const [contactInfos, setContactInfos] = useState([]);
  const [socialInfos, setSocialInfos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5173/data/fakeData.json")
      .then((response) => response.json())
      .then((data) => {
        setMyInfo(data.myInfo);
        setProjects(data.projects);
        setContactInfos(data.contactInfos);
        setSocialInfos(data.socialInfos);
      });
  }, []);

  return (
    <AuthProvider>
      <MyContext.Provider
        value={{ myInfo, projects, contactInfos, socialInfos }}
      >
        {children}
      </MyContext.Provider>
    </AuthProvider>
  );
};

export { MyContext, AppProvider };
