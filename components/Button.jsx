import { motion } from "framer-motion";
import classnames from "classnames";

const Button = ({
  className = "",
  style = "secondary",
  size = "medium",
  onClick = () => {},
  disabled = false,
  label = "Clicked",
  ...otherProps
}) => {
  const handleClick = () => {
    if (!disabled) onClick();
  };

  return (
    <motion.button
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
    >
      {label && <span>{label}</span>}
    </motion.button>
  );
};

export default Button;
