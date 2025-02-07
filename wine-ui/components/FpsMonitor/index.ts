import FpsMonitor from "./FpsMonitor.vue";

export interface FpsProps {
  position?: "topLeft" | "topRight" | "bottomLeft" | "bottomRight";
  show?: boolean;
  marginTop?: string | number;
  marginBottom?: string | number;
  marginLeft?: string | number;
  marginRight?: string | number;
  interval?: number;
}

export { FpsMonitor };
export default FpsMonitor;
