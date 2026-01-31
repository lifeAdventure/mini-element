export interface AlertProps {
  content?: string;
  type?: 'primary' | 'success' | 'warning' | 'danger' | 'info';
  effect?: 'light' | 'dark';
  closable?: boolean;
  manual?: boolean;
}

export interface AlertEmits {
  close: [];
}

export interface AlertInstance {
  close: () => void;
}
