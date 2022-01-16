import { Component } from "react";
import { Link, Redirect } from "react-router-dom";

export class ErrorBoundary extends Component {
  state = { hasError: false, redirect: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // This is where you would call the Sentry, Azure Monitor, TrackJS, New Relic
    setTimeout(() => this.setState({ redirect: true }), 5000);
    console.error("ErrorBoundary caught an error", error, info);
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    } else if (this.state.hasError) {
      return (
        <h2>
          This listing has an error.
          <Link to="/">Click here</Link> to go back to home page. Or wait 5
          seconds.
        </h2>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
