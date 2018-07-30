import React, {PureComponent} from "react";
import UserAvatar from "./UserAvatar";
//import { Manager, Target, Popper } from "react-popper";
// import PropTypes from 'prop-types';
import UserMenu from './UserMenu';
class User extends PureComponent {
  constructor(props) {
    super(props);

    this.handlePopoverToggle = this
      .handlePopoverToggle
      .bind(this);
    this.handlePopoverClose = this
      .handlePopoverClose
      .bind(this);
  }
  handlePopoverToggle = event => {

    this.setState({
      open: !this.state.open,
      elem: event.currentTarget
    });
  };

  handlePopoverClose = () => {

    this.setState({open: false});
  };
  state = {
    open: false
  }
  render() {
    const {userinfo}=this.props;
    return (
      <div
        onClick={this.handlePopoverToggle}
        style={{
        cursor: "pointer"
      }}>

        <UserAvatar/>
        <UserMenu
        userinfo={userinfo}
          open={this.state.open}
          target={this.state.elem}
          onClose={this.handlePopoverClose}
          
          />

      </div>
    );
  }
}

// User.propTypes={
//   userinfo:PropTypes.any
// };
export default User;
