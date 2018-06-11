import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import DatePicker from 'material-ui/DatePicker';
require('./form-field.scss');

class FormField extends Component {
  fieldProps() {
    return {
      floatingLabelText: this.props.label,
      onChange: this.props.onChangeEvent,
      floatingLabelFixed: true,
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
              <SelectField {...this.fieldProps()}>
                {children}
              </SelectField>
              <input name={targetName} type="hidden" value={value} />
            </span>
          )}
          { !selectField && (
            <span>
              <TextField name={targetName} {...this.fieldProps()} />
              {children}
            </span>
          )}
        </div>
      </div>
    );
  }
}

export default FormField;
