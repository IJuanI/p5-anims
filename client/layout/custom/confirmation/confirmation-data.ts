export interface ConfirmationData {
  mode: 'info' | 'warning' | 'error';
  title: string;
  description?: string;
  buttons?: string[];
}
