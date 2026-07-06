import { Moon, Sun } from 'lucide-react';
import { Button, Tooltip, useTheme } from '../..';

export function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme();
  return (
    <Tooltip content="Toggle theme">
      <Button
        variant="ghost"
        size="icon"
        aria-label="Toggle theme"
        onClick={toggleTheme}
      >
        {theme === 'light' ? <Moon className="h-3.5 w-3.5" /> : <Sun className="h-3.5 w-3.5" />}
      </Button>
    </Tooltip>
  );
}
