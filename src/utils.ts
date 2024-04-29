export function getPascalTriangle(size: number) {
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

export function drawTriangle(
  triangle: bigint[][],
  width: number,
  xOffset: number,
  yOffset: number,
  cx: number,
  cy: number,
  scale: number,
  modulo: number,
  ctx: CanvasRenderingContext2D
) {
  //if (cx == 0) cx = width / 2;
  //let currX = width / 2;
  let currX = cx;
  console.log(cx);

  for (let i = 0; i < triangle.length; i++) {
    currX -= scale / 2;
    currX -= xOffset / 2;

    let offX = currX;
    for (let j = 0; j < triangle[i].length; j++) {
      ctx.fillStyle = "gray";

      if (modulo && triangle[i][j] % BigInt(modulo) == BigInt(0))
        ctx.fillStyle = "red";

      ctx.fillRect(offX, i * scale + i * yOffset + cy, scale, scale);
      offX += scale + xOffset;
    }
  }
}

var cx: number = 100;
var cy: number = 0;
export function moveCanvas(e: MouseEvent) {
  //ctx.clearRect(0, 0, width, width);
  console.log("test");

  cx += e.movementX;
  cy += e.movementY;
  //return;
  console.log(e.movementX, e.movementY);

  //drawTriangle(triangle, width, xOffset, yOffset, scale, modulo, ctx);
}
