import React from "react";

interface CardProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  className?: string;
  children: React.ReactNode;
  title?: string;
}
export default function Card({ className, children, ...props }: CardProps) {
  return (
    <div className={className}>
      <p className="text-3xl font-light my-4 m-10 mb-0">{props.title}</p>
      <div className={`shadow-md bg-white rounded-xl p-10 m-10 mt-5`}>{children}</div>
    </div>
  );
}
