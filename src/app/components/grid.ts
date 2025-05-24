import { Container, Graphics } from "pixi.js";
import { Tile } from "./tile";
import { rect } from "motion/react-client";

export class Grid extends Container {
  public rows: number;
  public cols: number;
  public tileWidth: number;
  public tileHeight: number;
  public tiles: Tile[][];

  constructor(
    rows: number,
    cols: number,
    tileWidth: number,
    tileHeight: number
  ) {
    super();
    this.rows = rows;
    this.cols = cols;
    this.tileWidth = tileWidth;
    this.tileHeight = tileHeight;
    this.tiles = [];

    this.createGrid();

    const rectHeight = this.tileHeight * this.rows;
    const rectWidth = this.tileWidth * this.cols;
    const graphics = new Graphics()
      .rect(0, 0, rectWidth, rectHeight)
      .stroke("white")
      .setStrokeStyle(1);
    this.addChild(graphics);
  }

  private createGrid() {
    for (let row = 0; row < this.rows; row++) {
      const tileRow: Tile[] = [];
      for (let col = 0; col < this.cols; col++) {
        const tile = new Tile(col, row, this.tileWidth, this.tileHeight);
        tile.x = col * this.tileWidth;
        tile.y = row * this.tileHeight;
        tileRow.push(tile);
        this.addChild(tile);
      }
      this.tiles.push(tileRow);
    }
  }
}
