import React, {PureComponent} from "react";
import PropTypes from 'prop-types';
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

import {doLogout} from '../../commonServices/useraction';

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
    this.logOut = this
      .logOut
      .bind(this);

  }

  logOut() {
    doLogout(
      () => {
        this
          .props
          .userinfoService
          .refresh()
        }

    );

  }

  handleClose() {

    this
      .props
      .onClose();
  }
  render() {

    const {open, target, userinfo} = this.props;
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

            {userinfo && <CardHeader
              title={userinfo.fullname}
              subheader={"نام کاربری: " + userinfo.userId}/>}
            <CardContent >
              <div style={{
                textAlign: "center"
              }}>
                <UserAvatar size="lg"/>
              </div>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                color="primary"
                onClick={this.logOut}>
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

// UserMenu.propTypes={   userinfo:PropTypes.any,   onClose:PropTypes.func,
// open:PropTypes.bool,   target:PropTypes.any }

 UserMenu.propTypes={   
   userinfo:PropTypes.object.isRequired,
   userinfoService:PropTypes.object.isRequired,
      //onClose:PropTypes.func.is,
 
  //  target:PropTypes.any 
  }



export default withStyles(styles)(UserMenu);
