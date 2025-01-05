"use client";
import { createContext, useState } from "react";

export const ActiveComponentWrapper = createContext();

const ActiveComponentContext = ({ children }) => {
  const [activeComponent, setactiveComponent] = useState("Create");

  const context = { activeComponent, setactiveComponent };

  return (
    <ActiveComponentWrapper.Provider value={context}>
      {children}
    </ActiveComponentWrapper.Provider>
  );
};

export default ActiveComponentContext;
