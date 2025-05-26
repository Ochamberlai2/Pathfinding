import { Container } from "pixi.js";
import { Button } from "../ui/Button";

const createButton = (
  label: string,
  callback: () => void,
  parent: Container
): Button => {
  const button = new Button({
    text: label,
    width: 175,
    height: 110,
  });
  button.onPress.connect(callback.bind(parent));
  parent.addChild(button);
  return button;
};

export { createButton };
