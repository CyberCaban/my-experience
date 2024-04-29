import { useEffect, useRef } from "react";
import { drawTriangle, getPascalTriangle } from "../utils";

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

  useEffect(() => {
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

    drawTriangle(triangle, xwidth, 0, 0, scale, divider, ctx);
    triangle = [];
  }, []);

  return (
    <>
      <canvas id="canvas" ref={canvas} style={{}} className="m-16">
        <p>Canvas not supported</p>
      </canvas>
    </>
  );
}

export default Canvas;
