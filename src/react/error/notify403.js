import React, { PureComponent } from "react";
import { Snackbar
  
} from "@material-ui/core";

import {withStyles} from "@material-ui/core/styles"


import {Server} from '@barteh/as-service';
const styles = () => ({
 errorsnack:{
     backgroundColor:"red",
     color:"white",
     
 }
});

class Notify403 extends PureComponent {
  state = { open: false };
  constructor() {
    super();
    this.handleClose = this.handleClose.bind(this);
    Server.hook403=()=>{
      this.setState({open:true});
    if(this.props.onShow)
      this.props.onShow();
    }  
  }



  handleClose() {
    this.setState({ open: false });
  }
  render() {
    //const { classes } = this.props;
    const { open } = this.state;
    return (
      <div>
        <Snackbar
        
        
          onClose={this.handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          open={open}
          //onClose={this.handleClose}
          ContentProps={{
            "aria-describedby": "message-id",
            
            "style":{backgroundColor:"#880000",color:"white"}
          }}
          message={<span id="message-id">دسترسی محدود </span>}
          autoHideDuration={3000}
          transitionDuration={400}
        />
      </div>
    );
  }
}

export default withStyles(styles)(Notify403);
//export default Notify403;
