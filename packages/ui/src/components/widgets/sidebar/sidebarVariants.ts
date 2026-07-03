import { cva } from 'class-variance-authority';

export const sidebarVariants = cva({
  base: ['grid relative h-full w-full overflow-hidden', 'touch-action-manipulation'],
  variants: {
    variant: {
      primary: '',
      secondary: '',
      accent: '',
      destructive: '',
      outline: '',
      ghost: ''
    }
  },
  defaultVariants: {
    variant: 'primary'
  }
});

export const sidebarMainVariants = cva({
  base: ['relative h-full w-full min-h-0 min-w-0'],
  variants: {},
  defaultVariants: {}
});

export const sidebarPanelVariants = cva({
  base: ['relative flex flex-col', 'transition-all duration-300 ease-in-out'],
  variants: {
    variant: {
      primary: 'bg-card',
      secondary: 'bg-secondary/30',
      accent: 'bg-accent/30',
      destructive: 'bg-destructive/20',
      outline: 'border-border border bg-transparent',
      ghost: 'bg-transparent'
    }
  },
  defaultVariants: {
    variant: 'primary'
  }
});

export const sidebarToggleVariants = cva({
  base: 'inline-flex items-center justify-center',
  variants: {
    variant: {
      primary: 'text-card-foreground bg-accent/10 hover:bg-accent/20',
      secondary: 'text-secondary-foreground bg-secondary/20 hover:bg-secondary/50',
      accent: 'text-accent-foreground bg-accent/20 hover:bg-accent/50',
      destructive: 'text-destructive-foreground bg-destructive/20 hover:bg-destructive/50',
      outline: 'text-foreground border-border hover:bg-foreground/10 border bg-transparent',
      ghost: 'text-foreground/70 hover:bg-foreground/10 bg-transparent'
    }
  },
  defaultVariants: {
    variant: 'primary'
  }
});
