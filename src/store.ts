import { StateCreator, create } from "zustand";
import { colorPalette } from "./types";

interface sizeSlice {
  size: number;
  setSize: (value: number) => void;
}

interface dividerSlice {
  divider: number;
  setDivider: (value: number) => void;
}

interface scaleSlice {
  scale: number;
  setScale: (value: number) => void;
}

interface colorPaletteSlice {
  colorPalette: colorPalette;
  setColorPalette: (value: colorPalette) => void;
}

interface statsSlice{
  stats: number[];
  setStats: (value: number[]) => void;
}

const createSizeStore: StateCreator<sizeSlice, [], [], sizeSlice> = (set) => ({
  size: 1,
  setSize: (value) =>
    set((state) => {
      if (state.size === value) return state;
      if (value < 1 || !value) return { size: 1 };
      return { size: value };
    }),
});

const createDividerStore: StateCreator<dividerSlice, [], [], dividerSlice> = (
  set
) => ({
  divider: 1,
  setDivider: (value) =>
    set((state) => {
      if (state.divider === value) return state;
      if (value < 1 || !value) return { divider: 1 };
      return { divider: value };
    }),
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

const createStats: StateCreator<statsSlice, [], [], statsSlice> = (set) => ({
  stats: [],
  setStats: (value) =>
    set((state) => {
      if (state.stats === value) return state;
      return { stats: value };
    }),
})

export const useStore = create<
  sizeSlice & dividerSlice & scaleSlice & colorPaletteSlice & statsSlice
>()((...a) => ({
  ...createSizeStore(...a),
  ...createDividerStore(...a),
  ...createScaleStore(...a),
  ...createColorPaletteStore(...a),
  ...createStats(...a),
}));
