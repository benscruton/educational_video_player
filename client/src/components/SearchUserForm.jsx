const SearchUserForm = ({
  title,
  label,
  submit,
  autoFocus,
  input,
  setInput,
  handleSubmit,
  cancelButton
}) => {
  const handleChange = e => {
    setInput(e.target.value);
  };

  return (
    <form
      className = "card"
      onSubmit = {handleSubmit}
    >
      <div className = "card-header has-background-link">
        <h2 className = "card-header-title is-centered has-text-white">
          {title}
        </h2>
      </div>

      <div className = "card-content has-background-light">
        <div className = "field">
          <label
            className = "label"
            htmlFor = "userId"
          >
            {label}
          </label>
          <div className = "control">
            <input
              className = "input"
              type = "text"
              id = "userId"
              name = "userId"
              value = {input}
              autoFocus = {autoFocus}
              onChange = {handleChange}
            />
          </div>
        </div>

        <button
          className = "button is-success has-text-white"
          type = "submit"
        >
          {submit}
        </button>
        {cancelButton}
      </div>
    </form>
  );
};

export default SearchUserForm;