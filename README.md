# Barteh Core

[![Build Status](https://travis-ci.org/barteh/core.svg?branch=master)](https://travis-ci.org/barteh/core)

## common component and libraries used for barteh based projects


## Feature list

###  a. common services
1. geo.
2. orgchart.
3. unit.
4. useraction.

### b. react components
1. [withTitle](#withTitle).
2. error.
3. user.
4. withMessage.

# withTitle

adds title bar to on a component. use it for main forms and pages.

### example:
```js
import React, { Component } from 'react';
import Home from '@material-ui/icons/Home';

class README extends Component {
    render() {
        return (
            <div>
                
            </div>
        );
    }
}

export default README;

withTitle({
    title:"page title",
    subTitle:"page SubTitle",
    description:"page description",
    icon:<Home color="primary" style={{fontStyle:"36px"}}/>
})(README)

```


