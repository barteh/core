import React from "react";

import {Slide,  Typography, Divider, Grid} from "@material-ui/core";
import PropTypes from 'prop-types';
/**
 * @deprecated default title bar
 */
export class DefaultTitleBar extends React.PureComponent {
  render() {
    const {title, subTitle, description, AIcon, hasIcon} = this.props;
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
            {hasIcon && <AIcon/>}
          </Grid>

          <Grid item lg={5} xl={5} md={5} sm={5} xs={5}>
            <div>
              <Typography variant="title" color="primary" noWrap={true}>
                ○ {title}
              </Typography>
              <Typography variant="subheading" color="textSecondary" noWrap={true} paragraph>
                ♦ {subTitle}
              </Typography>
            </div>
          </Grid>
          <Grid item lg={6} xl={6} md={6} sm={5} xs={5}>
            <div>
              <Typography
                align="justify"
                variant="body2"
                paragraph
                color="default"
                style={{
                textIndent: "5pt"
              }}>
                {description}
              </Typography>
            </div>
          </Grid>
        </Grid>
        <Divider/>
      </div>
    );
  }
}

DefaultTitleBar.propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.string,
  description: PropTypes.string,
  AIcon: PropTypes.Component,
  hasIcon:PropTypes.bool
}

/**
 *
 * @param {component} A
 * @description an HOC for adding title to barteh routing component
 */

export const withTitleHOC = (A, TitleBar) => {
  return class extends React.Component {
    state = { in: false
    };
    componentDidMount() {
      this.setState({in: true});
    }

    render() {
      const title = (A.context || {}).title || (A.component.context || {}).title;
      const subTitle = (A.context || {}).subTitle || (A.component.context || {}).subTitle;
      const pIcon = (A.context || {}).icon || (A.component.context || {}).icon;

      // || <span className="bt bt-activity bt-3x" />);
      const AIcon = () => pIcon;
      const description = (A.context || {}).description || (A.component.context || {}).description;

      const needToTitle = pIcon || description || title || subTitle;

      if (!needToTitle) 
        return (
          <Slide in={this.state. in} direction="left">
            <A.component {...this.props}/>
          </Slide>
        );
      else 
        return (
          <div>
            <Slide in={this.state. in} direction="right">
              <TitleBar
                title={title}
                subTitle={subTitle}
                description={description}
                AIcon={AIcon}
                hasIcon={pIcon}/></Slide>
            <div style={{
              marginTop: "10px"
            }}>
              <Slide in={this.state. in} direction="up">

                <A.component {...this.props}/>

              </Slide>
            </div>
          </div>
        );
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
    
    out.push(withTitleSingle(routes[i], TitleBar));
  }

  return out;
}
