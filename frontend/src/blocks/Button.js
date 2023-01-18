import React from 'react';

// export default function Button({type, className, children, label, ...props}) {
const Button = ({children, containername, label, modal, ...props}) => {
  // defaults:
  containername ||= "btn-ctnr";
  props.className ||= "btn";
  props.type ||= "button";

  return (
    <div className={containername}>
      <button {...props}>
        {label}
        {children}
      </button>
    </div>
  );
};


export default Button;