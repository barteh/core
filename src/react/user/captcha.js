import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
const styles = theme => ({
    root:{
        textAlign :'center',
        display:'block'
    }
    ,
imageChap:{
    padding:'15px',
    border:'1px solid #ffd800',
    cursor:'pointer',
    marginTop:'35px',
    textAlign :'center',
  
}


});

class Captcha extends Component {
    constructor(){
        super();
        this.state ={
            src : "/chaptcha.jpg",
        }
       this.changesrc = this.changesrc.bind(this);
       
    }
    changesrc () {
      
        this.setState({ src :"'/chaptcha.jpg?rnd='"+Math.random(23400)});
        
      }

      componentDidMount() {
        this.props.onRef(this)
      }
      componentWillUnmount() {
        this.props.onRef(undefined)
      }
     
    render() {
        
        const { classes } = this.props;
      
        return (
            <div className ={classes.root}>
            <div>
          <img alt="کد اعتبار سنجی" src={this.state.src} onClick={this.changesrc}  title="براي تعويض تصوير کليک کنيد" className ={classes.imageChap}/>
</div>

    
            </div>

        );
    }
}
Captcha.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(Captcha);