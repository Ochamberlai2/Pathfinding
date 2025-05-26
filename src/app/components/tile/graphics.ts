import { Graphics } from "pixi.js";
import Tile from "./tile";
import Mode from "../../enums/mode";
import TerrainType from "../../enums/terrainType";

const initialiseGraphics = (tile: Tile): Graphics => {
  const graphic = new Graphics();
  graphic
    .rect(0, 0, tile.tileWidth - 1, tile.tileHeight - 1)
    .fill(0xffffff) // Default color (white)
    .setStrokeStyle({ width: 1, color: 0x000000 })
    .stroke();
  updateGraphics(tile, graphic);
  return graphic;
};

const calculateStrokeColour = (tile: Tile): number => {
  switch (tile.getMode()) {
    case Mode.NONE:
      return 0x00000; // Black for default tile
    case Mode.START:
      return 0x800080; // Purple for start tile
    case Mode.GOAL:
      return 0xff0000; // Red for goal tile
    case Mode.VISITED:
      return 0x0000ff; // Blue for visited tile
    case Mode.CURRENT:
      return 0xffff00; // Yellow for current tile
    case Mode.PATH:
      return 0x00ffff; // Cyan for path tile
  }
};

const calculateColour = (tile: Tile): number => {
  switch (tile.getTerrainType()) {
    case TerrainType.PATHWAY:
      return 0x808080; // Grey for pathway tile
    case TerrainType.MUD:
      return 0x8b4513; // Brown for mud tile
    case TerrainType.WATER:
      return 0xadd8e6; // Light Blue for water tile
    case TerrainType.WALL:
      return 0x000000; // Black for wall tile
    case TerrainType.GRASS:
      return 0x228b22; // Forest Green for grass tile
  }
};

const updateGraphics = (tile: Tile, graphic: Graphics) => {
  if (!tile) return;
  const tint = calculateColour(tile);
  const strokeColor = calculateStrokeColour(tile);
  const mode = tile.getMode();
  const strokeWidth = mode === Mode.NONE ? 1 : 5;
  graphic.clear();
  graphic
    .rect(0, 0, tile.tileWidth - 1, tile.tileHeight - 1)
    .fill(tint)
    .setStrokeStyle({ width: strokeWidth, color: strokeColor })
    .stroke();
};

export { initialiseGraphics, updateGraphics };
