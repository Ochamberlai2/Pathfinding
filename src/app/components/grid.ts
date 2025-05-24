import { Container, Graphics } from "pixi.js";
import { Tile } from "./tile";

export class Grid extends Container {
  public rows: number;
  public cols: number;
  public tileWidth: number;
  public tileHeight: number;
  public tiles: Tile[][];
  public tilesFlattened: Tile[];

  constructor(
    rows: number,
    cols: number,
    tileWidth: number,
    tileHeight: number,
    cellClickHandler: (tile: Tile) => void
  ) {
    super();
    this.rows = rows;
    this.cols = cols;
    this.tileWidth = tileWidth;
    this.tileHeight = tileHeight;
    this.tiles = [];
    this.tilesFlattened = [];

    this.createGrid(cellClickHandler);

    const rectHeight = this.tileHeight * this.rows - 1;
    const rectWidth = this.tileWidth * this.cols - 1;
    const graphics = new Graphics()
      .rect(0, 0, rectWidth, rectHeight)
      .stroke("white")
      .setStrokeStyle(1);
    this.addChild(graphics);
  }

  private createGrid(cellClickHandler: (tile: Tile) => void) {
    for (let row = 0; row < this.rows; row++) {
      const tileRow: Tile[] = [];
      for (let col = 0; col < this.cols; col++) {
        const tile = new Tile(col, row, this.tileWidth, this.tileHeight, this);
        tile.x = col * this.tileWidth;
        tile.y = row * this.tileHeight;
        tile.interactive = true;
        tile.eventMode = "static";
        tile.on("pointerdown", (event: object) => {
          console.log("clicked", event);
          cellClickHandler(tile);
        });
        tileRow.push(tile);
        this.addChild(tile);
      }
      this.tiles.push(tileRow);
    }
    this.tilesFlattened = this.tiles.flat();
  }
}
