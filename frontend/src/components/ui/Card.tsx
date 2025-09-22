import React from "react";

interface CardProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  className?: string;
  children: React.ReactNode;
}
export default function Card({ className, children, ...props }: CardProps) {
  return (
    <div className={`shadow-md bg-white rounded-xl p-10 max-w-md flex-grow-0 ${className}`} {...props}>
      {children}
    </div>
  );
}
