import React from 'react';
require('./form-field.scss');

export default function FormField({
  onChangeEvent,
  defaultValue,
  selectField,
  targetName,
  dateField,
  children,
  label,
  value,
}) {
  return (
    <div className="form-field">
      <label htmlFor={targetName}>{label}</label>
      { selectField && (
        <select name={targetName} className="form-select" defaultValue={defaultValue} onChange={onChangeEvent}>
          {children}
        </select>
      )}
      { dateField && (
        <input type="date" name={targetName} className="form-input" value={value} onChange={onChangeEvent} />
      )}
      { !selectField && !dateField && (
        <input
          type="text" 
          name={targetName}
          className="form-input"
          data-lpignore="true"
          value={value}
          onChange={onChangeEvent}
        />
      )}
    </div>
  );
}
