import { Container, Graphics } from "pixi.js";
export class Tile extends Container {
  public xCoord: number;
  public yCoord: number;
  public interactive: boolean;

  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    interactive: boolean = true
  ) {
    super();
    this.xCoord = x;
    this.yCoord = y;
    this.interactive = interactive;

    // Add any visual representation of the tile here, e.g., a rectangle
    const tileGraphics = new Graphics()
      .rect(0, 0, width, height)
      .fill("white")
      .stroke("black")
      .setStrokeStyle(1);

    this.addChild(tileGraphics);
  }
}
