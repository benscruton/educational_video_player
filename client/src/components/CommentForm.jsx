const CommentForm = ({
  error,
  content,
  handleChange,
  handleSubmit,
  isDisabled
}) => {
  return (
    <form
      className = "card"
      onSubmit = {handleSubmit}
    >
      <header className = "card-header">
        <p className = "card-header-title">
          Add a comment
        </p>
      </header>

      <div className = "card-content">
        <div className = "content">
          {isDisabled ?
            <p className = "has-text-danger has-text-centered">
              Log in to leave a comment!
            </p>
            :
            <></>
          }
          <textarea
            className = "textarea"
            onChange = {handleChange}
            value = {content}
            disabled = {isDisabled}
          />
        </div>
        <p className = "help is-danger">
          {error}
        </p>

        <button
          className = "button is-success"
          type = "submit"
        >
          Post
        </button>
      </div>
    </form>
  );
};

export default CommentForm;