import React from 'react';
require('./form-field.scss');

export default function FormField({ targetName, onChangeEvent, selectField, dateField, value, children, label, defaultValue }) {
  return (
    <div className="form-field">
      { selectField && (
        <select
        name={targetName}
          className="form-select"
          defaultValue={defaultValue}
          onChange={onChangeEvent}
        >
          {children}
        </select>
      )}
      { dateField && (
        <input
          type="date"
          name={targetName}
          className="form-input"
          placeholder={label}
          value={value}
          onChange={onChangeEvent}
        />
      )}
      { !selectField && !dateField && (
        <input
          type="text"
          name={targetName}
          className="form-input"
          placeholder={label}
          value={value}
          onChange={onChangeEvent}
          data-lpignore="true"
        />
      )}
    </div>
  );
}
