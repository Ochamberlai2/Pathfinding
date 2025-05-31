import { Container } from "pixi.js";
import { Button } from "../../ui/Button";
import { Grid } from "../../components/grid/grid";
import Tile from "../../components/tile/tile";
import Mode from "../../enums/mode";
import PathfindingAlgorithm from "./pathfindingAlgorithm";
import { createButton } from "../../utils/uiInitUtils";
import TerrainType from "../../enums/terrainType";
import {
  resetButtonOnClick,
  resetModeButtonOnClick,
  resetTerrainButtonOnClick,
  executePathfindingButtonOnClick,
  stepButtonOnClick,
  setGoalButtonOnClick,
  setStartButtonOnClick,
  setWallButtonOnClick,
  setPathButtonOnClick,
  setMudButtonOnClick,
  setWaterButtonOnClick,
} from "./buttonFunctions";

export class DjikstraScreen extends Container {
  public static assetBundles = ["main"];

  public mainContainer: Container;
  private resetButton!: Button;
  private resetModeButton!: Button;
  private resetTerrainButton!: Button;
  private setGoalButton!: Button;
  private setStartButton!: Button;
  private setWallButton!: Button;
  private setPathButton!: Button;
  private setMudButton!: Button;
  private setWaterButton!: Button;
  private executePathfindingButton!: Button;
  private stepButton!: Button;

  private algorithm: PathfindingAlgorithm;

  private mode: Mode = Mode.NONE;
  private terrainType: TerrainType = TerrainType.GRASS;

  private grid: Grid;

  constructor() {
    super();
    this.mode = Mode.NONE;
    this.mainContainer = new Container();
    this.addChild(this.mainContainer);

    this.grid = this.initializeGrid(10, 10, 75, 75);
    this.grid.x = (-this.grid.tileWidth * this.grid.cols) / 2;
    this.grid.y = (-this.grid.tileHeight * this.grid.rows) / 2 - 70;
    this.initializeButtons();
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

  private initializeButtons() {
    this.resetButton = createButton(
      "Reset",
      () => resetButtonOnClick(this.algorithm, this.grid),
      this
    );
    this.resetModeButton = createButton(
      "Reset Mode",
      () => {
        resetModeButtonOnClick(this.setMode.bind(this));
      },
      this
    );
    this.resetTerrainButton = createButton(
      "Reset Terrain",
      () => {
        resetTerrainButtonOnClick(this.setTerrainType.bind(this));
      },
      this
    );

    this.executePathfindingButton = createButton(
      "Execute",
      () => {
        executePathfindingButtonOnClick(this.algorithm);
      },
      this
    );

    this.stepButton = createButton(
      "Step",
      () => {
        stepButtonOnClick(this.algorithm);
      },
      this
    );

    this.setGoalButton = createButton(
      "Set Goal",

      () =>
        setGoalButtonOnClick(
          this.setMode.bind(this),
          this.setTerrainType.bind(this),
          this
        ),
      this
    );

    this.setStartButton = createButton(
      "Set Start",
      () => {
        setStartButtonOnClick(
          this.setMode.bind(this),
          this.setTerrainType.bind(this),
          this
        );
      },
      this
    );
    this.setWallButton = createButton(
      "Set Wall",
      () => {
        setWallButtonOnClick(
          this.setMode.bind(this),
          this.setTerrainType.bind(this)
        );
      },
      this
    );
    this.setPathButton = createButton(
      "Set Path",
      () => {
        setPathButtonOnClick(this.setTerrainType.bind(this));
      },
      this
    );
    this.setMudButton = createButton(
      "Set Mud",
      () => {
        setMudButtonOnClick(
          this.setMode.bind(this),
          this.setTerrainType.bind(this)
        );
      },
      this
    );
    this.setWaterButton = createButton(
      "Set Water",
      () => {
        setWaterButtonOnClick(
          this.setMode.bind(this),
          this.setTerrainType.bind(this)
        );
      },
      this
    );
  }

  public resize(width: number, height: number) {
    const centreX = width / 2;
    const centreY = height / 2;

    this.resetButton.x =
      centreX - this.resetButton.width / 2 - this.grid.width / 2 - 20;
    this.resetButton.y = centreY - this.resetButton.height / 2;

    const actions = [
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

  public setMode(mode: Mode) {
    this.mode = mode;
    console.log(`Mode set to: ${mode}`);
  }
  public setTerrainType(terrainType: TerrainType) {
    this.terrainType = terrainType;
    console.log(`Terrain type set to: ${terrainType}`);
  }
  public getTerrainType(): TerrainType {
    return this.terrainType;
  }
  public getMode(): Mode {
    return this.mode;
  }
}
