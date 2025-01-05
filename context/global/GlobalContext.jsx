"use client";

import { createContext, useState } from "react";

export const CreateContextWrapper = createContext();

const CreateContextProvider = ({ children }) => {
  const [selectedVideoId, setSelectedVideoId] = useState(null);
  const [selectedVideoThumbnail, setSelectedVideoThumbnail] = useState(null);

  const contextValue = {
    selectedVideoId,
    setSelectedVideoId,
    selectedVideoThumbnail,
    setSelectedVideoThumbnail,
  };

  return (
    <CreateContextWrapper.Provider value={contextValue}>
      {children}
    </CreateContextWrapper.Provider>
  );
};

export default CreateContextProvider;
