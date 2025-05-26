import Tile from "../../components/tile/tile";
import Mode from "../../enums/mode";
import { Grid } from "../../components/grid/grid";
import TerrainType from "../../enums/terrainType";

export default class PathfindingAlgorithm {
  public currentTile: Tile | null = null;
  public startTile: Tile | null = null;
  public goalTile: Tile | null = null;
  public goalFound: boolean = false;
  public grid: Grid;
  public frontier: Tile[] = []; // This can be used to track the frontier of tiles being evaluated
  constructor(grid: Grid) {
    this.grid = grid;
    this.initialise();
  }

  public initialise() {
    const startTile = this.grid.tilesFlattened.find(
      (tile: Tile) => tile.getMode() === Mode.START
    );
    const goalTile = this.grid.tilesFlattened.find(
      (tile: Tile) => tile.getMode() === Mode.GOAL
    );
    if (!startTile || !goalTile) {
      console.error("Start tile or goal tile not selected.");
      return;
    }
    this.goalTile = goalTile;
    this.startTile = startTile;
    this.startTile.distance = 0;
    this.frontier.push(this.startTile);
    if (!this.currentTile) {
      this.setCurrentNode(this.getNextNode());
    }
  }

  public async execute() {
    this.initialise();
    let nextTile = this.currentTile;
    while (nextTile) {
      this.step();
      if (this.goalFound) {
        console.log("Goal found, stopping execution.");
        break;
      }
      nextTile = this.getNextNode();
      this.setCurrentNode(nextTile);
    }
  }

  public step() {
    if (!this.goalTile || !this.currentTile) {
      this.initialise();
    }
    if (this.goalFound) return this.currentTile;
    if (!this.currentTile) {
      console.error("No current tile to evaluate.");
      return null;
    }
    if (this.currentTile === this.goalTile) {
      this.goalFound = true;
      this.buildPath();
      console.log("Goal found at tile:", this.currentTile);
      this.currentTile.setMode(Mode.PATH, false);
      this.frontier = []; // Clear the frontier as the goal has been found
      return this.currentTile; // Return the goal tile
    }
    const unvisitedNeighbours = this.currentTile
      .getNeighbors()
      .filter(
        (tile) => !tile.visited && tile.getTerrainType() !== TerrainType.WALL
      );
    unvisitedNeighbours.forEach((tile) => {
      if (!this.currentTile) {
        throw new Error("Current tile is blank");
      }
      const tentativeDistance =
        this.currentTile.distance + tile.opportunityCost; // Assuming uniform cost for simplicity
      if (tentativeDistance < tile.distance) {
        tile.distance = tentativeDistance;
        tile.previous = this.currentTile;
        this.frontier.push(tile); // Add to frontier for further evaluation
      }
      this.currentTile.visited = true; // Mark current tile as visited
      this.currentTile.setMode(Mode.VISITED, false); // Set the mode to VISITED for visualization
    });
  }
  public setCurrentNode(tile: Tile) {
    this.currentTile = tile;
    this.currentTile.setMode(Mode.CURRENT, true); // Set the mode to CURRENT for visualization
  }
  public getNextNode(): Tile {
    if (this.frontier.length === 0) {
      throw new Error("No more tiles to evaluate.");
    }
    // Find the tile with the lowest distance in the frontier
    const nextTile = this.frontier.reduce((closest, tile) => {
      if (!closest || tile.distance < closest.distance) {
        return tile;
      }
      return closest;
    }, this.frontier[0]);

    // Remove the next tile from the frontier
    this.frontier = this.frontier.filter((tile) => tile !== nextTile);

    return nextTile;
  }

  private buildPath(): Tile[] {
    const path: Tile[] = [];
    let currentTile: Tile | null = this.goalTile;
    while (currentTile) {
      currentTile.setMode(Mode.PATH, false); // Set the mode to PATH for visualization
      path.unshift(currentTile); // Add to the beginning of the path
      currentTile = currentTile.previous; // Move to the previous tile
    }
    return path;
  }
}
