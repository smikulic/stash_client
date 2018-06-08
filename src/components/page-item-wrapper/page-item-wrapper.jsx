import React, { Component } from 'react';
import { Link } from 'react-router';
import Paper from 'material-ui/Paper';

require('./page-item-wrapper.scss');

class PageItemWrapper extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-xs-12">
          <Paper className="page-item--wrapper" zDepth={1}>
            {this.props.children}
          </Paper>
        </div>
      </div>
    );
  }
};

export default PageItemWrapper;
