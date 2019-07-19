import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
require('./form-field.scss');

class FormField extends Component {
  fieldProps() {
    return {
      onChange: this.props.onChangeEvent,
      value: this.props.value,
      fullWidth: true,
    };
  }

  render() {
    const {
      selectField,
      targetName,
      value,
      children,
    } = this.props;

    return (
      <div className="row">
        <div className="col-xs-8 col-xs-push-2">
          { selectField && (
            <span>
              <Select {...this.fieldProps()}>
                {children}
              </Select>
              <input name={targetName} type="hidden" value={value} />
            </span>
          )}
          { !selectField && (
            <span>
              <TextField name={targetName} {...this.fieldProps()} />{children}
            </span>
          )}
        </div>
      </div>
    );
  }
}

export default FormField;
