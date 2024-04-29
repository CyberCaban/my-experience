import { useEffect, useRef, useState } from "react";
import { drawTriangle, getPascalTriangle } from "../utils";

type MousePos = {
  x: number;
  y: number;
};

function Canvas({
  scale,
  size,
  divider,
}: {
  scale: number;
  size: number;
  divider: number;
}) {
  const [mousePos, setMousePos] = useState<MousePos>({ x: 0, y: 0 });
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    function move(e: MouseEvent) {
      if (e.buttons & 1) {
        setMousePos((prev) => {
          return {
            x: prev.x + e.movementX,
            y: prev.y + e.movementY,
          };
        });
      }
    }

    if (!canvas.current) {
      return;
    }
    const ctx = canvas.current.getContext("2d");
    if (!ctx) {
      return;
    }
    const xwidth = size * scale;
    let triangle = getPascalTriangle(size);

    canvas.current.addEventListener("mousemove", move);
    ctx.clearRect(0, 0, canvas.current.width, canvas.current.height);
    drawTriangle(
      triangle,
      xwidth,
      0.5,
      0.5,
      mousePos.x,
      mousePos.y,
      scale,
      divider,
      ctx
    );

    return () => {
      canvas.current?.removeEventListener("mousemove", move);
    };
  }, [scale, size, divider, mousePos.x, mousePos.y]);

  return (
    <canvas
      id="canvas"
      ref={canvas}
      style={{}}
      className="m-8 p-1 w-full h-full rounded border-4 border-slate-700"
    >
      <p>Canvas not supported</p>
    </canvas>
  );
}

export default Canvas;
