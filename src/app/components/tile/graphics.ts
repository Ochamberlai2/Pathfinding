import { Graphics } from "pixi.js";
import Tile from "./tile";
import Mode from "../../enums/mode";

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

const calculateColour = (tile: Tile): number => {
  if (tile.isStart) {
    return 0x00ff00; // Green for start tile
  } else if (tile.isGoal) {
    return 0xff0000; // Red for goal tile
  } else if (tile.getMode() === Mode.VISITED) {
    return 0x0000ff; // Blue for visited tile
  } else if (tile.getMode() === Mode.CURRENT) {
    return 0xffff00; // Yellow for current tile
  } else if (tile.getMode() === Mode.WALL) {
    return 0x000000; // Black for wall tile
  } else if (tile.getMode() === Mode.PATH) {
    return 0x00ff00; // Green for path tile
  }
  return 0xffffff; // Default color (white)
};
const updateGraphics = (tile: Tile, graphic: Graphics) => {
  if (!tile) return;
  const tint = calculateColour(tile);

  graphic.clear();
  graphic
    .rect(0, 0, tile.tileWidth - 1, tile.tileHeight - 1)
    .fill(tint)
    .setStrokeStyle({ width: 1, color: 0x000000 })
    .stroke();
};

export { initialiseGraphics, updateGraphics };
