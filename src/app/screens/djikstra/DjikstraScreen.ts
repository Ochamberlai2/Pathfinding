import { Container } from "pixi.js";
import { Button } from "../../ui/Button";
import type { Ticker } from "pixi.js";
import { Grid } from "../../components/grid/grid";
import Tile from "../../components/tile/tile";
import Mode from "../../enums/mode";
import PathfindingAlgorithm from "./pathfindingAlgorithm";
import { createButton } from "../../utils/uiInitUtils";
import TerrainType from "../../enums/terrainType";

export class DjikstraScreen extends Container {
  public static assetBundles = ["main"];

  public mainContainer: Container;
  private clearGoalButton: Button;
  private resetButton: Button;
  private resetModeButton: Button;
  private resetTerrainButton: Button;
  private setGoalButton: Button;
  private setStartButton: Button;
  private setWallButton: Button;
  private setPathButton: Button;
  private setMudButton: Button;
  private setWaterButton: Button;
  private executePathfindingButton: Button;
  private stepButton: Button;

  private algorithm: PathfindingAlgorithm;

  private mode: Mode = Mode.NONE;
  private terrainType: TerrainType = TerrainType.GRASS;

  private grid: Grid;

  constructor() {
    super();
    this.mode = Mode.NONE;
    this.mainContainer = new Container();
    this.addChild(this.mainContainer);

    this.clearGoalButton = createButton(
      "Clear Goal",
      () => {
        // Logic to clear the goal in the Djikstra algorithm
      },
      this
    );

    this.resetButton = createButton(
      "Reset",
      () => {
        console.log("Reset button pressed");
        this.algorithm.initialise();
        this.grid.tilesFlattened.forEach((tile) => {
          tile.setMode(Mode.NONE, true);
        });
      },
      this
    );
    this.resetModeButton = createButton(
      "Reset Mode",
      () => {
        this.mode = Mode.NONE;
        console.log("Reset Mode button pressed");
      },
      this
    );
    this.resetTerrainButton = createButton(
      "Reset Terrain",
      () => {
        this.terrainType = TerrainType.GRASS;
        console.log("Reset Terrain button pressed");
      },
      this
    );

    this.executePathfindingButton = createButton(
      "Execute",
      () => {
        console.log("Execute Pathfinding button pressed");
        this.algorithm.execute();
      },
      this
    );

    this.stepButton = createButton(
      "Step",
      () => {
        console.log("Step button pressed");
        this.algorithm.step();
        this.algorithm.setCurrentNode(this.algorithm.getNextNode());
      },
      this
    );

    this.setGoalButton = createButton(
      "Set Goal",
      () => {
        this.mode = Mode.GOAL;
        if (this.terrainType === TerrainType.WALL)
          this.terrainType = TerrainType.GRASS; // Reset terrain type to grass if it was set to wall
        console.log("Set Goal button pressed");
      },
      this
    );

    this.setStartButton = createButton(
      "Set Start",
      () => {
        this.mode = Mode.START;
        if (this.terrainType === TerrainType.WALL)
          this.terrainType = TerrainType.GRASS; // Reset terrain type to grass if it was set to wall        console.log("Set Start button pressed");
      },
      this
    );
    this.setWallButton = createButton(
      "Set Wall",
      () => {
        this.terrainType = TerrainType.WALL;
        this.mode = Mode.NONE; // Reset mode to none when setting wall
        console.log("Set Wall button pressed");
      },
      this
    );
    this.setPathButton = createButton(
      "Set Path",
      () => {
        this.terrainType = TerrainType.PATHWAY;
        this.mode = Mode.NONE; // Set mode to path when setting path
        console.log("Set Path button pressed");
      },
      this
    );
    this.setMudButton = createButton(
      "Set Mud",
      () => {
        this.terrainType = TerrainType.MUD;
        this.mode = Mode.NONE; // Reset mode to none when setting mud
        console.log("Set Mud button pressed");
      },
      this
    );
    this.setWaterButton = createButton(
      "Set Water",
      () => {
        this.terrainType = TerrainType.WATER;
        this.mode = Mode.NONE; // Reset mode to none when setting water
        console.log("Set Water button pressed");
      },
      this
    );

    this.grid = this.initializeGrid(10, 10, 75, 75);
    this.grid.x = (-this.grid.tileWidth * this.grid.cols) / 2;
    this.grid.y = (-this.grid.tileHeight * this.grid.rows) / 2 - 70;

    this.algorithm = new PathfindingAlgorithm(this.grid);
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
      [
        this.resetModeButton,
        this.setStartButton,
        this.setGoalButton,
        this.executePathfindingButton,
        this.stepButton,
      ],
      [
        this.resetTerrainButton,
        this.setWallButton,
        this.setPathButton,
        this.setMudButton,
        this.setWaterButton,
      ],
    ];

    this.mainContainer.x = centreX;
    this.mainContainer.y = centreY;
    const actionsGap: number = 10;
    const rowGap: number = 0;
    const numRows = actions.length;
    for (let row = 0; row < numRows; row++) {
      const currentRow = actions[row];
      const tallestAction = currentRow.reduce((tallest, action) => {
        return tallest.height > action.height ? tallest : action;
      });
      const actionsStartX = centreX - (currentRow.length * 175) / 2 + 87.5;
      const actionsStartY = height - 150;
      currentRow.forEach((action, index) => {
        action.x = actionsStartX + index * (action.width + actionsGap);
        action.y = actionsStartY + (rowGap * row + tallestAction.height * row);
      });
    }
  }

  public cellClickHandler(tile: Tile) {
    console.log(`Tile clicked at (${tile.xCoord}, ${tile.yCoord})`);
    tile.onMouseDown(this.mode, this.terrainType);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public update(_time: Ticker) {}
}
