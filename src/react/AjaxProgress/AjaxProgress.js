import React, { PureComponent } from "react";
import { LinearProgress } from "@material-ui/core";
import {Server} from '@barteh/as-service';

 export class AjaxProgress extends PureComponent {
  constructor() {
    super();
    this.state = { show: false };
    Server.start = this.start.bind(this);
    Server.end = this.end.bind(this);
  }
  start() {
      
        this.setState({ show: true });      
      
    
  }
  end(cnt) {
     this.setState({ show: cnt !== 0 });
  }

  render() {
    return (
      <div
        style={{
          zIndex: "10000",
          position: "fixed",
          top: "0",
          width: "100%",
          direction: "ltr",
          left: 0
        }}
      >
        {this.state.show && <LinearProgress {...this.props} variant="query" />}
      </div>
    );
  }
}

export default AjaxProgress;
