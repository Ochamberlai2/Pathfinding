import { Container } from "pixi.js";
import Graphic from "./graphic.ts";

export default class Agent extends Container {
  public id: string;

  public graphic: Graphic;

  constructor(radius: number, color: number) {
    super();
    this.id = crypto.randomUUID();
    this.graphic = new Graphic(radius, color, this);
  }
}
