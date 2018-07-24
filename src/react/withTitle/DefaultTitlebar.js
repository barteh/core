import React from "react";

import {
  
  Typography,
  Divider,
  Grid
  

} from "@material-ui/core";
export default class DefaultTitleBar extends React.PureComponent {
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