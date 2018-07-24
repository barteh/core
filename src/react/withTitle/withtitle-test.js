import React from "react";
import DefaultTitleBar from "./default-titlebar"
import {
  Slide,
  Typography,
  Divider,
  Grid,
  Dialog,
  Button,
  Snackbar,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle

} from "@material-ui/core";

/**
 *
 * @param {component} A
 * @description an HOC for adding title to barteh routing component
 */

export const withTitleHOC = (A, TitleBar) => {
  return class extends React.Component {
    state = { in: false
    };

    constructor(props) {
      super(props);
      this.state = {
        notifyOpen: false,
        confirmOpen: false,
        confirmObject: {}, in: false
      }
      this.messageService = {};
      this.messageService.confirm = this
        .confirm
        .bind(this);
      this.messageService.notify = this
        .notify
        .bind(this);

      this.handleCloseConfirm = this
        .handleCloseConfirm
        .bind(this);
      this.handleCloseNotify = this
        .handleCloseNotify
        .bind(this);

      this.handleOk = this
        .handleOk
        .bind(this);
      this.handleCancel = this
        .handleCancel
        .bind(this);
    }

    componentDidMount() {
      this.setState({in: true});
    }

    confirm(obj) {
      obj.type = obj.type || "primary"; // secondary, error

      this.setState({confirmOpen: true, confirmObject: obj});

    }

    notify(message, type) {
      let intype = type || "primary"; // secondary, error

      this.setState({notifyOpen: true, notifyMessage: message, notifyType: intype});

    }

    handleOk() {
      if (this.state.confirmObject.onOk) 
        this.state.confirmObject.onOk();
      this.handleCloseConfirm();
    }
    handleCancel() {

      if (this.state.confirmObject.onCancel) 
        this.state.confirmObject.onCancel();
      this.handleCloseConfirm()
    }

    handleCloseConfirm() {
      this.setState({confirmOpen: false});

    }

    handleCloseNotify() {
      this.setState({notifyOpen: false});
    }

    headerColor(type) {
      let ret = null;
      switch (type) {
        case type = "primary":
          ret = {
            backgroundColor: "green",
            color: "white"
          }
          break;
        case type = "secondary":
          ret = {
            backgroundColor: "orange",
            color: "white"
          }
          break;
        case type = "error":
          ret = {
            backgroundColor: "#880000",
            color: "white"
          }
          break;
        default:
          ret = {
            backgroundColor: "#880000",
            color: "white"
          }
      }
      ret.fontSize = "14px";
      return ret;
    }

    render() {
      const title = (A.context || {}).title || (A.component.context || {}).title;
      const subTitle = (A.context || {}).subTitle || (A.component.context || {}).subTitle;
      const pIcon = (A.context || {}).icon || (A.component.context || {}).icon;

      // || <span className="bt bt-activity bt-3x" />);
      const AIcon = p => pIcon;
      const description = (A.context || {}).description || (A.component.context || {}).description;

      const needToTitle = pIcon || description || title || subTitle;
      return (
        <div>
          {!needToTitle && <Slide in={this.state.in} direction="left">
            <A.component  messageService={this.messageService} {...this.props}/>
          </Slide>}
          {
            
            // needToTitle && 
            <div>
            <Slide in={this.state.in} direction="right">
              <TitleBar
                title={title}
                subTitle={subTitle}
                description={description}
                AIcon={AIcon}
                hasIcon={pIcon}/>
            </Slide>
            <div style={{
              marginTop: "10px"
            }}>
              <Slide in={this.state.in} direction="up">
                <A.component messageService={this.messageService} {...this.props}/>

              </Slide>
            </div>
            </div>
          }


          <Snackbar
          anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
      }}
          onClose={this.handleCloseNotify}
          autoHideDuration={3000}
          open={this.state.notifyOpen}
          message={this.state.notifyMessage}
          SnackbarContentProps={{
          "style": this.headerColor(this.state.notifyType)
      }}/>

      <Dialog
          open={this.state.confirmOpen}
          onClose={this.handleCancel}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description">
          <DialogTitle
              id="alert-dialog-title"
              style={this.headerColor(this.state.confirmObject.type)}
              disableTypography
              >
              
                  {this.state.confirmObject.title}
                  
              

          </DialogTitle>
          <DialogContent>
              <DialogContentText id="alert-dialog-description">
                  {this.state.confirmObject.body}
              </DialogContentText>
          </DialogContent>
          <DialogActions>
              <Button onClick={this.handleOk} color="primary" autoFocus>
                  قبول
              </Button>
              <Button onClick={this.handleCancel} color="secondary">
                  لغو
              </Button>
          </DialogActions>
      </Dialog>



        </div>
        )
    }
  };
};

export function withTitleSingle(inroute, TitleBar) {
  let out = {};
  for (let o in inroute) {
    if (o !== "component") {
      out[o] = inroute[o];
    }
  }

  out.component = withTitleHOC(inroute, inroute.component.TitleBar || TitleBar || DefaultTitleBar);
  return out;
}

export default function withTitle(routes, TitleBar) {
  let out = [];
  for (var i = 0; i < routes.length; i++) {
    //adminRoute[i].extcomp = withTitle(adminRoute[i]);
    out.push(withTitleSingle(routes[i], TitleBar));
  }

  return out;
}
