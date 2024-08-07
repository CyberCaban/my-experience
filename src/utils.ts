import { useStore } from "./store";
import { colorPalette } from "./types";

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
  ctx: CanvasRenderingContext2D,
  colorPalette: colorPalette
) {
  const modCount = [];
  let currX = width / 2;
  for (let i = 0; i < triangle.length; i++) {
    currX -= scale / 2;
    currX -= xOffset / 2;

    const modCountRow = [];

    let offX = currX;
    for (let j = 0; j < triangle[i].length; j++) {
      ctx.fillStyle = "gray";
      const mod = intModulo(triangle[i][j], modulo);

      {
        // for stats
        modCountRow.push(mod);
      }

      {
        // fill square
        if (modulo && triangle[i][j] % BigInt(modulo) == BigInt(0))
          ctx.fillStyle = `${generateUniqueColor(mod, !colorPalette, colorPalette)}`;
        else ctx.fillStyle = "gray";

        ctx.fillRect(offX, i * scale + i * yOffset, scale, scale);
      }

      {
        // divider numbers
        ctx.fillStyle = "white";
        ctx.font = `${scale / 2}px sans-serif`;
        ctx.fillText(
          `${mod}`,
          offX + scale / 2 - ctx.measureText(`${mod}`).width / 2,
          i * scale + i * yOffset + scale / 2
        );
      }

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
      {
        // line numbers
        ctx.fillStyle = "white";
        ctx.font = `${scale / 2}px sans-serif`;
        ctx.fillText(`${i}`, 0, i * scale + i * yOffset + scale / 2);
      }
      // move to next square
      offX += scale + xOffset;
    }

    modCount.push(modCountRow);
  }

  useStore.getState().setDividerCount(modCount);
}

export function intModulo(InputNumber: bigint, divider: number) {
  let count = 0;
  if (Math.abs(divider) === 1) return 0;
  while (InputNumber >= divider && divider !== 1 && divider !== 0) {
    if (InputNumber % BigInt(divider) == BigInt(0)) {
      count++;
      InputNumber /= BigInt(divider);
    } else {
      break;
    }
  }
  return count;
}

function generateUniqueColor(
  mod: number,
  nonUnique?: boolean,
  seed: colorPalette = 1000,
) {
  if (seed == 999) return "#AA1111"
  if (nonUnique)
    switch (mod) {
      case 0:
        return "gray";
      case 1:
        return "red";
      case 2:
        return "#3333FF"; // blue
      case 3:
        return "green";
      case 4:
        return "yellow";
      case 5:
        return "purple";
      case 6:
        return "orange";
      case 7:
        return "cyan";
      case 8:
        return "magenta";
      case 9:
        return "brown";
      case 10:
        return "pink";
      default:
        return `#${((mod << seed) % 0xffffff).toString(16)}`;
    }
  return `#${(mod << seed) % 0xffffff}`;
}
