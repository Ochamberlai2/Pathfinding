import Tile from "../../components/tile/tile";
import Mode from "../../enums/mode";
import { Grid } from "../../components/grid/grid";

export default class PathfindingAlgorithm {
  public currentTile: Tile | null = null;
  public goalTile: Tile | null = null;
  public goalFound: boolean = false;
  public grid: Grid;
  public path: {
    xCoord: number;
    yCoord: number;
    worldX: number;
    worldY: number;
  }[] = [];

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
    this.currentTile = startTile;
  }

  public execute() {
    let nextTile = this.step();
    while (nextTile) {
      if (this.goalFound) {
        console.log("Goal found, stopping execution.");
        break;
      }
      this.currentTile = nextTile;
      nextTile = this.step();
    }
  }

  public step(): Tile | null {
    if (!this.goalTile || !this.currentTile) {
      this.initialise();
    }

    if (this.goalFound) return this.currentTile;
    if (!this.currentTile) {
      console.error("No current tile to evaluate.");
      return null;
    }
    const isGoal = this.evaluateNode(this.currentTile);
    // this.nextTile.setMode(Mode.CURRENT, true);

    // Check if the current tile is the goal
    if (isGoal) {
      console.log("Goal found!");
      this.goalFound = true;
      if (!this.goalTile) {
        console.error("Goal tile is not set.");
        return null;
      }
      this.goalTile.previous = this.currentTile; // Set the previous tile for the goal
      this.path = this.buildPath();
    }

    // Return the next tile to evaluate, if any
    //find the tile with the lowest distance that has not been visited
    const neighbours = this.currentTile.getNeighbors();
    const nextTile = neighbours.reduce((closest, neighbour) => {
      if (neighbour.visited) return closest;
      if (!closest || neighbour.distance < closest.distance) {
        return neighbour;
      }
      return closest;
    }, neighbours[0]);
    nextTile.setMode(Mode.CURRENT, true);
    nextTile.previous = this.currentTile;
    return nextTile ? nextTile : null;
  }

  private evaluateNode(tile: Tile): Tile | null {
    tile.visited = true;
    tile.setMode(Mode.VISITED, false);
    const neighbours = tile.getNeighbors();

    let foundGoalTile: Tile | null = null;
    neighbours.forEach((neighbour) => {
      if (neighbour.visited) return;

      const distance = neighbour.getDistanceToNode(this.goalTile);
      if (distance < neighbour.distance) {
        neighbour.distance = distance;
      }

      // If the neighbour is the goal, we can stop evaluating
      if (neighbour.isGoal) {
        console.log("Goal found!");
        foundGoalTile = neighbour;
      }
    });
    return foundGoalTile;
  }

  private buildPath(): {
    xCoord: number;
    yCoord: number;
    worldX: number;
    worldY: number;
  }[] {
    const path = [];
    let currentTile: Tile | null = this.goalTile;
    while (currentTile) {
      currentTile?.setMode(Mode.PATH, false);
      path.push({
        xCoord: currentTile.xCoord,
        yCoord: currentTile.yCoord,
        worldX: currentTile.x,
        worldY: currentTile.y,
      });
      currentTile = currentTile.previous; // Assuming each tile has a 'previous' property
    }

    return path.reverse(); // Reverse the path to get it from start to goal
  }
}
