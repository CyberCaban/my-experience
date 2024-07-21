import { useEffect, useMemo, useRef, useState } from "react";
import { drawTriangle, getPascalTriangle } from "../utils";
import { useStore } from "../store";

function Canvas() {
  const scale = useStore((state) => state.scale);
  const divider = useStore((state) => state.divider);
  const size = useStore((state) => state.size);
  const colorPalette = useStore((state) => state.colorPalette);
  const setStats = useStore((state) => state.setStats);

  const canvas = useRef<HTMLCanvasElement>(null);
  const triangle = useMemo(() => getPascalTriangle(size), [size]);

  const [popOverText, setPopOverText] = useState("");

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

    drawTriangle(triangle, xwidth, 0, 0, scale, divider, ctx, colorPalette);
  }, [scale, divider, size, colorPalette]);

  const cellCollision = (e) => {
    let bounds = e.currentTarget.getBoundingClientRect();
    let layer = Math.floor(parseInt(+(e.clientY - bounds.top)) / scale);
    let element =
      Math.floor(
        (Math.ceil(parseInt(+(e.clientX - bounds.left))) -
          bounds.width / 2 -
          ((layer + 1) * scale) / 2) /
          scale
      ) +
      layer +
      1;
    if (element >= 0 && element <= layer) {
      setPopOverText(
        `${triangle[layer][element].toString()} [${layer},${element}]`
      );
    } else setPopOverText("");
    return null;
  };

  return (
    <>
      <p className="px-3 py-2 text-center rounded-md bg-zinc-900">
        {popOverText ? popOverText : "no element selected"}
      </p>
      <div className="w-[calc(100vw-32px)] h-[calc(80vh)] overflow-auto">
        <canvas
          onMouseMove={(e) => cellCollision(e)}
          id="canvas"
          ref={canvas}
          style={{}}
          className="m-16"
        >
          <p>Canvas not supported</p>
        </canvas>
      </div>
    </>
  );
}

export default Canvas;
