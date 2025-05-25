import { Container } from "pixi.js";
import { Button } from "../../ui/Button";
import type { Ticker } from "pixi.js";
import { Grid } from "../../components/grid/grid";
import Tile from "../../components/tile/tile";
import Mode from "../../enums/mode";
import PathfindingAlgorithm from "./pathfindingAlgorithm";

export class DjikstraScreen extends Container {
  public static assetBundles = ["main"];

  public mainContainer: Container;
  private clearGoalButton: Button;
  private resetButton: Button;
  private setGoalButton: Button;
  private setStartButton: Button;
  private executePathfindingButton: Button;
  private stepButton: Button;

  private algorithm: PathfindingAlgorithm;

  private mode: Mode = Mode.NONE;

  private grid: Grid;

  constructor() {
    super();
    this.mode = Mode.NONE;
    this.mainContainer = new Container();
    this.addChild(this.mainContainer);

    this.clearGoalButton = new Button({
      text: "Clear Goal",
      width: 175,
      height: 110,
    });
    this.clearGoalButton.onPress.connect(() => {
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

    this.executePathfindingButton = new Button({
      text: "Execute",
      width: 175,
      height: 110,
    });
    this.executePathfindingButton.onPress.connect(() => {
      console.log("Execute Pathfinding button pressed");
      const startTile = this.grid.tilesFlattened.find(
        (tile) => tile.getMode() === Mode.START
      );
      const goalTile = this.grid.tilesFlattened.find(
        (tile) => tile.getMode() === Mode.GOAL
      );
      if (!goalTile) {
        console.error("Goal tile is not set.");
        return;
      }
      this.algorithm.execute(startTile ?? null, goalTile);
    });
    this.addChild(this.executePathfindingButton);
    this.stepButton = new Button({
      text: "Step",
      width: 175,
      height: 110,
    });
    this.stepButton.onPress.connect(() => {
      console.log("Step button pressed");
      const nextTile = this.algorithm.step();
      this.algorithm.nextTile = nextTile;
    });
    this.addChild(this.stepButton);

    this.setGoalButton = new Button({
      text: "Set Goal",
      width: 175,
      height: 110,
    });
    this.setGoalButton.onPress.connect(() => {
      this.mode = Mode.GOAL;
      console.log("Set Goal button pressed");
    });
    this.addChild(this.setGoalButton);

    this.setStartButton = new Button({
      text: "Set Start",
      width: 175,
      height: 110,
    });
    this.setStartButton.onPress.connect(() => {
      this.mode = Mode.START;
      console.log("Set Start button pressed");
    });
    this.addChild(this.setStartButton);

    this.grid = this.initializeGrid(5, 10, 75, 75);
    this.grid.x = (-this.grid.tileWidth * this.grid.cols) / 2;
    this.grid.y = (-this.grid.tileHeight * this.grid.rows) / 2 - 50;

    this.algorithm = new PathfindingAlgorithm();
  }

  private initializeGrid(
    rows: number,
    cols: number,
    tileWidth: number,
    tileHeight: number
  ): Grid {
    const grid = new Grid(
      rows,
      cols,
      tileWidth,
      tileHeight,
      this.cellClickHandler.bind(this)
    );
    this.mainContainer.addChild(grid);
    return grid;
  }

  public resize(width: number, height: number) {
    const centreX = width / 2;
    const centreY = height / 2;

    const actions = [
      // this.clearGoalButton,
      // this.resetButton,
      this.setGoalButton,
      this.setStartButton,
      this.executePathfindingButton,
      this.stepButton,
    ];

    this.mainContainer.x = centreX;
    this.mainContainer.y = centreY;

    const actionsStartX = centreX - (actions.length * 175) / 2 + 87.5;
    const actionsStartY = height - 100;
    const actionsGap: number = 10;
    actions.forEach((action, index) => {
      action.x = actionsStartX + index * (action.width + actionsGap);
      action.y = actionsStartY;
    });
  }

  public cellClickHandler(tile: Tile) {
    console.log(`Tile clicked at (${tile.xCoord}, ${tile.yCoord})`);
    tile.onMouseDown(this.mode);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public update(_time: Ticker) {}
}
