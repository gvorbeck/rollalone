import { Component, ErrorInfo, ReactNode } from "react";
import { createErrorBoundaryHandler } from "@/utils/errorHandling";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

/**
 * Error boundary component to catch and handle JavaScript errors in React components
 * Provides a graceful fallback UI when an error occurs
 */
class ErrorBoundary extends Component<Props, State> {
  private errorHandler = createErrorBoundaryHandler("ErrorBoundary");

  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Use the centralized error handler with proper type conversion
    this.errorHandler.onError(error, {
      componentStack: errorInfo.componentStack || "Unknown component stack",
    });
  }

  render() {
    if (this.state.hasError) {
      // Render custom fallback UI or default error message
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
          <div className="max-w-md mx-auto text-center p-6">
            <div className="bg-red-900/20 border border-red-800 rounded-lg p-6">
              <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-red-900/40 rounded-full">
                <svg
                  className="w-6 h-6 text-red-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>

              <h2 className="text-lg font-semibold text-red-200 mb-2">
                Something went wrong
              </h2>

              <p className="text-red-300 mb-4">
                We encountered an unexpected error. Please try refreshing the
                page.
              </p>

              <button
                onClick={() => window.location.reload()}
                className="inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-md transition-colors cursor-pointer"
              >
                Refresh Page
              </button>

              {process.env.NODE_ENV === "development" && this.state.error && (
                <details className="mt-4 text-left">
                  <summary className="cursor-pointer text-sm font-medium text-red-300">
                    Error Details (Development)
                  </summary>
                  <pre className="mt-2 text-xs bg-red-900/30 p-2 rounded border overflow-auto">
                    {this.state.error.stack}
                  </pre>
                </details>
              )}
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
