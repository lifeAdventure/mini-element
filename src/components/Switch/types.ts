export type SwitchValueType = boolean | string | number;

export interface SwitchProps {
  modelValue: SwitchValueType;
  disabled?: boolean;
  activeText?: string;
  inactiveText?: string;
  activeValue?: SwitchValueType;
  inactiveValue?: SwitchValueType;
  name?: string;
  id?: string;
  size?: 'small' | 'large';
}

export interface SwitchEmits {
  'update:modelValue': [value: SwitchValueType];
  change: [value: SwitchValueType];
}
