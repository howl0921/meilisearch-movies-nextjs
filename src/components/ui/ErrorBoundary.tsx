import React from "react";
import type { ErrorBoundaryState, ErrorInfo } from "@/types";

interface ErrorBoundaryProps {
    children: React.ReactNode;
    fallback?: React.ComponentType<{ error?: Error; retry: () => void }>;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("ErrorBoundary caught an error:", error, errorInfo);
    }

    retry = () => {
        this.setState({ hasError: false, error: undefined });
    };

    render() {
        if (this.state.hasError) {
            const FallbackComponent = this.props.fallback || DefaultErrorFallback;
            return <FallbackComponent error={this.state.error} retry={this.retry} />;
        }

        return this.props.children;
    }
}

const DefaultErrorFallback: React.FC<{ error?: Error; retry: () => void }> = ({ error, retry }) => (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
        <div className="text-center max-w-md">
            <div className="mb-6">
                <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                        className="w-8 h-8 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z"
                        />
                    </svg>
                </div>
                <h2 className="text-2xl font-bold mb-2">出现了一些问题</h2>
                <p className="text-gray-400 mb-6">
                    应用程序遇到了意外错误。请尝试刷新页面或稍后再试。
                </p>
                {error && (
                    <details className="text-left text-sm text-gray-500 mb-4">
                        <summary className="cursor-pointer hover:text-gray-300">
                            查看错误详情
                        </summary>
                        <pre className="mt-2 p-2 bg-gray-800 rounded text-xs overflow-auto">
                            {error.message}
                        </pre>
                    </details>
                )}
            </div>
            <button
                onClick={retry}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
            >
                重试
            </button>
            <button
                onClick={() => window.location.reload()}
                className="ml-3 px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
            >
                刷新页面
            </button>
        </div>
    </div>
);

export default ErrorBoundary;
