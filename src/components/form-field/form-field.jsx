import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
require('./form-field.scss');

class FormField extends Component {
  fieldProps() {
    return {
      fullWidth: true,
      floatingLabelText: this.props.label,
      value: this.props.value,
      onChange: this.props.onChangeEvent,
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
              <SelectField {...this.fieldProps()}>
                {children}
              </SelectField>
              <input name={targetName} type="hidden" value={value} />
            </span>
          )}
           { !selectField && (
             <TextField {...this.fieldProps()} name={targetName} />
           )}
        </div>
      </div>
    );
  }
}

export default FormField;
