import React, { useState, useEffect } from "react";

export const TimeAgo = ({ dateString }) => {
  const [timeAgo, setTimeAgo] = useState("");

  useEffect(() => {
    const updateAgo = () => {
      const currentDate = new Date();
      const previousDate = new Date(dateString);

      const timeDifference = currentDate - previousDate;
      const seconds = Math.floor(timeDifference / 1000);

      if (seconds < 60) {
        setTimeAgo("just now");
      } else if (seconds < 3600) {
        const minutes = Math.floor(seconds / 60);
        setTimeAgo(`${minutes} minute${minutes === 1 ? "" : "s"} ago`);
      } else if (seconds < 86400) {
        const hours = Math.floor(seconds / 3600);
        setTimeAgo(`${hours} hour${hours === 1 ? "" : "s"} ago`);
      } else if (seconds < 2592000) {
        // 30 days (approximate month)
        const days = Math.floor(seconds / 86400);
        setTimeAgo(`${days} day${days === 1 ? "" : "s"} ago`);
      } else if (seconds < 31536000) {
        // 365 days (approximate year)
        const months = Math.floor(seconds / 2592000);
        setTimeAgo(`${months} month${months === 1 ? "" : "s"} ago`);
      } else {
        const years = Math.floor(seconds / 31536000);
        setTimeAgo(`${years} year${years === 1 ? "" : "s"} ago`);
      }
    };

    updateAgo();

    const intervalId = setInterval(updateAgo, 60000); // Update every minute

    return () => clearInterval(intervalId);
  }, [dateString]);

  return <span>{timeAgo}</span>;
};
