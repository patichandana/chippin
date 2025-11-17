import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  textInput?: "small" | "large";
  children?: React.ReactNode;
  label?: string;
}

export default function TextInput({
  className = "",
  textInput = "small",
  children,
  ...props
}: InputProps) {
  return (
    <div>
      {props.label ? (
        <p className="w-fit max-w-fit mb-2">{props.label}</p>
      ) : (
        <p className="w-fit max-w-fit invisible mb-2">dummy label </p>
      )}
      {textInput == "large" ? (
        <textarea
          className={`px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 ${className}`}
          {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : (
        <input
          className={`px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 ${className}`}
          {...props}
        />
      )}
      {children}
    </div>
  );
}
