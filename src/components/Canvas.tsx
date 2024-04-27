import { useEffect, useId, useRef } from "react";

function Canvas({
  width,
  size,
  divider,
}: {
  width: number;
  size: number;
  divider: number;
}) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const id = useId();

  function getPascalTriangle(size: number) {
    const triangle: bigint[][] = [];
    for (let i = 0; i < size; i++) {
      triangle[i] = [];
      triangle[i][0] = BigInt(1);
      triangle[i][i] = BigInt(1);
      for (let j = 1; j < i; j++) {
        triangle[i][j] =
          BigInt(triangle[i - 1][j - 1]) + BigInt(triangle[i - 1][j]);
      }
    }
    return triangle;
  }

  function drawElement(
    imageData: ImageData,
    x: number,
    y: number,
    color: number[],
    width: number
  ) {
    const i = (x + y * width) * 4;
    imageData.data[i] = color[0];
    imageData.data[i + 1] = color[1];
    imageData.data[i + 2] = color[2];
    imageData.data[i + 3] = 255;
  }

  useEffect(() => {
    if (!canvas.current) {
      return;
    }
    const ctx = canvas.current.getContext("2d");
    if (!ctx) {
      return;
    }
    const color = [255, 0, 0];
    const xwidth = size;
    canvas.current.width = xwidth;
    canvas.current.height = xwidth;

    const imageData = ctx.createImageData(xwidth, xwidth);
    let triangle = getPascalTriangle(size);
    for (let j = 0; j < triangle.length; j++) {
      for (let i = 0; i < triangle[j].length; i++) {
        if (triangle[j][i]) {
          drawElement(
            imageData,
            i + Math.floor((xwidth - j) / 2),
            j,
            divider !== 0 && triangle[j][i] % BigInt(divider) === BigInt(0)
              ? color
              : [255, 255, 255],
            xwidth
          );
        }
      }
    }
    triangle = [];

    ctx.scale(width, width);
    ctx.putImageData(imageData, 0, 0);
  }, []);

  return (
    <>
      <canvas id="canvas" ref={canvas} style={{}}>
        <p>Canvas not supported</p>
      </canvas>
      {/* <img
        id={id}
        src={canvas.current?.toDataURL()}
        // style={{ transform: `scale(${width})` }}
      /> */}
    </>
  );
}

export default Canvas;
function setTriangle(arg0: bigint[][]) {
  throw new Error("Function not implemented.");
}
