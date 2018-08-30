import React, {PureComponent} from "react";

//import PropTypes from "prop-types"

import {
  Card,
  CardHeader,
  CardActions,
  CardContent,
  Popover,
  Button
  
} from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";

import { doLogout} from '../../commonServices/useraction';

import UserAvatar from './UserAvatar';

import Link from 'react-router-dom/Link';

const styles = {
  card: {
    minWidth: "180px"
  }
}

class UserMenu extends PureComponent {
  state = {
    open: false
  };
  constructor(props) {
    super(props);
    this.handleClose = this
      .handleClose
      .bind(this);

    this.state.uinfo = {};

  }

  componentWillUnmount() {
    
    if (this.sub) 
      this.sub.unsubscribe();
    }
  
    UNSAFE_componentWillMount() {
    
      this.setState({uinfo: this.props.userinfo});

  }

  handleClose() {

    this
      .props
      .onClose();
  }
  render() {
    
    const {open, target} = this.props;
    const {uinfo} = this.state;

    return (
      <div>

        <Popover
          open={open}
          anchorEl={target}
          onClose={this.handleClose}
          anchorOrigin={{
          vertical: "bottom",
          horizontal: "center"
        }}
          transformOrigin={{
          vertical: "top",
          horizontal: "center"
        }}>
          <Card >

          {uinfo &&  <CardHeader title={uinfo.fullname} subheader={"نام کاربری: " + uinfo.userId}/>}
            <CardContent >
              <div style={{
                textAlign: "center"
              }}>
                <UserAvatar size="lg"/>
              </div>
            </CardContent>
            <CardActions>
              <Button size="small" color="primary" onClick={() => doLogout(()=>{this.props.userinfo.refresh()})}>
                خروج
              </Button>
              <Button size="small" color="primary" component={Link} to="/changepass">
                تغییر رمز
              </Button>
            </CardActions>
          </Card>
        </Popover>

      </div>
    );
  }
}

// UserMenu.propTypes={
//   userinfo:PropTypes.any,
//   onClose:PropTypes.func,
//   open:PropTypes.bool, 
//   target:PropTypes.any

// }

export default withStyles(styles)(UserMenu);
