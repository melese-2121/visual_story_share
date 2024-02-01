import React, { useState, useEffect } from "react";

const Toast = ({ message }) => {
  // State to manage the visibility of the toast
  const [visible, setVisible] = useState(true);

  // Effect to close the toast after 3000 milliseconds (adjust as needed)
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 10000);

    // Clear the timeout if the component unmounts or if onClose is called
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`whitespace-no-wrap bottom-0 right-0 m-4  bg-gradient-to-r from-rose-700 to-rose-400 text-gray-200 font-serif  px-4 py-2 rounded-lg shadow-md ${
        visible ? "" : "hidden"
      }`}
    >
      {message}
    </div>
  );
};

export default Toast;
