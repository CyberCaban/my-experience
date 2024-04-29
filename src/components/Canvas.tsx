import { useEffect, useRef, useState } from "react";
import { drawTriangle, getPascalTriangle } from "../utils";

type MousePos = {
  x: number;
  y: number;
};

var tempX = 0,
  tempY = 0;

function Canvas({
  scale,
  size,
  divider,
}: {
  scale: number;
  size: number;
  divider: number;
}) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [mousePos, setMousePos] = useState<MousePos>({ x: tempX, y: tempY });

  useEffect(() => {
    function move(e: MouseEvent) {
      if (e.buttons & 1) {
        setMousePos((prev) => {
          tempX = prev.x + e.movementX;
          tempY = prev.y + e.movementY;
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
    canvas.current.width = xwidth;
    canvas.current.height = xwidth;
    let triangle = getPascalTriangle(size);
    console.log(triangle);

    canvas.current.addEventListener("mousemove", move);
    ctx.clearRect(0, 0, canvas.current.width, canvas.current.height);
    drawTriangle(
      triangle,
      xwidth,
      0,
      0,
      mousePos.x,
      mousePos.y,
      scale,
      divider,
      ctx
    );

    triangle = [];

    return () => {
      canvas.current?.removeEventListener("mousemove", move);
    };
  }, []);

  useEffect(() => {
    let triangle = getPascalTriangle(size);
    const xwidth = size * scale;
    if (!canvas.current) return;

    const ctx = canvas.current.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.current.width, canvas.current.height);
    drawTriangle(
      triangle,
      xwidth,
      0,
      0,
      mousePos.x,
      mousePos.y,
      scale,
      divider,
      ctx
    );
    triangle = [];
    console.log(tempX, tempY);
  }, [mousePos.x, mousePos.y]);
  return (
    <>
      <canvas id="canvas" ref={canvas} style={{}} className="m-16">
        <p>Canvas not supported</p>
      </canvas>
    </>
  );
}

export default Canvas;
