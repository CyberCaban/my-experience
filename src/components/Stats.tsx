import Plot from "react-plotly.js";
import { useStore } from "../store";
import { useEffect } from "react";
import { intModulo } from "../utils";

function Stats() {
  const [elemCount, dividerCount, setDividerCount, counter, setElemCount, updateDividerSum, sum] =
    useStore((state) => [
      state.elemCount,
      state.dividerCount,
      state.setDividerCount,
      state.counter,
      state.setElemCount,
      state.updateDividerSum,
      state.dividerSum,
    ]);
  const [divider, size, triangle, generateTriangle] = useStore((state) => [
    state.divider,
    state.size,
    state.triangle,
    state.generateTriangle,
  ]);

  useEffect(() => {   
    generateTriangle();
    const graphData: number[] = [];
    const divCount: number[][] = [];
    triangle.forEach((row) => {
      graphData.push(
        row.filter(
          (el) =>
            BigInt(divider) !== BigInt(0) && el % BigInt(divider) == BigInt(0)
        ).length
      );

      const divRow: number[] = [];
      row.forEach((el) => {
          divRow.push(intModulo(el, divider));
      })

      divCount.push(divRow);
    });
    setElemCount(graphData);
    setDividerCount(divCount);

    updateDividerSum();
  }, [divider, size]);

  return (
    <div className="p-16 flex max-w-[calc(100vw-16rem)] flex-wrap justify-center">
      <Plot
        data={[
          {
            y: elemCount,
            type: "scatter",
          },
        ]}
        layout={{}}
      />
      <Plot
        data={[
          {
            y: sum ? sum : [],
            type: "scatter",
          },
        ]}
        layout={{}}
      />
      <Plot
        data={[
          {
            y: Object.values(counter()),
            type: "bar",
          },
        ]}
        layout={{}}
      />
    </div>
  );
}

export default Stats;
