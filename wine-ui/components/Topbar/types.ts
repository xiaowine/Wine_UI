export interface MenuItem {
  key: string;
  label: string;
  link?: string;
  icon?: string;
  onClick?: () => void;
}

export type MenuEventType = "menu" | "escape" | "overlay";

export interface TopbarProps {
  modelValue?: boolean;
  logo?: string;
  title?: string;
  fixed?: boolean;
  zIndex?: number;
  height?: string | number;
  shadow?: boolean;
  navPosition?: "left" | "center" | "right";
  navGap?: string | number;
  mobileNavGap?: string | number;
  items?: MenuItem[];
  // 移除所有回调属性
}

// 新增事件类型定义
export type TopbarEventType = "close" | "select";

export interface TopbarEmits {
  (e: "update:modelValue", value: boolean): void;
  (e: "close", type: MenuEventType): void; // 修改关闭事件
  (e: "select", item: MenuItem): void; // 添加选择事件
  (e: "before-open"): boolean | Promise<boolean>;
  (e: "before-close", type: MenuEventType): boolean | Promise<boolean>;
  (e: "opened"): void;
  (e: "closed", type: MenuEventType): void;
  (e: "before-select", item: MenuItem): boolean | Promise<boolean>;
  (e: "selected", item: MenuItem): void;
}

export interface TopbarVars {
  "--w-topbar-height": string;
  "--w-topbar-background": string;
  "--w-topbar-z-index": number;
  "--w-topbar-shadow": string;
  "--w-nav-gap": string;
  "--w-mobile-nav-gap": string;
}
