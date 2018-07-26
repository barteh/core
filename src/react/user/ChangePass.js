import React, {Component} from 'react';
import {Button, TextField, Grid, Typography, Paper} from '@material-ui/core';
import {withStyles} from "@material-ui/core/styles";

import Captcha from "./Captcha";

import {doChangePass} from "../../commonServices/useraction";

import {withMessage} from '../withMessage';

import PropTypes from 'prop-types';


const styles = theme => ({
    root: {
        maxWidth: 400
    },
    tilteChange: {
        // backgroundColor:'#b4c9fb',
        padding: theme.spacing.unit,
        marginBottom: '30px'
    },
    papre: {
        padding: theme.spacing.unit * 2
    },
    btnok: {
        marginTop: '30px'
    },
    subheading: {
        fontSize: theme
            .typography
            .pxToRem(12)
    }
});

class changePass extends Component {
    constructor() {
        super();
        this.state = {
            errors: {
                oldPass: true,
                newPass: true,
                rePass: true,
                captcha: true
            },
            userid: "",
            oldPass: "",
            newPass: "",
            rePass: "",
            captchatext: "",
            showPassword: false,
            showMessage: false,
            disableSubmit: true,
            helptxt: ""
        };
        this.handleChangePass = this
            .handleChangePass
            .bind(this);
        this.handleChange = this
            .handleChange
            .bind(this);
    }
    handleClose = () => {
        this.setState({showMessage: false});
    }
    handleChange = prop => event => {
        let state = this.state;
        state[prop] = event.target.value;
        this.setState(state);
        this.checkErrors(state);
    };
    checkErrors(state) {

        state.errors.oldPass = state.oldPass === "";
        state.errors.newPass = state.newPass === "";
        state.errors.rePass = state.rePass === "";
        state.errors.captcha = state.captchatext === "";

    }

    handleChangePass = () => {

        if (this.state.newPass !== this.state.rePass) {

            this
                .props
                .messageService
                .notify('تکرار رمز عبور با رمز عبور برابر نیست');
            this
                .captcha
                .changesrc();

            return;
        }
        const doChangePassFn = this.props.doChangePass || doChangePass;
        doChangePassFn(this.state.oldPass, this.state.newPass, this.state.captchatext).then(r => {

            switch (r) {
                case 0:

                    this
                        .props
                        .messageService
                        .notify('پسورد با موفقیت ثبت گردید');
                    break;
                case 5:
                    this
                        .props
                        .messageService
                        .notify('ارتباط با سرور بر قرار نشد', "error");
                    break;
                case 2:
                    this
                        .props
                        .messageService
                        .notify('پسورد قبلی خود را بدرستی وارد کنید', "secondary");
                    break;
                case 13:
                    this
                        .props
                        .messageService
                        .notify('کاربر از سیستم خارج شده است', "secondary");
                    break;
                case 18:

                    this
                        .props
                        .messageService
                        .notify('پسورد از لحاظ امنیتی ضعیف می باشد', "secondary");

                    break;
                case 19:
                    this
                        .props
                        .messageService
                        .notify('کاربر دسترسی به سیستم ندارد', "error");
                    break;
                case 1:
                    this
                        .props
                        .messageService
                        .notify('کد امنیتی را به درستی وارد کنید', "secondary");
                    break;

                default:

            }
            this
                .captcha
                .changesrc();
        }).catch(r => {
            console.log('9586966665252555', r);
        })
    }

    render() {
        const {oldPass, newPass, rePass, captchatext} = this.state;
        const enable = oldPass.length > 0 && newPass.length > 0 && rePass.length > 0 && captchatext.length > 0;
        const {classes} = this.props;

        return (
            <form
                style={{
                textAlign: "center",
                marginTop: '80px',
                height: '100%'
            }}>

                <Grid
                    container
                    className={classes.root}
                    style={{
                    display: 'inline-block'
                }}
                    direction="row"
                    justify="center"
                    alignItems="center">

                    <Paper className={classes.papre}>

                        <Grid item>
                            <TextField
                                value={this.state.oldPass}
                                onChange={this.handleChange("oldPass")}
                                autoFocus
                                label="رمز فعلی"
                                style={{
                                direction: "ltr"
                            }}
                                error={this.state.errors.oldPass}
                                fullWidth
                                type="password"/>
                        </Grid>
                        {/* ------------------- */}
                        <Grid item>
                            <TextField
                                value={this.state.newPass}
                                onChange={this.handleChange("newPass")}
                                autoFocus
                                label="رمز جدید"
                                style={{
                                direction: "ltr"
                            }}
                                error={this.state.errors.newPass}
                                fullWidth
                                type="password"/>
                        </Grid>
                        {/* ------------------- */}
                        <Grid item>
                            <TextField
                                value={this.state.rePass}
                                onChange={this.handleChange("rePass")}
                                autoFocus
                                type="password"
                                label="تکرار رمز جدید"
                                style={{
                                direction: "ltr"
                            }}
                                error={this.state.errors.rePass}
                                fullWidth/>
                        </Grid>
                        <Typography
                            className={classes.subheading}
                            variant="subheading"
                            gutterBottom
                            align="center"
                            color="textSecondary">
                            رمز عبور باید شامل حروف بزرگ ,کوچک,کاکتر باشد.
                        </Typography>
                        {/* ------------------- */}
                        <Grid item>
                            <Captcha onRef={ref => (this.captcha = ref)}/>
                        </Grid>
                        {/* ------------------- */}

                        <Grid item>
                            <TextField
                                label="متن اعتبارسنجی"
                                style={{
                                width: "100%",
                                direction: "ltr",
                                fontFamily: "arial"
                            }}
                                error={this.state.errors.captcha}
                                value={this.state.captchatext}
                                onChange={this.handleChange("captchatext")}
                                fullWidth></TextField>
                        </Grid>
                        <Grid item>
                            <Button
                                type="submit"
                                fullWidth={true}
                                onClick={this.handleChangePass}
                                variant="raised"
                                color="primary"
                                disabled={!enable}
                                className={classes.btnok}>
                                ثبت
                            </Button>
                        </Grid>

                    </Paper>
                </Grid>

            </form>
        );
    }
}

changePass.propTypes={
    classes:PropTypes.any,
    messageService:PropTypes.any,
    doChangePass:PropTypes.func
}

export default withMessage(withStyles(styles)(changePass));
