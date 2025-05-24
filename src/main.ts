import { setEngine } from "./app/getEngine";
import { LoadScreen } from "./app/screens/LoadScreen";
// import { MainScreen } from "./app/screens/main/MainScreen";
import { DjikstraScreen } from "./app/screens/djikstra/DjikstraScreen";
import { CreationEngine } from "./engine/engine";

/**
 * Importing these modules will automatically register there plugins with the engine.
 */
// import "@esotericsoftware/spine-pixi-v8";

// Create a new creation engine instance
const engine = new CreationEngine();
setEngine(engine);

(async () => {
  // Initialize the creation engine instance
  await engine.init({
    background: "#1E1E1E",
    resizeOptions: { minWidth: 768, minHeight: 1024, letterbox: false },
  });

  // Show the load screen
  await engine.navigation.showScreen(LoadScreen);
  // Show the main screen once the load screen is dismissed
  // await engine.navigation.showScreen(MainScreen);
  await engine.navigation.showScreen(DjikstraScreen);
})();
