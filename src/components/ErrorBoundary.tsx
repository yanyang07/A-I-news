import React from 'react';

interface State { error: Error | null }

export class ErrorBoundary extends React.Component<{ children: React.ReactNode }, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  render() {
    if (this.state.error) {
      return (
        <div className="min-h-screen bg-white flex items-center justify-center p-8">
          <div className="max-w-xl w-full border border-red-200 rounded-xl p-6 bg-red-50">
            <h2 className="text-red-700 font-bold text-lg mb-2">渲染错误</h2>
            <pre className="text-xs text-red-600 whitespace-pre-wrap break-all">
              {this.state.error.message}
              {'\n'}
              {this.state.error.stack}
            </pre>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
