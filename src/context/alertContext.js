import { createContext, useContext, useState, useCallback } from "react";

const AlertContext = createContext(undefined);

export const AlertProvider = ({ children }) => {
  const [state, setState] = useState({
    isOpen: false,
    type: "success",
    message: "",
  });

  const onOpen = useCallback((type, message) => {
    setState({ isOpen: true, type, message });
  }, []);

  const onClose = useCallback(() => {
    setState({
      isOpen: false,
      type: "",
      message: "",
    });
  }, []);

  return (
    <AlertContext.Provider
      value={{
        ...state,
        onOpen,
        onClose,
      }}
    >
      {children}
    </AlertContext.Provider>
  );
};

export const useAlertContext = () => useContext(AlertContext);
