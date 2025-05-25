import Tile from "./tile";
import Mode from "../../enums/mode";
const onMouseDown = (tile: Tile, mode: Mode) => {
  if (!tile.interactive) return;
  if (mode === Mode.NONE) return;
  const resetOtherTiles = Tile.resetOnModeType.includes(mode);
  tile.setMode(mode, resetOtherTiles);
};

export { onMouseDown };
