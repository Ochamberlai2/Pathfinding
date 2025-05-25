import { Container, Graphics } from "pixi.js";
import Mode from "../../enums/mode";
import { Grid } from "../grid";
import { initialiseGraphics, updateGraphics } from "./graphics";
import { onMouseDown } from "./events";
export default class Tile extends Container {
  public xCoord: number;
  public yCoord: number;

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

  //#region Start Tile
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
  //#endregion
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
