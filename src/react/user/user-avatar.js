import React, { Component } from "react";

import Avatar from "@material-ui/core/Avatar";
import { withStyles } from "@material-ui/core/styles";



import { Person } from "@material-ui/icons";

const styles = theme => {

  return {
    xsAvatar: {
      width: "25px",
      height: "25px",
      fontSize: "25px"
    },
    smAvatar: {
     //   backgroundColor:"#8866FF",
      width: "35px",
      height: "35px",
      fontSize: "35px"
    },
    mdAvatar: {
   //     backgroundColor:"#8866FF",
      width: "55px",
      height: "55px",
      fontSize: "55px"
    },
    lgAvatar: {
     //   backgroundColor:"#8866FF",
      width: "85px",
      height: "85px",
      fontSize: "85px"
    },
    xlAvatar: {
    //    backgroundColor:"#8866FF",
      width: "105px",
      height: "105px",
      fontSize: "105px"
    }
  };
};

class UserAvatar extends Component {
 

  render() {
    const {classes}=this.props;
    let {size}=this.props;
    size=size ||"sm";
    const cl=classes[size+"Avatar"];
    

    return (
      <Avatar className={cl} style={{display:"inline-flex"}}>
        <Person  className={cl} />
      </Avatar>
    );
  }
}

export default withStyles(styles)(UserAvatar);
