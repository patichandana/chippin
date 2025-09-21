import React from "react";

interface FlexMainDivProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

export default function FlexMainDiv({ className, children, ...props }: FlexMainDivProps) {
    return (
        <div className={`min-h-screen w-full flex flex-col bg-gray-50 ${className}`} {...props}>
            {children}
        </div>
    );
}