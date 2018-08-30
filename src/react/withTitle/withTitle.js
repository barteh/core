import React from "react";

//import {Slide, Typography, Divider, Grid} from "@material-ui/core";
import Slide from "@material-ui/core/Slide";
import  Typography from "@material-ui/core/Typography";
import  Divider from "@material-ui/core/Divider";
import  Grid from "@material-ui/core/Grid";




//import PropTypes from 'prop-types';
/**
 * @deprecated default title bar
 */
export class DefaultTitleBar extends React.PureComponent {
  render() {
    const {title, subTitle, description, icon} = this.props;
    const Icon=()=>icon;
    return (
      <div>
        <Grid container>
          <Grid
            item
            lg={1}
            xl={1}
            md={1}
            sm={2}
            xs={2}
            style={{
            textAlign: "center"
          }}>
            {icon && <Icon/>}
          </Grid>

          <Grid item lg={5} xl={5} md={5} sm={5} xs={5}>
            <div>
             {title && <Typography variant="title" color="primary" noWrap={true}>
                 {title}
              </Typography>}
              {subTitle && <Typography variant="subheading" color="textSecondary" noWrap={true} paragraph>
                 {subTitle}
              </Typography>}
            </div>
          </Grid>
          <Grid item lg={6} xl={6} md={6} sm={5} xs={5}>
            <div>
            {description &&  <Typography
                align="justify"
                variant="body2"
                paragraph
                color="default"
                style={{
                textIndent: "5pt"
              }}>
                {description}
              </Typography>}
            </div>
          </Grid>
        </Grid>
        <Divider/>
      </div>
    );
  }
}

// DefaultTitleBar.propTypes = {   title: PropTypes.string,   subTitle:
// PropTypes.string,   description: PropTypes.string,   AIcon:
// PropTypes.Component,   hasIcon:PropTypes.object }

/**
 *
 * @param {component} A
 * @description an HOC for adding title to barteh routing component
 */

export const withTitle = bar=>(A) => {
  return class extends React.Component {
    state = { in: true
    };

    render() {
if(!bar)
      return <A {...this.props}/>;

      const context=bar || {};
      const {title, subTitle, icon,description,TitleBar} = context;
      const Title = TitleBar || DefaultTitleBar;
      
      
      

      const needToTitle = icon !== undefined || description !== undefined || title !== undefined || subTitle !== undefined;
      if (!needToTitle) 
        return (<A {...this.props}/>);
      else 
        return (

          <div>
            <Slide in={this.state.in} direction="right">
              <Title
                title={title}
                subTitle={subTitle}
                description={description}
                icon={icon}/>
                
                </Slide>
            <div style={{
              marginTop: "10px"
            }}>

              <A {...this.props}/>

            </div>
          </div>
        );
      }
    };
};

export default withTitle;

// export function withTitleSingle(inroute, TitleBar) {   let out = {};   for
// (let o in inroute) {     if (o !== "component") {       out[o] = inroute[o];
//   }   }   out.component = withTitleHOC(inroute, inroute.component.TitleBar ||
// TitleBar || DefaultTitleBar);   return out; } export default function
// withTitle(routes, TitleBar) {   let out = [];   for (var i = 0; i <
// routes.length; i++) {     out.push(withTitleSingle(routes[i], TitleBar));   }
//   return out; }