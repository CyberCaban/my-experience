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

export function drawElement(
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

function draw_rectangle(
  row: number,
  column: number,
  color: string,
  context: CanvasRenderingContext2D,
  scale: number,
  width: number
) {
  var middle = width / 2;
  var offset = column - row / 2;
  var x = middle + offset;
  var y = row;

  var posx = middle + scale * offset;
  var posy = scale * y;

  context.fillStyle = color;
  context.fillRect(posx, posy, scale, scale);
}

export function drawTriangle(
  rows: number,
  divider: number,
  context: CanvasRenderingContext2D,
  width: number,
  scale: number
) {
  let value = 1 % divider;
  draw_rectangle(1, 0, value === 0 ? "red" : "white", context, scale, width); //draw first row

  let prevRow = [0, 1, 0];
  for (let currRow = 2; currRow <= rows; currRow++) {
    let thisRow = [0];
    for (var i = 0, len = prevRow.length - 1; i < len; i++) {
      thisRow[i + 1] = (prevRow[i] + prevRow[i + 1]) % divider;
      value = thisRow[i + 1];
      draw_rectangle(
        currRow,
        i,
        value % divider === 0 ? "red" : "white",
        context,
        scale,
        width
      );
    }
    thisRow[i + 1] = 0;
    prevRow = thisRow;
  }
}
