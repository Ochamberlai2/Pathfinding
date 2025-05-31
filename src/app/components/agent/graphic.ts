import { Graphics } from "pixi.js";
import Agent from "./agent";

export default class Graphic extends Graphics {
  private radius: number;
  private color: number;
  private graphic: Graphics;
  private agent: Agent;
  constructor(radius: number, color: number, agent: Agent) {
    super();
    this.radius = radius;
    this.color = color;
    this.agent = agent;
    this.graphic = new Graphics();
    this.updateGraphics();
  }

  private updateGraphics(): void {
    this.graphic.clear();
    this.graphic
      .circle(this.agent.x, this.agent.y, this.radius)
      .fill(this.color)
      .setStrokeStyle({ width: 2, color: 0x000000 })
      .stroke();
    this.addChild(this.graphic);
  }
}
