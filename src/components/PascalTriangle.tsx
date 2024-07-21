import { useDeferredValue, useState } from "react";
import Canvas from "./Canvas";
import { getPascalTriangle } from "../utils";
import TriagElement from "./TriagElement";
import { colorPalette } from "../types";
import { useStore } from "../store";
import Plot from "react-plotly.js";

function PascalTriangle() {
  const [size, setSize] = useStore((state) => [state.size, state.setSize]);
  const [divider, setDivider] = useStore((state) => [
    state.divider,
    state.setDivider,
  ]);
  const [scale, setScale] = useStore((state) => [state.scale, state.setScale]);
  const [colorPalette, setColorPalette] = useStore((state) => [
    state.colorPalette,
    state.setColorPalette,
  ]);
  const stats = useStore((state) => state.stats);

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
            onChange={(e) => setColorPalette(+e.target.value as colorPalette)}
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
      <Canvas />
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
    </div>
  );
}

export default PascalTriangle;
