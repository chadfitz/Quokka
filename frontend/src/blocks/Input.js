import React from 'react';

const Input = ({label, containername, className, ...props}) => {
  containername ||= "input";
  className ||= "input-label";

  return (
    <div className={containername}>
      <h6 className={className}>
        {label}
      </h6>
      <br/>
      <input {...props} />
    </div>
  );
}

export default Input;
