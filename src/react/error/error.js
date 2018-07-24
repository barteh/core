import React from "react";
import {Link} from 'react-router-dom';
class ErrorBoundary extends React.Component {
  static logger = (e, i) => {
    console.log(`Barteh Error: component error, ${e},${i}`);
  };
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    
    // Display fallback UI
    this.setState({ hasError: true });
    
    // You can also log the error to an error reporting service
    console.log(85)
    if (!this.props.dontLog) ErrorBoundary.logger(error, info);
    if (this.props.handler) this.props.handler();
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      if (this.props.component) return this.props.component;
      else return <div><h1>خطای سیستمی</h1>
      <div>
      <Link to="/">صفحه اصلی</Link>
      </div>
      </div>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
