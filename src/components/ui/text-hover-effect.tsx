"use client";
import React, { useRef, useEffect, useState, useId } from "react";
import { motion, useInView } from "motion/react";

export const TextHoverEffect = ({
  text,
  duration,
}: {
  text: string;
  duration?: number;
  automatic?: boolean;
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const isInView = useInView(svgRef, { once: true, margin: "-100px" });
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [maskPosition, setMaskPosition] = useState({ cx: "50%", cy: "50%" });
  const uniqueId = useId();
  const gradientId = `textGradient-${uniqueId}`;
  const revealMaskId = `revealMask-${uniqueId}`;
  const textMaskId = `textMask-${uniqueId}`;

  useEffect(() => {
    if (svgRef.current && cursor.x !== null && cursor.y !== null) {
      const svgRect = svgRef.current.getBoundingClientRect();
      const cxPercentage = ((cursor.x - svgRect.left) / svgRect.width) * 100;
      const cyPercentage = ((cursor.y - svgRect.top) / svgRect.height) * 100;
      setMaskPosition({
        cx: `${cxPercentage}%`,
        cy: `${cyPercentage}%`,
      });
    }
  }, [cursor]);

  return (
    <svg
      ref={svgRef}
      width="100%"
      height="100%"
      viewBox="0 0 300 120"
      preserveAspectRatio="xMinYMid meet"
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
      className="select-none"
    >
      <defs>
        <linearGradient
          id={gradientId}
          gradientUnits="userSpaceOnUse"
          cx="50%"
          cy="50%"
          r="25%"
        >
          {hovered && (
            <>
              <stop offset="0%" stopColor="var(--chart-4)" />
              <stop offset="25%" stopColor="var(--chart-1)" />
              <stop offset="50%" stopColor="var(--chart-3)" />
              <stop offset="75%" stopColor="var(--chart-2)" />
              <stop offset="100%" stopColor="var(--chart-5)" />
            </>
          )}
        </linearGradient>

        <motion.radialGradient
          id={revealMaskId}
          gradientUnits="userSpaceOnUse"
          r="40%"
          initial={{ cx: "50%", cy: "50%" }}
          animate={maskPosition}
          transition={{ duration: duration ?? 0, ease: "easeOut" }}
        >
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </motion.radialGradient>
        <mask id={textMaskId}>
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill={`url(#${revealMaskId})`}
          />
        </mask>
      </defs>
      <text
        x="0"
        y="50%"
        textAnchor="start"
        dominantBaseline="middle"
        strokeWidth="1.5"
        className="fill-transparent stroke-neutral-600 font-[helvetica] text-8xl font-bold dark:stroke-neutral-400"
        style={{ opacity: hovered ? 1 : 0 }}
      >
        {text}
      </text>
      <motion.text
        x="0"
        y="50%"
        textAnchor="start"
        dominantBaseline="middle"
        strokeWidth="1.5"
        fill="var(--background)"
        className="stroke-neutral-600 font-[helvetica] text-8xl font-bold dark:stroke-neutral-400"
        initial={{ strokeDashoffset: 2000, strokeDasharray: 2000 }}
        animate={isInView ? {
          strokeDashoffset: 0,
          strokeDasharray: 2000,
        } : {}}
        transition={{
          duration: 2,
          ease: "easeOut",
        }}
      >
        {text}
      </motion.text>
      <text
        x="0"
        y="50%"
        textAnchor="start"
        dominantBaseline="middle"
        stroke={`url(#${gradientId})`}
        strokeWidth="1"
        mask={`url(#${textMaskId})`}
        className="fill-transparent font-[helvetica] text-8xl font-bold"
      >
        {text}
      </text>
    </svg>
  );
};
