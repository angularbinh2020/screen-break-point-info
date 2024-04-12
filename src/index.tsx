import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface IBreakPoint {
  [breakPointLabel: string]: number;
}

interface Props {
  /**
   * @example breakPoints={{
            sm: 640,
            md: 768,
            lg: 1024,
            xl: 1280,
            "2xl": 1536,
          }}
  */
  breakPoints: IBreakPoint;
}

export const ScreenBreakPointInfo = ({ breakPoints }: Props) => {
  const [isShow, setShow] = useState<boolean>(false);
  const [breakPointLabel, setBreakPointLabel] = useState<string>("");

  useEffect(() => {
    const isLocal = location.hostname === "localhost";
    setShow(isLocal);
    const updateBreakPointLabel = () => {
      const widthSizes = Object.values(breakPoints).sort((a, b) => a - b);
      let currentBreakpoint = widthSizes[0];
      widthSizes.forEach((size) => {
        if (window.innerWidth >= size && size > currentBreakpoint) {
          currentBreakpoint = size;
        }
      });
      for (const label in breakPoints) {
        if (breakPoints[label] === currentBreakpoint) {
          setBreakPointLabel(label);
        }
      }
    };
    if (isLocal) {
      updateBreakPointLabel();
      window.addEventListener("resize", updateBreakPointLabel);
    }
    return () => {
      window.removeEventListener("resize", updateBreakPointLabel);
    };
  }, []);

  if (isShow)
    return createPortal(
      <div
        style={{
          position: "fixed",
          bottom: 50,
          right: 0,
          padding: "5px 12px",
          border: "1px solid black",
          backgroundColor: "white",
          borderRadius: "4px 0 0 4px",
          fontSize: "1rem",
          fontWeight: "600",
        }}
      >
        {breakPointLabel}
      </div>,
      document.body
    );
  return null;
};
