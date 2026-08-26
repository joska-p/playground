import { cn } from "../../lib/cn";

function Spinner({ className }: { className?: string }) {
    return (
        <svg
            className={cn("animate-spin", className)}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            height="20"
            width="20"
        >
            <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
            />
            <circle
                className="opacity-75"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                strokeDasharray="30 150"
                strokeLinecap="round"
            />
        </svg>
    );
}

export { Spinner };
