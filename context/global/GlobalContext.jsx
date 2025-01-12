"use client";

import { createContext, useState } from "react";

export const CreateContextWrapper = createContext();

const CreateContextProvider = ({ children }) => {
  const [choosenNewsLetterInputs, setChoosenNewsLetterInputs] = useState(null);

  console.log(choosenNewsLetterInputs);

  const contextValue = {
    choosenNewsLetterInputs,
    setChoosenNewsLetterInputs,
  };

  return (
    <CreateContextWrapper.Provider value={contextValue}>
      {children}
    </CreateContextWrapper.Provider>
  );
};

export default CreateContextProvider;
