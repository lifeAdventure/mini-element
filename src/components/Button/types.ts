import type { Ref } from "vue";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

export type ButtonType = 'primary' | 'success' | 'warning' | 'danger' | 'info';
export type ButtonSize = 'large' | 'small';
export type NativeType = 'button' | 'submit' | 'reset';

export interface ButtonProps {
  type?: ButtonType;
  size?: ButtonSize;
  plain?: boolean;
  round?: boolean;
  circle?: boolean;
  disabled?: boolean;
  nativeType?: NativeType;
  autofocus?: boolean;
  loading?: boolean;
  icon?: object | Array<string> | string | IconDefinition;
}

export interface ButtonInstance {
  ref: Ref<HTMLButtonElement | undefined>;
}
