"use client";

import { useEffect, useRef } from "react";

export interface UseWatermarkOptions {
  /** Text hiển thị watermark */
  text?: string;
  /** Góc xoay (radians), mặc định -Math.PI / 6 (-30 degrees) */
  rotation?: number;
  /** Độ mờ của overlay, mặc định 0.5 */
  overlayOpacity?: number;
  /** Độ mờ của text, mặc định 0.7 */
  textOpacity?: number;
  /** Font size, mặc định 22px */
  fontSize?: number;
  /** Font family, mặc định 'Arial' */
  fontFamily?: string;
  /** Font weight, mặc định 'bold' */
  fontWeight?: string;
  /** Khoảng cách ngang giữa các watermark, mặc định 200 */
  spacingX?: number;
  /** Khoảng cách dọc giữa các watermark, mặc định 150 */
  spacingY?: number;
  /** Màu overlay, mặc định 'rgba(0, 0, 0, 0.5)' */
  overlayColor?: string;
  /** Màu text, mặc định 'rgba(255, 255, 255, 0.7)' */
  textColor?: string;
  /** Có vẽ overlay hay không, mặc định true */
  enableOverlay?: boolean;
  /** Mix blend mode, mặc định 'overlay' */
  blendMode?: string;
}

/**
 * Custom hook để tạo watermark trên canvas element
 * @param options Cấu hình watermark
 * @returns canvasRef - Ref để attach vào canvas element
 *
 * @example
 * ```tsx
 * const canvasRef = useWatermark({
 *   text: "TẠO BỞI BANVE.VN",
 *   rotation: -Math.PI / 6,
 *   fontSize: 22
 * });
 *
 * return (
 *   <div className="relative">
 *     <canvas
 *       ref={canvasRef}
 *       className="absolute inset-0 w-full h-full pointer-events-none"
 *       style={{ mixBlendMode: 'overlay' }}
 *     />
 *   </div>
 * );
 * ```
 */
export const useWatermark = (options: UseWatermarkOptions = {}) => {
  const {
    text = "TẠO BỞI BANVE.VN",
    rotation = -Math.PI / 6,
    overlayOpacity = 0.5,
    textOpacity = 0.7,
    fontSize = 22,
    fontFamily = "Arial",
    fontWeight = "bold",
    spacingX = 200,
    spacingY = 150,
    overlayColor,
    textColor,
    enableOverlay = true,
  } = options;

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const drawWatermark = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Set canvas size to match parent
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;

      // Add semi-transparent overlay
      if (enableOverlay) {
        ctx.fillStyle = overlayColor || `rgba(0, 0, 0, ${overlayOpacity})`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      // Draw watermark text
      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate(rotation);

      ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
      ctx.fillStyle = textColor || `rgba(255, 255, 255, ${textOpacity})`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      for (let x = -canvas.width; x < canvas.width * 2; x += spacingX) {
        for (let y = -canvas.height; y < canvas.height * 2; y += spacingY) {
          ctx.fillText(text, x, y);
        }
      }

      ctx.restore();
    };

    // Initial draw
    drawWatermark();

    // Handle window resize
    const handleResize = () => {
      drawWatermark();
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [
    text,
    rotation,
    overlayOpacity,
    textOpacity,
    fontSize,
    fontFamily,
    fontWeight,
    spacingX,
    spacingY,
    overlayColor,
    textColor,
    enableOverlay,
  ]);

  return canvasRef;
};
