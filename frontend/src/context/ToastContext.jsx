import { createContext, useContext, useState } from "react";

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState(null);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 2500);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && <Toast message={toast} />}
    </ToastContext.Provider>
  );
};

const Toast = ({ message }) => (
  <div style={styles.toast}>
    {message}
  </div>
);

const styles = {
  toast: {
    position: "fixed",
    bottom: "30px",
    right: "30px",
    background: "#000",
    color: "#fff",
    padding: "12px 18px",
    borderRadius: "10px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
    fontSize: "14px",
    zIndex: 9999
  }
};

export const useToast = () => useContext(ToastContext);
