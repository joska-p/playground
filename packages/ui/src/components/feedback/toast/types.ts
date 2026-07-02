export type ToastItemData = {
  id: number;
  variant: 'default' | 'primary' | 'secondary' | 'accent' | 'destructive' | 'warning';
  title: string;
  description: string;
  exiting?: boolean;
};

export type ToastContextValue = {
  info: (title: string, description: string) => void;
  success: (title: string, description: string) => void;
  error: (title: string, description: string) => void;
};
