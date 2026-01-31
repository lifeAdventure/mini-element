import type { FontAwesomeIconProps as OriginalFontAwesomeIconProps } from '@fortawesome/vue-fontawesome';
export type IconType = 'primary' | 'success' | 'warning' | 'danger' | 'info';
export interface FontAwesomeIconProps extends Omit<OriginalFontAwesomeIconProps, 'type' | 'color'> {
  type?: IconType;
  color?: string;
}
