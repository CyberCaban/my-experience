import { StateCreator, create } from "zustand";
import { colorPalette } from "./types";
import { getPascalTriangle } from "./utils";

interface triangleSlice {
  size: number;
  divider: number;
  triangle: bigint[][];
  setDivider: (value: number) => void;
  setSize: (value: number) => void;
  generateTriangle: () => void;
}

interface scaleSlice {
  scale: number;
  setScale: (value: number) => void;
}

interface colorPaletteSlice {
  colorPalette: colorPalette;
  setColorPalette: (value: colorPalette) => void;
}

interface statsSlice {
  elemCount: number[];
  dividerCount: number[][];
  dividerSum: number[] | 0;
  redrawCount: number;
  setElemCount: (value: number[]) => void;
  setDividerCount: (value: number[][]) => void;
  counter: () => Record<string, number>;
  incrementRedrawCount: () => void;
  updateDividerSum: () => void;
}

const createTriangleStore: StateCreator<triangleSlice, [], [], triangleSlice> = (set) => ({
  size: 1,
  setSize: (value) =>
    set((state) => {
      if (state.size === value) return state;
      if (value < 1 || !value) return { size: 1 };
      return { size: value };
    }),
  divider: 1,
  setDivider: (value) =>
    set((state) => {
      if (state.divider === value) return state;
      if (value < 1 || !value) return { divider: 1 };
      return { divider: value };
    }),
  triangle: [],
  generateTriangle: () => {
    set((state) => ({
      triangle: getPascalTriangle(state.size),
    }));
  },
});

const createScaleStore: StateCreator<scaleSlice, [], [], scaleSlice> = (
  set
) => ({
  scale: 20,
  setScale: (value) =>
    set((state) => {
      if (state.scale === value) return state;
      if (value < 1) return { scale: 1 };
      return { scale: value };
    }),
});

const createColorPaletteStore: StateCreator<
  colorPaletteSlice,
  [],
  [],
  colorPaletteSlice
> = (set) => ({
  colorPalette: 0,
  setColorPalette: (value) =>
    set((state) => {
      if (state.colorPalette === value) return state;
      return { colorPalette: value };
    }),
});

const createStats: StateCreator<statsSlice, [], [], statsSlice> = (
  set,
  get
) => ({
  elemCount: [],
  dividerCount: [],
  redrawCount: 0,
  dividerSum: 0,
  setElemCount: (value) =>
    set((state) => {
      if (state.elemCount === value) return state;
      return { elemCount: value };
    }),
  setDividerCount: (value) =>
    set((state) => {
      if (state.dividerCount === value) return state;
      return { dividerCount: value };
    }),
  counter: () => {
    const res: Record<string, number> = {};

    get().dividerCount.map((x) => x.map((y) => (res[y] = (res[y] || 0) + 1)));
    console.log(res);

    return res;
  },
  incrementRedrawCount: () =>
    set((state) => ({ redrawCount: state.redrawCount + 1 })),
  updateDividerSum: () => {
    if (!get().dividerCount.length) return [];

    set({ dividerSum: get().dividerCount.map((row) => row.reduce((a, b) => a + b)) });
  },
});

export const useStore = create<
  triangleSlice & scaleSlice & colorPaletteSlice & statsSlice
>()((...a) => ({
  ...createTriangleStore(...a),
  ...createScaleStore(...a),
  ...createColorPaletteStore(...a),
  ...createStats(...a),
}));
