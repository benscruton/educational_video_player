const CommentForm = ({
  errors,
  content,
  handleChange,
  handleSubmit
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
          <textarea
            className = "textarea"
            onChange = {handleChange}
          >
            {content}
          </textarea>
        </div>

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