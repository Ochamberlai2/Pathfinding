import { Grid } from "../../components/grid/grid";
import PathfindingAlgorithm from "./pathfindingAlgorithm";
import Mode from "../../enums/mode";
import { DjikstraScreen } from "./DjikstraScreen";
import TerrainType from "../../enums/terrainType";

const resetButtonOnClick = (
  algorithm: PathfindingAlgorithm,
  grid: Grid
): void => {
  console.log("Reset button pressed");
  algorithm.initialise();
  grid.tilesFlattened.forEach((tile) => {
    tile.setMode(Mode.NONE, true);
    tile.setTerrainType(TerrainType.GRASS, true);
  });
};

const resetModeButtonOnClick = (setMode: (mode: Mode) => void): void => {
  setMode(Mode.NONE);
  console.log("Reset Mode button pressed");
};

const resetTerrainButtonOnClick = (
  setTerrainType: (terrainType: TerrainType) => void
): void => {
  setTerrainType(TerrainType.GRASS);
  console.log("Reset Terrain button pressed");
};

const executePathfindingButtonOnClick = (
  algorithm: PathfindingAlgorithm
): void => {
  console.log("Execute Pathfinding button pressed");
  algorithm.execute();
};

const stepButtonOnClick = (algorithm: PathfindingAlgorithm): void => {
  console.log("Step button pressed");
  algorithm.step();
  algorithm.setCurrentNode(algorithm.getNextNode());
};

const setGoalButtonOnClick = (
  setMode: (mode: Mode) => void,
  setTerrainType: (terrainType: TerrainType) => void,
  scene: DjikstraScreen
): void => {
  setMode(Mode.GOAL);
  if (scene.getTerrainType() === TerrainType.WALL) {
    setTerrainType(TerrainType.GRASS); // Reset terrain type to grass if it was set to wall
  }
  console.log("Set Goal button pressed");
};

const setStartButtonOnClick = (
  setMode: (mode: Mode) => void,
  setTerrainType: (terrainType: TerrainType) => void,
  scene: DjikstraScreen
): void => {
  setMode(Mode.START);
  if (scene.getTerrainType() === TerrainType.WALL) {
    setTerrainType(TerrainType.GRASS); // Reset terrain type to grass if it was set to wall
  }
  console.log("Set Start button pressed");
};
const setWallButtonOnClick = (
  setMode: (mode: Mode) => void,
  setTerrainType: (terrainType: TerrainType) => void
): void => {
  setMode(Mode.NONE); // Reset mode to none when setting wall
  setTerrainType(TerrainType.WALL);
  console.log("Set Wall button pressed");
};
const setPathButtonOnClick = (
  setTerrainType: (terrainType: TerrainType) => void
): void => {
  setTerrainType(TerrainType.PATHWAY);
  console.log("Set Path button pressed");
};

const setMudButtonOnClick = (
  setMode: (mode: Mode) => void,
  setTerrainType: (terrainType: TerrainType) => void
): void => {
  setMode(Mode.NONE); // Reset mode to none when setting mud
  setTerrainType(TerrainType.MUD);
  console.log("Set Mud button pressed");
};
const setWaterButtonOnClick = (
  setMode: (mode: Mode) => void,
  setTerrainType: (terrainType: TerrainType) => void
): void => {
  setMode(Mode.NONE); // Reset mode to none when setting water
  setTerrainType(TerrainType.WATER);
  console.log("Set Water button pressed");
};
export {
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
};
