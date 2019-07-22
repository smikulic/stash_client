import React from 'react';
require('./vertical-tab.scss');

export default function VerticalTab({ tabClass, tabName, onClick }) {
  return (
    <li className={tabClass} onClick={() => onClick(tabName)}>
      {tabName}
      <i className="fa fa-angle-right"></i>
    </li>
  );
}
