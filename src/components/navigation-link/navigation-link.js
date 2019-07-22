import React from 'react';

export default function NavigationLink({ linkClass, onClick, linkText }) {
    return <div className={linkClass} onClick={onClick}>{linkText}</div>
}
