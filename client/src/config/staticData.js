import React from "react";

export const staticData = {
  lol: "no",
};

export const staticDataContext = React.createContext(staticData);
export const StaticDataProvider = ({ children }) => (
  <staticDataContext.Provider value={staticData}>
    {children}
  </staticDataContext.Provider>
);
