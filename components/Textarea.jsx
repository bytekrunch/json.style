import classnames from "classnames";

const Textarea = ({
  placeholder = "",
  className = "",
  rows = 3,
  label = "",
  disabled = false,
  ...otherProps
}) => {
  return (
    <div className={classnames(["textarea__wrapper", className])}>
      {label && <label className="textarea-label">{label}</label>}
      <div
        className={classnames("textarea-input", {
          "textarea-disabled": disabled,
        })}
      >
        <textarea
          placeholder={placeholder}
          rows={rows}
          disabled={disabled}
          {...otherProps}
        />
      </div>
    </div>
  );
};

export default Textarea;
