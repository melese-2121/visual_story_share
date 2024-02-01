// DeleteIcon.js
import React from "react";
import { FaTrash } from "react-icons/fa";

const DeleteIcon = ({ onClick }) => {
  return (
    <FaTrash
      onClick={onClick}
      className="text-red cursor-pointer transition duration-300 ease-in-out transform hover:scale-110"
    />
  );
};

export default DeleteIcon;
