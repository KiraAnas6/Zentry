import React from "react";

function Button({ leftIcon, id ,  rightIcon, title, containerClass }) {
  return (
    <button
    id={id}
      className={`group relative rounded-full w-fit overflow-hidden py-3 px-7 ${containerClass}`}
    >
      {leftIcon}
      <span className="relative incline-flex overflow-hidden font-general text-xs uppercase">
        <div>{title}</div>
      </span>
      {rightIcon}
    </button>
  );
}

export default Button;
