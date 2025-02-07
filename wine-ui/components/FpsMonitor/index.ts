import FpsMonitor from "./FpsMonitor.vue";

export interface FpsProps {
  position?: "topLeft" | "topRight" | "bottomLeft" | "bottomRight";
  show?: boolean;
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
  interval?: number;
}

export { FpsMonitor };
export default FpsMonitor;
