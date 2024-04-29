import { useDeferredValue, useState } from "react";
import Canvas from "./Canvas";
import { getPascalTriangle } from "../utils";
import TriagElement from "./TriagElement";

function PascalTriangle() {
  const [size, setSize] = useState(1);
  const [divider, setDivider] = useState(1);
  const [width, setWidth] = useState(15);
  const [scale, setScale] = useState<number>(1);

  const deferredSize = useDeferredValue(size);


  return (
    <div className="flex flex-col items-center w-max flex-wrap">
      <div className="flex flex-row items-center self-start">
        <div className="flex flex-col">
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
        <div className="flex flex-col">
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
        <div className="flex flex-col">
          <label htmlFor="width">Width</label>
          <input
            type="number"
            name="width"
            id="width"
            value={width}
            onChange={(e) => setWidth(parseInt(e.target.value))}
            placeholder="width"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="scale">Scale</label>
          <input
            type="number"
            name="scale"
            id="scale"
            value={scale}
            min={0}
            // step={0.1}
            max={10}
            onChange={(e) => setScale(+e.target.value)}
            placeholder="scale"
          />
        </div>
      </div>
      {/*{triangle.map((row, i) => (
        <div
          key={i}
          className="flex flex-row items-center justify-center self-start"
        >
          {row.map((value, j) => (
            <TriagElement
              key={j}
              color={
                divider !== 0 && value % BigInt(divider) === BigInt(0)
                  ? "red"
                  : "white"
              }
              width={width}
            >
              {`${value}`}
            </TriagElement>
          ))}
        </div>
      ))}*/}
      <Canvas
        key={`${deferredSize} ${divider} ${scale}`}
        scale={scale}
        size={deferredSize}
        divider={divider}
      />
    </div>
  );
}

export default PascalTriangle;
