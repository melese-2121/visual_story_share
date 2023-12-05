const Loading = ({ text, isLoading }) => {
  return (
    <div className="flex items-center justify-center w-full -ml-4">
      <svg
        className="animate-spin h-6 w-6 mr-3 border-t-4 border-b-4 border-blue-900 rounded-full"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
      >
        <circle
          cx="12"
          cy="12"
          r="10"
          strokeWidth="3"
          stroke="rgba(0, 0, 0, 0.3)"
          fill="none"
        ></circle>
      </svg>
      <span className="text-slate-900"> {text}</span>
      <div className="flex space-x-1 ml-1 mt-1">
        <div
          className={`w-1.5 h-1.5 rounded-full bg-blue-900 opacity-90 ${
            isLoading ? "animate-pulse" : ""
          }`}
        />
        <div
          className={`w-1.5 h-1.5 rounded-full bg-blue-900 opacity-60 ${
            isLoading ? "animate-pulse" : ""
          }`}
        />
        <div
          className={`w-1.5 h-1.5 rounded-full bg-blue-900 opacity-30 ${
            isLoading ? "animate-pulse" : ""
          }`}
        />
      </div>
    </div>
  );
};

export default Loading;
