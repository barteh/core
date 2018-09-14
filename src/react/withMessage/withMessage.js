import React from "react";

// import
// {Dialog,Button,Snackbar,DialogActions,DialogContent,DialogContentText,DialogT
// i tle} from '@material-ui/core';

import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Slide from '@material-ui/core/Slide';
import withMobileDialog from '@material-ui/core/withMobileDialog';

function Transition(props) {
    return <Slide direction="up" {...props}/>;
}

export default withMobileDialog()(function withMessage(Comp) {

    return class HOC extends React.PureComponent {

        constructor(props) {
            super(props);
            this.state = {
                notifyOpen: false,
                confirmOpen: false,
                confirmObject: {}
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

        confirm(inobj) {
            const obj = typeof inobj === "string"
                ? {
                    body: inobj
                }
                : inobj;
            obj.type = obj.type || "primary"; // secondary, error
            obj.okTitle = obj.okTitle || "قبول";
            obj.cancelTitle = obj.cancelTitle || "لغو";
            obj.size = obj.size || "normal"; //responsice | fullscreen
            this.setState({confirmOpen: true, confirmObject: obj});
            return new Promise((res, rej) => {
                this.confirmPromisResolve = res;
                this.confirmPromisReject = rej;
            });

        }

        notify(message, type) {

            let intype = type || "primary"; // secondary, error

            this.setState({notifyOpen: true, notifyMessage: message, notifyType: intype});

        }

        handleOk() {

            const {onOk} = this.state.confirmObject;
            if (onOk) {
                if (onOk instanceof Promise) {

                    onOk.then(a => {

                        this.confirmPromisResolve(a);

                    }).catch(e => {

                        this.confirmPromisReject(e)
                    });
                    //return onOk;
                }

                const result = onOk();
                if (result instanceof Promise) {
                    result
                        .then(a => this.confirmPromisResolve(a))
                        .catch(e => {

                            this.confirmPromisReject(e)
                        });

                }

                if (result instanceof Promise) {

                    result.then(a => {
                        this.confirmPromisResolve(a);

                    }).catch(e => {

                        this.confirmPromisReject(e)
                    });

                } else {

                    this.confirmPromisResolve(result);

                }

            } else {
                this.confirmPromisResolve(true);
            }
            this.handleCloseConfirm();

        }
        handleCancel() {
            const {onCancel} = this.state.confirmObject;
            if (onCancel) {
                this
                    .state
                    .confirmObject
                    .onCancel();

            } else {
                this.confirmPromisResolve(false);
            }
            this.handleCloseConfirm();
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
                        color: "white",
                        minWidth: "40vh"
                    }
                    break;
                case type = "secondary":
                    ret = {
                        backgroundColor: "#5e0ce7",
                        color: "white",
                        minWidth: "40vh"
                    }
                    break;
                case type = "error":
                    ret = {
                        backgroundColor: "red",
                        color: "white",
                        minWidth: "40vh"
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
            let fulls = false;
            if (this.confirmObject.size === "responsive") 
                fulls = this.props.fullScreen;
            else if (this.confirmObject.size === "fullscreen") 
                fulls = true;
            
            return <div>

                <Comp messageService={this.messageService} {...this.props}/>
                <Snackbar
                    style={{
                    zIndex: "1455"
                }}
                    anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center'
                }}
                    onClose={this.handleCloseNotify}
                    autoHideDuration={3000}
                    open={this.state.notifyOpen}
                    message={this.state.notifyMessage}
                    ContentProps={{
                    "style": this.headerColor(this.state.notifyType)
                }}></Snackbar>

                <Snackbar
                    style={{
                    zIndex: "1455"
                }}
                    anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center'
                }}
                    onClose={this.handleCloseNotify}
                    autoHideDuration={3000}
                    open={this.state.notifyOpen}
                    message={this.state.notifyMessage}
                    ContentProps={{
                    "style": this.headerColor(this.state.notifyType)
                }}/>

                <Dialog
                    style={{
                    zIndex: "1350"
                }}
                    disableEscapeKeyDown={this.confirmObject.disableEscapeKeyDown}
                    disableBackdropClick={this.confirmObject.disableBackdropClick}
                    fullScreen={fulls}
                    maxWidth={false}
                    TransitionComponent={Transition}
                    open={this.state.confirmOpen}
                    onClose={this.handleCancel}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description">
                    <DialogTitle>

                        <Typography noWrap color={this.state.confirmObject.type}>
                            {this.state.confirmObject.title}
                        </Typography>
                    </DialogTitle>

                    <DialogContent
                        style={{
                        minWidth: "30vw",
                        minHeight: "10vh"
                    }}>
                        {typeof this.state.confirmObject.body === "string" && <DialogContentText id="alert-dialog-description">

                            {this.state.confirmObject.body}

                        </DialogContentText>}

                        {typeof this.state.confirmObject.body !== "string" && <div id="alert-dialog-description">

                            {this.state.confirmObject.body}

                        </div>}
                    </DialogContent>
                    <Divider/>
                    <DialogActions >
                        <Button onClick={this.handleOk} color="primary" autoFocus>
                            {this.state.confirmObject.okTitle}
                        </Button>
                        <Button onClick={this.handleCancel} color="secondary">
                            {this.state.confirmObject.cancelTitle}
                        </Button>
                    </DialogActions>
                </Dialog>

            </div>;
        }
    };
});