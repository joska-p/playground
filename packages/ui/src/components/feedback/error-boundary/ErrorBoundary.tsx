import { Component, type ErrorInfo, type ReactNode } from 'react';
import type { ColorVariant } from '../../../lib/colorVariant';
import { DefaultFallback } from '../default-fallback/DefaultFallback';

export type FallbackRenderer = (props: { error: Error; reset: () => void }) => ReactNode;

export interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode | FallbackRenderer;
  variant?: ColorVariant;
  onError?: (error: Error, info: ErrorInfo) => void;
}

interface ErrorBoundaryState {
  error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public override state: ErrorBoundaryState = { error: null };

  public static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error };
  }

  public override componentDidCatch(error: Error, info: ErrorInfo): void {
    this.props.onError?.(error, info);
  }

  public reset = (): void => {
    this.setState({ error: null });
  };

  public override render(): ReactNode {
    const { error } = this.state;
    const { children, fallback, variant } = this.props;

    if (!error) {
      return children;
    }

    if (typeof fallback === 'function') {
      return fallback({ error, reset: this.reset });
    }

    if (fallback) {
      return fallback;
    }

    return (
      <DefaultFallback
        error={error}
        reset={this.reset}
        variant={variant}
      />
    );
  }
}
