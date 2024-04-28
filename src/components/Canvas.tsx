import { useEffect, useRef } from "react";
import { drawElement, drawTriangle, getPascalTriangle } from "../utils";

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
  const zoomed = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvas.current || !zoomed.current) {
      return;
    }
    const ctx = canvas.current.getContext("2d");
    const zctx = zoomed.current.getContext("2d");
    if (!ctx || !zctx) {
      return;
    }
    const color = [255, 0, 0];
    const xwidth = size;
    canvas.current.width = xwidth;
    canvas.current.height = xwidth;

    zoomed.current.width = size * scale;
    zoomed.current.height = size * scale;

    const imageData = ctx.createImageData(xwidth, xwidth);
    let triangle = getPascalTriangle(size);
    console.log(triangle);

    for (let j = 0; j < triangle.length; j++) {
      for (let i = 0; i < triangle[j].length; i++) {
        drawElement(
          imageData,
          i + Math.trunc((xwidth - j) / 2),
          j,
          divider !== 0 && triangle[j][i] % BigInt(divider) === BigInt(0)
            ? color
            : [255, 255, 255],
          xwidth
        );
      }
    }
    triangle = [];

    ctx.putImageData(imageData, 0, 0);
    // drawTriangle(size, divider, ctx, xwidth, 1);
    zctx.imageSmoothingEnabled = false;
    zctx.scale(scale, scale);
    zctx.drawImage(canvas.current, 0, 0);
  }, []);

  return (
    <>
      <canvas id="canvas" ref={canvas} style={{}}>
        <p>Canvas not supported</p>
      </canvas>
      <canvas id="zoomed" ref={zoomed}></canvas>
    </>
  );
}

export default Canvas;
