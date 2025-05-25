import { Container, Graphics } from "pixi.js";
import Mode from "../../enums/mode";
import { Grid } from "../grid/grid";
import { initialiseGraphics, updateGraphics } from "./graphics";
import { onMouseDown } from "./events";
export default class Tile extends Container {
  public xCoord: number;
  public yCoord: number;
  public visited: boolean = false;
  public distance: number = Infinity;
  public previous: Tile | null = null;

  private mode: Mode = Mode.NONE;

  public tileWidth: number;
  public tileHeight: number;

  public grid: Grid;
  private graphic: Graphics;

  public static resetOnModeType = [Mode.GOAL, Mode.START];

  constructor(x: number, y: number, width: number, height: number, grid: Grid) {
    super();
    this.xCoord = x;
    this.yCoord = y;
    this.tileWidth = width;
    this.tileHeight = height;
    this.grid = grid;

    // Add any visual representation of the tile here, e.g., a rectangle
    const graphic = initialiseGraphics(this);
    if (!graphic) throw new Error("Failed to initialise graphics for Tile");
    this.graphic = graphic;
    this.addChild(this.graphic);
  }

  public setMode(mode: Mode, resetOtherTiles: boolean = false) {
    if (this.mode === mode) return; // No change needed
    if (resetOtherTiles) {
      this.resetOtherTiles(mode);
    }
    this.mode = mode;
    this.updateGraphics();
  }
  private resetOtherTiles(mode: Mode) {
    const existingTilesOFMode = this.grid.tilesFlattened.filter(
      (tile) => tile.getMode() === mode
    );
    if (existingTilesOFMode.length > 0) {
      existingTilesOFMode.forEach((tile) => {
        tile.setMode(Mode.NONE);
        tile.updateGraphics();
      });
    }
  }
  public getNeighbors(): Tile[] {
    const neighbors: Tile[] = [];
    const { xCoord, yCoord } = this;

    // Check all 4 possible directions (up, down, left, right)
    const directions = [
      { r: xCoord, c: yCoord + 1 }, // Up
      { r: xCoord, c: yCoord - 1 }, // Down
      { r: xCoord - 1, c: yCoord }, // Left
      { r: xCoord + 1, c: yCoord }, // Right
    ];

    for (const { r, c } of directions) {
      if (this.grid.isValidTile(r, c)) {
        const neighbourTile = this.grid.getTile(r, c);
        if (!neighbourTile) {
          continue; // Skip walls or invalid tiles
        }
        neighbors.push(neighbourTile);
      }
    }

    return neighbors;
  }

  public getDistanceToNode(tile: Tile | null): number {
    if (!tile) {
      console.error("Invalid tile provided for distance calculation.");
      return Infinity; // Return a large number if the tileFacade is invalid
    }
    return (
      Math.abs(this.xCoord - tile.xCoord) + Math.abs(this.yCoord - tile.yCoord)
    );
  }
  //#region Event Handlers
  public onMouseDown(mode: Mode) {
    onMouseDown(this, mode);
  }
  //#endregion
  //#region Public Helpers
  public updateGraphics() {
    updateGraphics(this, this.graphic);
  }
  public getMode(): Mode {
    return this.mode;
  }
  public get isStart(): boolean {
    return this.mode === Mode.START;
  }
  public get isGoal(): boolean {
    return this.mode === Mode.GOAL;
  }
  //#endregion
}
