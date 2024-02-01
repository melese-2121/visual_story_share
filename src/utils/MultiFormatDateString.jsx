import React, { useState, useEffect } from "react";

const multiFormatDateString = ({ createdAt }) => {
  const [timeAgo, setTimeAgo] = useState("");

  useEffect(() => {
    const calculateTimeAgo = () => {
      const currentDate = new Date();
      const providedDate = new Date(createdAt);

      const timeDifference = currentDate - providedDate;
      const seconds = Math.floor(timeDifference / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);
      const months = Math.floor(days / 30);
      const years = Math.floor(days / 365);

      if (seconds < 60) {
        setTimeAgo("Just now");
      } else if (minutes === 1) {
        setTimeAgo("A minute ago");
      } else if (minutes < 60) {
        setTimeAgo(`${minutes} minutes ago`);
      } else if (hours === 1) {
        setTimeAgo("An hour ago");
      } else if (hours < 24) {
        setTimeAgo(`${hours} hours ago`);
      } else if (days === 1) {
        setTimeAgo("A day ago");
      } else if (days < 30) {
        setTimeAgo(`${days} days ago`);
      } else if (months === 1) {
        setTimeAgo("A month ago");
      } else if (months < 12) {
        setTimeAgo(`${months} months ago`);
      } else if (years === 1) {
        setTimeAgo("A year ago");
      } else {
        setTimeAgo(`${years} years ago`);
      }
    };

    calculateTimeAgo();
  }, [createdAt]);

  return <span>{timeAgo}</span>;
};

export default multiFormatDateString;
