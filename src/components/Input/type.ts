import type { Ref } from 'vue';

export interface InputProps {
  type?: string;
  size?: 'large' | 'small';
  disabled?: boolean;
  placeholder?: string;
  autofocus?: boolean;
  showPassword?: boolean;
  clearable?: boolean;
  readonly?: boolean;
  autocomplete?: string;
  form?: string;
}

export interface InputEmits {
  blur: [];
  focus: [];
  input: [value: string];
  change: [value: string];
  clear: [];
}

export interface InputInstance {
  ref: Ref<HTMLInputElement | HTMLTextAreaElement>;
}
