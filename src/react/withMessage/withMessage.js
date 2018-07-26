import React, {Component} from "react";

import {
    Dialog,
    Button,
    Snackbar,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle

} from '@material-ui/core';

 export default  function withMessage (Comp) {

    return  class HOC extends Component {

        constructor(props) {
            super(props);
            this.state = {
                notifyOpen: false,
                confirmOpen: false,
                confirmObject: {}
            }
            this.messageService={};
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

        confirm(obj) {
            obj.type = obj.type || "primary"; // secondary, error

            this.setState({confirmOpen: true, confirmObject: obj});

        }

        notify(message, type) {
            console.log('sssss')
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
            ret.fontSize="14px";
            return ret;
        }

        render() {
            return <div>

                <Comp messageService={this.messageService} {...this.props}/>
                <Snackbar
                style={{zIndex:"1455"}}
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
                style={{zIndex:"1350"}}
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

            </div>;
        }
    };
}


