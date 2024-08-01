// import React, { Component } from 'react';

// class ErrorBoundary extends Component {
//   constructor(props) {
//     super(props);
//     this.state = { hasError: false };
//   }

//   static getDerivedStateFromError(error) {
//     return { hasError: true };
//   }

//   componentDidCatch(error, errorInfo) {
//     // You can log the error or send it to a logging service
//     console.error(
//       'Error caught by error boundary:',
//       error,
//       errorInfo
//     );
//   }

//   render() {
//     if (this.state.hasError) {
//       // Render fallback UI when there's an error
//       return <div>Something went wrong. Please try again later.</div>;
//     }

//     // Render the normal component tree if no error occurred
//     return this.props.children;
//   }
// }

// export default ErrorBoundary;

import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can log the error or send it to a logging service
    console.error(
      'Error caught by error boundary:',
      error,
      errorInfo
    );
  }

  render() {
    if (this.state.hasError) {
      // Render a fallback UI or nothing
      return null;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
