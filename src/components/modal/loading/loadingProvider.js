import React, { createContext, useContext, useState } from "react";
import ModalLoading from ".";

const LoadingContext = createContext();

const LoadingProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const showLoading = () => {
    setLoading(true);
  };

  const hideLoading = () => {
    setLoading(false);
  };

  return (
    <LoadingContext.Provider value={{ isLoading: loading, showLoading, hideLoading }}>
        <ModalLoading show={loading}/>
        {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => useContext(LoadingContext);

export { LoadingContext, LoadingProvider };
