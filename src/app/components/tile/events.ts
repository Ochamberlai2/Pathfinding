import Tile from "./tile";
import Mode from "../../enums/mode";
import TerrainType from "../../enums/terrainType";
const onMouseDown = (tile: Tile, mode: Mode, terrainType: TerrainType) => {
  if (!tile.interactive) return;
  if (mode === Mode.NONE && terrainType === TerrainType.GRASS) return;

  const resetOtherTiles = Tile.resetOnModeType.includes(mode);
  tile.setMode(mode, resetOtherTiles);
  tile.setTerrainType(terrainType);
  tile.updateGraphics();
};

export { onMouseDown };
