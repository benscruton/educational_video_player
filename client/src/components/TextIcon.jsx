const TextIcon = ({text, icon, iconClasses}) => {
  return (
    <span className = "icon-text">
      <span className = {`icon ${iconClasses || ""}`}>
        <i className = {icon} aria-hidden />
      </span>
      <span>
        {text}
      </span>
    </span>
  );
};

export default TextIcon;