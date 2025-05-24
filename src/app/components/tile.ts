import { Container, Graphics } from "pixi.js";
import { Mode } from "../screens/djikstra/DjikstraScreen";
import { Grid } from "./grid";
export class Tile extends Container {
  public xCoord: number;
  public yCoord: number;
  private isStart: boolean = false;
  private isGoal: boolean = false;
  public get isStartTile(): boolean {
    return this.isStart;
  }
  public get isGoalTile(): boolean {
    return this.isGoal;
  }
  public tileWidth: number;
  public tileHeight: number;
  public grid: Grid;

  public graphicalRepresentation: Graphics;
  constructor(x: number, y: number, width: number, height: number, grid: Grid) {
    super();
    this.xCoord = x;
    this.yCoord = y;
    this.tileWidth = width;
    this.tileHeight = height;
    this.grid = grid;

    // Add any visual representation of the tile here, e.g., a rectangle
    this.graphicalRepresentation = new Graphics();
    this.graphicalRepresentation
      .rect(0, 0, this.tileWidth - 1, this.tileHeight - 1)
      .fill(0xffffff) // Default color (white)
      .setStrokeStyle({ width: 1, color: 0x000000 })
      .stroke();
    this.updateVisuals();
    this.addChild(this.graphicalRepresentation);
  }

  public setStart(value: boolean = false) {
    // If there was a previous start tile, reset it
    if (value) {
      this.resetOtherStartTiles();
    }
    this.isStart = value;
    this.updateVisuals();
  }

  private resetOtherStartTiles() {
    const existingStartTiles = this.grid.tilesFlattened.filter(
      (tile) => tile.isStartTile
    );
    if (existingStartTiles.length > 0) {
      existingStartTiles.forEach((tile) => {
        tile.setStart(false);
        tile.updateVisuals();
      });
    }
  }

  public setGoal(value: boolean = false) {
    if (value) {
      this.resetOtherGoalTiles();
    }
    this.isGoal = value;
    this.updateVisuals();
  }
  private resetOtherGoalTiles() {
    const existingGoalTiles = this.grid.tilesFlattened.filter(
      (tile) => tile.isGoalTile
    );
    if (existingGoalTiles.length > 0) {
      existingGoalTiles.forEach((tile) => {
        tile.setGoal(false);
        tile.updateVisuals();
      });
    }
  }

  public updateVisuals() {
    let tint = 0xffffff; // Default color
    if (this.isStart) {
      tint = 0x00ff00; // Green for start tile
    } else if (this.isGoal) {
      tint = 0xff0000; // Red for goal tile
    }

    this.graphicalRepresentation.clear();
    this.graphicalRepresentation
      .rect(0, 0, this.tileWidth - 1, this.tileHeight - 1)
      .fill(tint)
      .setStrokeStyle({ width: 1, color: 0x000000 })
      .stroke();
  }

  public onMouseDown(mode: Mode) {
    if (!this.interactive) return;
    if (mode === Mode.NONE) return;

    if (mode === Mode.SET_START) {
      this.setStart(true);
    } else if (mode === Mode.SET_GOAL) {
      this.setGoal(true);
    }
  }
}
