import React from "react";

interface BrandLogoProps {
  className?: string;
  showSubtitle?: boolean;
  subtitleText?: string;
  variant?: "auto" | "white" | "navy" | "black" | "green";
  height?: number | string;
}

export function BrandLogo({
  className = "",
  showSubtitle = false,
  subtitleText = "Biyomedikal Teknolojileri",
  variant = "auto",
  height = 40,
}: BrandLogoProps) {
  // Variant color overrides if explicitly requested, otherwise automatic CSS variables
  let strokeColor = "var(--color-text)";
  let cbcColor = "var(--color-text)";
  let accentColor = "var(--color-primary)";

  if (variant === "white") {
    strokeColor = "#08121B";
    cbcColor = "#08121B";
    accentColor = "#176B59";
  } else if (variant === "navy") {
    strokeColor = "#FFFFFF";
    cbcColor = "#FFFFFF";
    accentColor = "#27A184";
  } else if (variant === "black") {
    strokeColor = "#FFFFFF";
    cbcColor = "#FFFFFF";
    accentColor = "#29A37F";
  } else if (variant === "green") {
    strokeColor = "#F2FAF7";
    cbcColor = "#F2FAF7";
    accentColor = "#45B890";
  }

  return (
    <div className={`inline-flex flex-col items-start select-none ${className}`}>
      <svg
        viewBox="0 0 380 64"
        style={{ height: typeof height === "number" ? `${height}px` : height, width: "auto" }}
        className="w-auto max-w-full overflow-visible transition-colors duration-200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Cebeci Medikal Logo"
      >
        <g transform="translate(4, 2)">
          {/* Outer Brackets with Smooth Caps */}
          <path
            d="M 26 7 L 8 18 L 8 42 L 26 53"
            fill="none"
            stroke={strokeColor}
            strokeWidth="5.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-colors duration-200"
          />
          <path
            d="M 34 7 L 52 18 L 52 42 L 34 53"
            fill="none"
            stroke={strokeColor}
            strokeWidth="5.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-colors duration-200"
          />
          {/* Medical Center Plus Symbol */}
          <path
            d="M 27 20 L 33 20 L 33 27 L 40 27 L 40 33 L 33 33 L 33 40 L 27 40 L 27 33 L 20 33 L 20 27 L 27 27 Z"
            fill={accentColor}
            className="transition-colors duration-200"
          />
          {/* Typography: CBC MEDİKAL */}
          <text
            x="68"
            y="42"
            fontFamily="Inter, system-ui, -apple-system, sans-serif"
            fontSize="34"
            fontWeight="900"
            letterSpacing="1"
          >
            <tspan fill={cbcColor} className="transition-colors duration-200">
              CBC
            </tspan>
            <tspan fill={accentColor} dx="10" className="transition-colors duration-200">
              MEDİKAL
            </tspan>
          </text>
        </g>
      </svg>

      {showSubtitle && (
        <span className="text-[10px] sm:text-[11px] font-semibold text-foreground-muted tracking-wider uppercase pl-[72px] -mt-1 hidden xs:block">
          {subtitleText}
        </span>
      )}
    </div>
  );
}
