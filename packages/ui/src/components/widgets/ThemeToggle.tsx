import { cn } from "../../utils/cn.js";

/**
 * A "Zero-State" Theme Toggle.
 * Instead of syncing React state (which causes warnings), it simply flips
 * the data-theme attribute on the <html> element.
 * CSS handles the icon swapping automatically.
 */
function ThemeToggle({ className }: { className?: string }) {
  const toggle = () => {
    const root = document.documentElement;
    root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
  };

  return (
    <button
      onClick={toggle}
      className={cn(
        "inline-flex items-center justify-center p-2 rounded-md transition-all active:translate-y-px",
        "text-foreground hover:bg-primary/10 hover:text-primary focus:outline-none cursor-pointer",
        className
      )}
      aria-label="Toggle theme"
    >
      {/*
        We use raw CSS classes for the toggle logic.
        Tailwind v4 / CSS will show/hide these based on the data-theme attribute.
      */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="size-6 block in-data-[theme='light']:hidden"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
        />
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="size-6 hidden in-data-[theme='light']:block"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
        />
      </svg>
    </button>
  );
}

export { ThemeToggle };
