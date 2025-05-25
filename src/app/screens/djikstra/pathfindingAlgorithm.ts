import Tile from "../../components/tile/tile";
import Mode from "../../enums/mode";

export default class PathfindingAlgorithm {
  public nextTile: Tile | null = null;
  public goalTile: Tile | null = null;
  public path: {
    xCoord: number;
    yCoord: number;
    worldX: number;
    worldY: number;
  }[] = [];
  public execute(startTile: Tile | null, goalTile: Tile) {
    if (!startTile || !goalTile) {
      console.error("Start tile is not valid.");
      return;
    }
    this.goalTile = goalTile;
    this.nextTile = startTile;
  }

  public step(): Tile | null {
    if (!this.nextTile) {
      console.error("No current tile to evaluate.");
      return null;
    }
    const isGoal = this.evaluateNode(this.nextTile);
    // this.nextTile.setMode(Mode.CURRENT, true);

    // Check if the current tile is the goal
    if (isGoal) {
      console.log("Goal found!");
      this.path = this.buildPath();
    }

    // Return the next tile to evaluate, if any
    //find the tile with the lowest distance that has not been visited
    const neighbours = this.nextTile.getNeighbors();
    const nextTile = neighbours.reduce((closest, neighbour) => {
      if (neighbour.visited) return closest;
      if (!closest || neighbour.distance < closest.distance) {
        return neighbour;
      }
      return closest;
    }, neighbours[0]);
    nextTile.setMode(Mode.CURRENT, true);
    nextTile.previous = this.nextTile;
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
    currentTile?.setMode(Mode.PATH, false);
    while (currentTile) {
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
