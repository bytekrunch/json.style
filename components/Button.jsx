import React from "react";
import { motion } from "framer-motion";
import classnames from "classnames";

const Button = ({
  className = "",
  style = "secondary",
  size = "medium",
  onClick = () => {},
  disabled = false,
  label = "",
  href = "",
  to = "",
  type = "button",
  icon = null,
  iconSize = 16,
  ...otherProps
}) => {
  let Parent, elementSpecificProps;
  if (to) {
    Parent = Link;
    elementSpecificProps = { to };
  } else if (href) {
    Parent = motion.a;
    elementSpecificProps = { href };
  } else {
    Parent = motion.button;
    elementSpecificProps = {
      type,
    };
  }

  const handleClick = () => {
    if (!disabled) onClick();
  };

  const Icon = icon || React.Fragment;

  return (
    <Parent
      onClick={handleClick}
      disabled={disabled}
      className={classnames("button", [className], {
        "button--style-primary": style === "primary",
        "button--style-secondary": style === "secondary",
        "button--style-text": style === "text",
        "button--size-small": size === "small",
        "button--size-medium": size === "medium",
        "button--size-large": size === "large",
        disabled: disabled,
      })}
      {...otherProps}
      {...elementSpecificProps}
    >
      {label && <span>{label}</span>}
      {icon && <Icon size={iconSize} className="cs-ui-btn__icon" />}
    </Parent>
  );
};

export default Button;
