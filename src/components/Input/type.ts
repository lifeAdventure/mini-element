import type { Ref } from 'vue';

export interface InputProps {
  type?: string;
  modelValue: string;
  size?: 'large' | 'small';
  disabled?: boolean;
  clearable?: boolean;
  showPassword?: boolean;
  placeholder?: string;
  readonly?: boolean;
  autofocus?: boolean;
  autocomplete?: string;
  form?: string;
}

export interface InputEmits {
  'update:modelValue': [value: string];
  focus: [value: FocusEvent];
  blur: [value: FocusEvent];
  input: [value: string];
  change: [value: string];
  clear: [];
}

export interface InputInstance {
  ref: Ref<HTMLInputElement | HTMLTextAreaElement>;
}