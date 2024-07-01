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
  scale: number,
  modulo: number,
  ctx: CanvasRenderingContext2D
) {
  let currX = width / 2;
  for (let i = 0; i < triangle.length; i++) {
    currX -= scale / 2;
    currX -= xOffset / 2;

    let offX = currX;
    for (let j = 0; j < triangle[i].length; j++) {
      ctx.fillStyle = "gray";

      if (modulo && triangle[i][j] % BigInt(modulo) == BigInt(0))
        ctx.fillStyle = "red";

      ctx.fillRect(offX, i * scale + i * yOffset, scale, scale);

      {
        // horizontal lines
        ctx.beginPath();
        ctx.fillStyle = "black";
        ctx.moveTo(0, i * scale + i * yOffset);
        ctx.lineTo(width, i * scale + i * yOffset);
        ctx.stroke();
      }

      {
        // vertical lines
        ctx.beginPath();
        ctx.fillStyle = "black";
        ctx.moveTo(offX, i * scale + i * yOffset);
        ctx.lineTo(offX, i * scale + i * yOffset + scale);
        ctx.stroke();
      }

      ctx.fillStyle = "white"; // line numbers
      ctx.font = `${scale / 2}px sans-serif`;
      ctx.fillText(`${i + 1}`, 0, i * scale + i * yOffset + scale / 2);
      offX += scale + xOffset;
    }
  }
}
