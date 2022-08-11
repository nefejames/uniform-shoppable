import { DefaultNotImplementedComponent } from "@uniformdev/canvas-react";
import ShoppableVideo from "./ShoppableVideo";

const mappings = {
  videoplayer: ShoppableVideo,
};

export const resolveRenderer = (component) => {
  const componentImpl = mappings[component.type];
  return componentImpl ? componentImpl : DefaultNotImplementedComponent;
};

export default mappings;
