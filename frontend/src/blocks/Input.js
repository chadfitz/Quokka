import React from 'react';

const Input = ({label, containername, className, ...props}) => {
  containername ||= "input";
  className ||= "input-label";

  return (
    <div className={containername}>
      <h4 className={className}>
        {label}
      </h4>
      <br/>
      <input {...props} />
    </div>
  );
}

export default Input;