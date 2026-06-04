type ChevronIconProps = {
  isOpen: boolean;
  className?: string;
};

function ChevronIcon({ isOpen, className = "" }: ChevronIconProps) {
  return (
    <svg
      className={`text-muted-foreground h-4 w-4 transition-transform ${
        isOpen ? "rotate-180" : ""
      } ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

export { ChevronIcon };
