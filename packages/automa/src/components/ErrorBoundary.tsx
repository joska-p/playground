import { Component, type ErrorInfo, type ReactNode } from 'react';

type ErrorBoundaryProps = {
  children: ReactNode;
  fallback?: ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
  error: Error | undefined;
};

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false, error: undefined };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error('ErrorBoundary caught:', error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className="flex items-center justify-center">
            <div className="border-border bg-card rounded-lg border px-6 py-5 text-center">
              <div className="border-destructive/30 bg-destructive/10 mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full border">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M9 6V9.5"
                    stroke="#ef4444"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <circle
                    cx="9"
                    cy="12.5"
                    r="0.75"
                    fill="#ef4444"
                  />
                  <circle
                    cx="9"
                    cy="9"
                    r="7"
                    stroke="#ef4444"
                    strokeWidth="1.3"
                    opacity="0.3"
                  />
                </svg>
              </div>
              <p className="text-foreground font-medium">
                Something went wrong
              </p>
              <p className="text-muted-foreground mt-1 text-sm">
                {this.state.error?.message}
              </p>
            </div>
          </div>
        )
      );
    }
    return this.props.children;
  }
}

export { ErrorBoundary };
