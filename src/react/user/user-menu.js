import React, {PureComponent} from "react";

import {
  Card,
  CardHeader,
  CardActions,
  CardContent,
  Popover,
  Button
  
} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";

import { doLogout} from '../commonServices/useraction';

import UserAvatar from './user-avatar';

import {Link} from 'react-router-dom';

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
  
    componentWillMount() {
    
      this.setState({uinfo: this.props.userinfo});

  }

  handleClose() {

    this
      .props
      .onClose();
  }
  render() {
    const {classes} = this.props;
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
          <Card className={classes.card}>

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

export default withStyles(styles)(UserMenu);
