import React, { Component } from 'react';
import TextField from 'material-ui/TextField';

class UserSettingsForm extends Component {

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-xs-12">
            <TextField
              fullWidth={true}
              floatingLabelText="Average monthly income"
            />
          </div>
          <div className="col-xs-12">
            <TextField
              fullWidth={true}
              floatingLabelText="Average monthly expenses"
            />
          </div>
          <div className="col-xs-6">
            <TextField
              fullWidth={true}
              floatingLabelText="Currency"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default UserSettingsForm;
