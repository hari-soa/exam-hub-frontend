import React from 'react';

export default function Button({ children, className = '', onClick, type = 'button', ...props }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-transform hover:bg-blue-700 active:scale-95 focus:outline-none ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
