import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';

require('./page-item-wrapper.scss');

class PageItemWrapper extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-xs-12">
          <Paper className="page-item--wrapper">
            {this.props.children}
          </Paper>
        </div>
      </div>
    );
  }
};

export default PageItemWrapper;
