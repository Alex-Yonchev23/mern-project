import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="spinner-overlay absolute inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50">
      <div className="spinner border-t-4 border-white border-solid h-6 w-6 rounded-full animate-spin"></div>
    </div>
  );
};

export default LoadingSpinner;
