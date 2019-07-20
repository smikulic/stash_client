import React from 'react';
require('./form-title.scss');

export default function FormTitle({ title }) {
  if (title) {
    return (
      <div className="form--title-wrapper">
        <div className="form--title">
          {title}
          </div>
      </div>
    );
  }

  return null;
}
