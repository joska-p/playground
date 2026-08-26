import { Component, type ReactNode, type ErrorInfo } from 'react';

interface ErrorBoundaryProps {
    children: ReactNode;
    fallback?: ReactNode;
    onError?: (error: Error, info: ErrorInfo) => void;
}

interface ErrorBoundaryState {
    error: Error | null;
    stack: string | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    override state: ErrorBoundaryState = { error: null, stack: null };

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return { error, stack: error.stack ?? null };
    }

    override componentDidCatch(error: Error, info: ErrorInfo) {
        this.props.onError?.(error, info);
    }

    private handleRetry = () => {
        this.setState({ error: null, stack: null });
    };

    override render() {
        const { fallback, children } = this.props;
        const { error, stack } = this.state;

        if (error) {
            if (fallback) return fallback;

            const isDev = import.meta.env?.DEV ?? false;

            return (
                <div
                    role="alert"
                    className="rounded-md border border-destructive/50 bg-destructive/10 p-4 text-destructive-foreground"
                >
                    <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium">
                                {error.message || 'Something went wrong.'}
                            </p>
                            {isDev && stack && (
                                <pre className="mt-2 max-h-32 overflow-auto whitespace-pre-wrap break-all text-[10px] leading-relaxed opacity-70">
                                    {stack}
                                </pre>
                            )}
                        </div>
                        <button
                            type="button"
                            onClick={this.handleRetry}
                            className="shrink-0 rounded border border-destructive/30 px-2 py-1 text-xs font-medium transition-colors hover:bg-destructive/20"
                        >
                            Retry
                        </button>
                    </div>
                </div>
            );
        }

        return children;
    }
}

export { ErrorBoundary };
export type { ErrorBoundaryProps };
