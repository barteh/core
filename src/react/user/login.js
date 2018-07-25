import React from "react";
import { doLogin } from "../../commonServices/useraction";

import {

  Snackbar,

  Button,

  TextField
} from "@material-ui/core";

import Captcha from "./Captcha";

import PropTypes from 'prop-types';


class login extends React.Component {
  state = {
    userid: "",
    password: "",
    captchatext: "",
    showPassword: false,
    type: 1
  };
  lock = false;
  handleLogin = (event) => {
    
    event.preventDefault(); //برای submit
    if (this.lock) return;

    this.lock = true;

    const loginFn = this.props.doLogin || doLogin;

    loginFn(
      
      this.state.userid,
      this.state.password,
      this.state.captchatext,

      r => {
        
        if(!r || r===0){
          this.props.loginSuccess();
          return;}
        /*
success = 0,
        wrongChaptcha = 1,
        userOrPasswordIncorrect = 2,
        userIsDeactive = 3,
        connectionError = 4,
        unknownError = 5,
        userCRUDLoad = 6,
        keysNotMatch = 7,
        rolesNotMach = 8,
        viewsNotLoaded = 9,
        controllersNotLoaded = 10,
        userIsLocal = 11,
        userIsRemote = 12,
        userNotSet = 13,
        demoIsFinished = 14,
        domainNotSet = 15,
        domainNotRespondes = 16,
        domainNotRegistered = 17

*/


        let errors = this.state.errors;
        let message = "";

        switch (r) {
          case 0:
            if (this.props.done) this.props.done();
            message = "نام کاربری صحیح است";
            break;
          case 4:
            message = "ارتباط با سرور بر قرار نشد";
            break;
          case 1:
            message = "کد اعتبار سنجی صحیح نیست مجددا سعی کنید";
            errors.captcha = true;

            break;
          case 2:
            message = "نام کاربری یا کلمه عبور صحیح نیست";
            errors.userid = true;
            errors.password = true;

            break;
          // ....
          default:
            message = "خطای ناشناس";
        }
        
        this.setState({ showMessage: true, message: message, errors: errors });
        this.captcha.changesrc();
        this.lock = false;
      }
    );
  };
  handleChange = prop => event => {
    let state = this.state;
    state[prop] = event.target.value;
    state = this.checkErrors(state);
    this.setState(state);
  };

  handleMouseDownPassword = event => {
    event.preventDefault();
  };

  handleClickShowPasssword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  state = {
    errors: { userid: true, password: true, captcha: true },
    userid: "",
    password: "",
    captchatext: "",
    type: 1,
    disableSubmit: true,
    message: ""
  };

  checkErrors(instate) {
    let state = this.clearErrors(instate);

    state.errors.userid = state.userid === "";
    state.errors.password = state.password === "";
    state.errors.captcha = state.captchatext === "";
    state.disableSubmit =
      state.errors.captcha || state.errors.password || state.errors.userid;
    return state;
  }

  clearErrors(state) {
    for (const key in state.errors) {
      state.errors[key] = false;
    }
    return state;
  }
  render() {
    return (
      <form>
        <TextField
          autoFocus
         
          label="نام کاربری"
          style={{ direction: "ltr" }}
          value={this.state.userid}
          onChange={this.handleChange("userid")}
          fullWidth
          error={this.state.errors.userid}
        />
        <TextField
          
          label="رمز عبور"
          style={{ direction: "ltr" }}
          type={this.state.showPassword ? "text" : "password"}
          value={this.state.password}
          onChange={this.handleChange("password")}
          fullWidth
          error={this.state.errors.password}
        />

        <Captcha onRef={ref => (this.captcha = ref)} />
        <div>
          <TextField
            label="متن اعتبار سنجی"
            style={{ width: "100%", direction: "ltr", fontFamily: "arial" }}
            value={this.state.captchatext}
            onChange={this.handleChange("captchatext")}
            fullWidth
            error={this.state.errors.captcha}
            
          />
        </div>
        <div>
          <Button
            type="submit"
            fullWidth={true}
            onClick={this.handleLogin.bind(this)}
            variant="raised"
            color="primary"
            disabled={this.state.disableSubmit}
          >
            ورود
          </Button>
        </div>

        <Snackbar
          open={this.state.showMessage}
          message={<span>{this.state.message}</span>}
          resumeHideDuration={5000}
        />
      </form>
    );
  }
}

login.propTypes={
  loginSuccess:PropTypes.func,
  doLogin:PropTypes.func,
  done:PropTypes.func

}

export default login;
