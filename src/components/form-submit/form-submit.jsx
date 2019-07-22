import React from 'react';
require('./form-submit.scss');

export default function FormSubmit({ text }) {
  return (
    <div className="submit-wrapper">
      <input type="submit" className="button--submit" value={text || 'Submit'} />
      <i className="button--submit-icon fa fa-check" />
    </div>
  );
}
