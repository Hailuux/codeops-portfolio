import { Component } from "react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error, errorInfo) {
    console.error(
      `[${this.props.name || "Application"} ErrorBoundary]`,
      error,
      errorInfo
    );
  }

  handleRetry = () => {
    this.setState({
      hasError: false,
      error: null,
    });

    this.props.onRetry?.();
  };

  render() {
    if (this.state.hasError) {
      return (
        <section className="error-fallback" role="alert">
          <h2>{this.props.title || "This section is temporarily unavailable"}</h2>

          <p>
            {this.props.message ||
              "Something went wrong in this section. Other parts of the application should remain available."}
          </p>

          {import.meta.env.DEV && this.state.error && (
            <details>
              <summary>Developer error details</summary>
              <pre>{this.state.error.message}</pre>
            </details>
          )}

          <button type="button" onClick={this.handleRetry}>
            Try again
          </button>
        </section>
      );
    }

    return this.props.children;
  }
}