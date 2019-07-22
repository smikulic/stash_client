import React from 'react';
import FormTitle from '../form-title';
import FormField from '../form-field';

export default function FormBuilder({ title, formFields }) {
  return (
    <React.Fragment>
      <FormTitle title={title} />
      { formFields.map((fieldProps, key) => {
        if (fieldProps.type === 'select') {
          return (
            <FormField key={key} selectField {...fieldProps}>
              { Object.entries(fieldProps.options).map((option, key) => {
                return <option key={key} value={option[0]}>{option[1]}</option>
              })}
            </FormField>
          )
        }
        if (fieldProps.type === 'date') {
          return <FormField key={key} dateField {...fieldProps} />
        }
        return <FormField key={key} {...fieldProps}>{fieldProps.children}</FormField>
      })}
    </React.Fragment>
  )
}
