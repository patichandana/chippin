import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: React.ReactNode;
}

export default function Button({ className, children, ...props }: ButtonProps) {
  return (
    <button className={` py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition ${className}`} 
      {...props}>
      {children}
    </button>
  );
}
