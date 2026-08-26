import { Component, type ReactNode, type ErrorInfo } from "react";

interface ErrorBoundaryProps {
    children: ReactNode;
    fallback?: ReactNode;
    onError?: (error: Error, info: ErrorInfo) => void;
}

interface ErrorBoundaryState {
    error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    override state: ErrorBoundaryState = { error: null };

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return { error };
    }

    override componentDidCatch(error: Error, info: ErrorInfo) {
        this.props.onError?.(error, info);
    }

    override render() {
        const { fallback, children } = this.props;
        const { error } = this.state;

        if (error) {
            if (fallback) return fallback;

            return (
                <div className="rounded-md bg-destructive p-4 text-destructive-foreground">
                    <p className="text-sm font-medium">
                        Something went wrong.
                    </p>
                </div>
            );
        }

        return children;
    }
}

export { ErrorBoundary };
export type { ErrorBoundaryProps };
