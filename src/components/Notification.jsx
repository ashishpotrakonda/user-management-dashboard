import { useEffect } from "react";

const Notification = ({ message, type, onClose }) => {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClose();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className={`fixed inset-0 flex items-center justify-center z-50`}>
      <div
        className={`px-6 py-3 rounded shadow-lg text-white text-center 
          ${type === "success" ? "bg-green-500" : ""}
          ${type === "error" ? "bg-red-500" : ""}
          animate-fade-in
        `}
      >
        {message}
      </div>
    </div>
  );
};

export default Notification;
