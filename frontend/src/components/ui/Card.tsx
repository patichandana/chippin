import React from "react";

interface CardProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  className?: string;
  children: React.ReactNode;
  title?: string;
}
export default function Card({ className, children, ...props }: CardProps) {
  return (

    <div className={`shadow-md bg-white rounded-xl p-3 sm:p-6 md:p-8 m-0 sm:m-4 ${className}`}>
      <p className={`text-3xl font-light mb-6 ${props.title ? "block": "hidden"}`}>{props.title}</p>
      {children}
    </div>
  );
}
