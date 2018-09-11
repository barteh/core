import React from "react";

//import PropTypes from 'prop-types';

class ErrorBoundary extends React.Component {
  static logger = (e, i) => {
    console.log(`Barteh Error: component error, ${e},${i}`);
  };
  constructor(props) {
    super(props);
    this.state = { hasError: false };
    this.reload=this.reload.bind(this);
  }
reload(){
  window.location.replace("/")
}
  componentDidCatch(error, info) {
    
    // Display fallback UI
    this.setState({ hasError: true });
    
    // You can also log the error to an error reporting service
        if (!this.props.dontLog) ErrorBoundary.logger(error, info);
    if (this.props.handler) this.props.handler();
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      if (this.props.component) return this.props.component;
      else return <div><h1>خطای سیستمی</h1>
      <div>
      <a href="/" onClick={this.reload}>صفحه اصلی</a>
      </div>
      </div>;
    }
    return this.props.children;
  }
}

// ErrorBoundary.propTypes={
//   children:PropTypes.any,
//   component:PropTypes.func,
//   handler:PropTypes.func,
//   dontLog:PropTypes.bool
// }

export default ErrorBoundary;
