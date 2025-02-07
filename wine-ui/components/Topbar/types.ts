export interface MenuItem {
  key: string;
  label: string;
  link?: string;
  icon?: string;
  onClick?: () => void;
}

export interface MenuProps {
  items: MenuItem[];
  position?: "left" | "right" | "center";
  active?: boolean;
  modelValue?: string;
  /** 导航项间距，默认 30px */
  gap?: string | number;
}

export type MenuEventType = "menu" | "escape" | "overlay";

export interface TopbarProps {
  modelValue: boolean;
  logo?: string;
  title?: string;
  fixed?: boolean;
  height?: string | number;
  shadow?: boolean;
  navPosition?: "left" | "center" | "right";
  /** 导航项间距，默认 30px */
  gap?: string | number;
  items?: MenuItem[];
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
