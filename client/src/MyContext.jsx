import React, { createContext, useContext, useState } from "react";

const MyContext = createContext();

export function useMyContext() {
  return useContext(MyContext);
}

export function MyProvider({ children }) {
  const [myData, setMyData] = useState(null);

  return (
    <MyContext.Provider value={{ myData, setMyData }}>
      {children}
    </MyContext.Provider>
  );
}
