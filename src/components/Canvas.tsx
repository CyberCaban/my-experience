import { useEffect, useRef, useState } from "react";
import { drawTriangle, getPascalTriangle } from "../utils";
import Plot from "react-plotly.js";

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
  const [stats, setStats] = useState<number[]>();

  useEffect(() => {
    if (!canvas.current) {
      return;
    }
    const ctx = canvas.current.getContext("2d");
    if (!ctx) {
      return;
    }
    const xwidth = size * scale + 50;
    canvas.current.width = xwidth;
    canvas.current.height = xwidth;
    let triangle = getPascalTriangle(size);

    const graphData: number[] = [];
    triangle.forEach((row) => {
      graphData.push(
        row.filter(
          (el) =>
            BigInt(divider) !== BigInt(0) && el % BigInt(divider) == BigInt(0)
        ).length
      );
    });
    // console.log(graphData);
    setStats(graphData);

    drawTriangle(triangle, xwidth, 0, 0, scale, divider, ctx);
  }, []);

  return (
    <>
      <canvas id="canvas" ref={canvas} style={{}} className="m-16">
        <p>Canvas not supported</p>
      </canvas>
      <div className="p-16 flex flex-row">
        <Plot
          data={[
            {
              y: stats,
              type: "scatter",
            },
          ]}
          layout={{}}
        />
        <Plot
          data={[
            {
              y: stats,
              type: "waterfall",
            },
          ]}
          layout={{}}
        />
      </div>
    </>
  );
}

export default Canvas;
