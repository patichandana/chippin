// SvgRenderer.tsx
import React from "react";

// Import your SVGs as React components

import { ReactComponent as PizzaSVG } from "../../assets/undraw_pizza-sharing.svg";
import { ReactComponent as WelcomeSVG } from "../../assets/undraw_welcome-cats.svg";
// import { ReactComponent as TravelSVG } from "./travel.svg";

const svgMap = {
  pizza: PizzaSVG,
  welcome: WelcomeSVG
} as const;

type SvgName = keyof typeof svgMap;

interface SvgRendererProps {
  name: SvgName;
  className?: string;
  width?: string | number;
  height?: string | number;
  fillColor?: string;
}

const SvgRenderer: React.FC<SvgRendererProps> = ({
  name,
  className = "",
  width,
  height,
  fillColor,
}) => {
  const SvgComponent = svgMap[name];

  return (
    <div 
      className={`flex justify-center items-center ${className}`} 
      style={{ 
        width : width || "100%",
        height: height || "auto" }}
      >
      <SvgComponent
        className = {`w-full h-auto ${fillColor ? "" : "fill-current text-gray-700 dark:text-gray-200"}`}
        style={fillColor ? { fill: fillColor } : undefined}
      />
    </div>

  );
};

export default SvgRenderer;
