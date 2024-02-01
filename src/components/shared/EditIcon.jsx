// EditIcon.js
import React from "react";
import { FaEdit } from "react-icons/fa";

const EditIcon = ({ onClick }) => {
  return (
    <FaEdit
      onClick={onClick}
      className="text-blue-500 cursor-pointer transition duration-300 ease-in-out transform hover:scale-110"
    />
  );
};

export default EditIcon;
