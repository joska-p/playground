import { Component, type ErrorInfo, type ReactNode } from 'react';
import type { ColorVariant } from '../../lib/colorVariant';
import { DefaultFallback } from './DefaultFallback';

export type FallbackRenderer = (props: { error: Error; reset: () => void }) => ReactNode;

export type ErrorBoundaryProps = {
  children: ReactNode;
  /** Custom fallback UI. A render function receives `{ error, reset }`; a
   *  plain node is rendered as-is (with no access to `reset`). Omit to use
   *  `DefaultFallback`. */
  fallback?: ReactNode | FallbackRenderer;
  /** Color passed to `DefaultFallback` when no custom `fallback` is given.
   *  Ignored if `fallback` is provided. */
  variant?: ColorVariant;
  onError?: (error: Error, info: ErrorInfo) => void;
}

type ErrorBoundaryState = {
  error: Error | null;
}

/**
 * ErrorBoundary
 * -------------
 * The one deliberate exception to this library's "components are
 * stateless" rule (see GUIDELINES.md §4.3). React has no hook-based way
 * to catch render errors — `getDerivedStateFromError`/`componentDidCatch`
 * only exist on class components, and there is still no hooks equivalent
 * as of React 19. The `hasError`/`error` state is therefore intrinsic to
 * what an error boundary *is*, not a design choice — everything else in
 * this component is kept as thin as possible around that unavoidable
 * state, and the actual fallback UI (`DefaultFallback`) is a fully
 * stateless component that takes `error`/`reset` as plain props.
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { error: null };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    this.props.onError?.(error, info);
  }

  reset = () => { this.setState({ error: null }); };

  render() {
    const { error } = this.state;
    const { children, fallback, variant } = this.props;

    if (!error) return children;

    if (typeof fallback === 'function') return fallback({ error, reset: this.reset });
    if (fallback) return fallback;

    return (
      <DefaultFallback
        error={error}
        reset={this.reset}
        variant={variant}
      />
    );
  }
}
