import { useDeferredValue, useState } from "react";
import Canvas from "./Canvas";
import { getPascalTriangle } from "../utils";
import TriagElement from "./TriagElement";
import { colorPalette } from "../types";

function PascalTriangle() {
  const [size, setSize] = useState(1);
  const [divider, setDivider] = useState(1);
  const [scale, setScale] = useState<number>(1);
  const [colorPalette, setColorPalette] = useState<colorPalette>(0);

  const deferredSize = useDeferredValue(size);

  return (
    <div className="flex flex-col items-center w-max flex-wrap">
      <div className="flex flex-row items-center self-start">
        <div className="flex flex-col m-2">
          <label htmlFor="size">Size</label>
          <input
            value={size}
            onChange={(e) => setSize(parseInt(e.target.value))}
            type="number"
            name="size"
            id="size"
            min={1}
            // max={10}
            placeholder="size"
          />
        </div>
        <div className="flex flex-col m-2">
          <label htmlFor="divider">Divider</label>
          <input
            type="number"
            name="divider"
            id="divider"
            value={divider}
            onChange={(e) => setDivider(parseInt(e.target.value))}
            placeholder="divider"
          />
        </div>
        <div className="flex flex-col m-2">
          <label htmlFor="scale">Scale</label>
          <input
            type="number"
            name="scale"
            id="scale"
            value={scale}
            min={0}
            onChange={(e) => setScale(+e.target.value)}
            placeholder="scale"
          />
        </div>
        <div className="flex flex-col m-2">
          <label htmlFor="color_palette">Color Palette</label>
          <select
            name="color_palette"
            id="color_palette"
            className="bg-zinc-900 px-3 py-2 rounded-md"
            onChange={(e) => setColorPalette(+e.target.value)}
          >
            <option value="999">Default</option>
            <option value="0">Option 1</option>
            <option value="1001">Option 2</option>
            <option value="1009">Option 3</option>
            <option value="1031">Option 4</option>
            <option value="1032">Option 5</option>
            <option value="1033">Option 6</option>
            <option value="1000">Option 7</option>
          </select>
        </div>
      </div>
      <Canvas
        key={`${deferredSize} ${divider} ${scale} ${colorPalette}`}
        scale={scale}
        size={deferredSize}
        divider={divider}
        colorPalette={colorPalette}
      />
    </div>
  );
}

export default PascalTriangle;
