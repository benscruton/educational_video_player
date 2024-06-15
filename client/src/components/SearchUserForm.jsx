const SearchUserForm = ({
  title,
  label,
  submit,
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
      <div className = "card-header has-text-centered has-background-info">
        <h2 className = "card-header-title is-centered">
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
          <input
            className = "input"
            type = "text"
            id = "userId"
            name = "userId"
            value = {input}
            onChange = {handleChange}
          />
        </div>

        <button
          className = "button is-success"
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