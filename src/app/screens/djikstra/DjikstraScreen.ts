import { Container } from "pixi.js";
import { Button } from "../../ui/Button";

import { Grid } from "../../components/grid";

export class DjikstraScreen extends Container {
  public static assetBundles = ["main"];

  public mainContainer: Container;
  private clearGoalButton: Button;
  private resetButton: Button;

  private grid: Grid;

  constructor() {
    super();

    this.mainContainer = new Container();
    this.addChild(this.mainContainer);

    this.clearGoalButton = new Button({
      text: "Clear Goal",
      width: 175,
      height: 110,
    });
    this.clearGoalButton.onPress.connect(() => {
      console.log("Clear Goal button pressed");
      // Logic to clear the goal in the Djikstra algorithm
    });
    this.addChild(this.clearGoalButton);

    this.resetButton = new Button({
      text: "Reset",
      width: 175,
      height: 110,
    });
    this.resetButton.onPress.connect(() => {
      console.log("Reset button pressed");
      // Logic to reset the Djikstra algorithm
    });
    this.addChild(this.resetButton);

    this.grid = this.initializeGrid(10, 10, 75, 75);
    this.grid.x = (-this.grid.tileWidth * this.grid.cols) / 2;
    this.grid.y = (-this.grid.tileHeight * this.grid.rows) / 2 - 50;
  }

  private initializeGrid(
    rows: number,
    cols: number,
    tileWidth: number,
    tileHeight: number
  ): Grid {
    const grid = new Grid(rows, cols, tileWidth, tileHeight);
    this.mainContainer.addChild(grid);
    return grid;
  }

  public resize(width: number, height: number) {
    const centreX = width / 2;
    const centreY = height / 2;

    this.mainContainer.x = centreX;
    this.mainContainer.y = centreY;
    this.clearGoalButton.x = centreX - 200;
    this.clearGoalButton.y = height - 100;
    this.resetButton.x = centreX + 200;
    this.resetButton.y = height - 100;
  }
}
