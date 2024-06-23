import TextIcon from "./TextIcon";

const VideoForm = ({
  inputs,
  setInputs,
  errors,
  setErrors,
  handleSubmit,
  isDisabled
}) => {
  const handleChange = e => {
    setInputs({...inputs,
      [e.target.name]: e.target.value
    });
    setErrors({...errors,
      [e.target.name]: ""
    });
  };
  
  return (
    <form
      className = "card"
      onSubmit = {handleSubmit}
    >
      <div className = "card-header has-text-centered has-background-link">
        <h2 className = "card-header-title is-centered has-text-white">
          Add a new video
        </h2>
      </div>

      <div className = "card-content has-background-light has-text-weight-bold">
        <p className = "has-text-danger has-text-centered">
          {isDisabled ? "Log in to add a video!" : ""}
        </p>

        <div className = "field">
          <label
          className = "label"
            htmlFor = "title"
          >
              Title
          </label>
          <div className = "control">
            <input
              className = {`input has-background-white ${errors.title ? "is-danger" : ""}`}
              type = "text"
              id = "title"
              name = "title"
              value = {inputs.title}
              onChange = {handleChange}
              disabled = {isDisabled}
              autoFocus
            />
          </div>
          <p className = "help is-danger">
            {errors.title}
          </p>
        </div>

        <div className = "field">
          <label
            className = "label"
            htmlFor = "videoUrl"
          >
              Video URL
          </label>
          <div className = "control">
            <input
              className = {`input has-background-white ${errors.videoUrl ? "is-danger" : ""}`}
              type = "text"
              id = "videoUrl"
              name = "videoUrl"
              value = {inputs.videoUrl}
              onChange = {handleChange}
              disabled = {isDisabled}
            />
          </div>
          <p className = "help is-danger">
            {errors.videoUrl}
          </p>
        </div>

        <div className = "field">
          <label
            className = "label"
            htmlFor = "description"
          >
              Description
          </label>
          <div className = "control">
            <textarea
              className = "textarea has-background-white"
              type = "text"
              id = "description"
              name = "description"
              value = {inputs.description}
              onChange = {handleChange}
              disabled = {isDisabled}
            />
          </div>
        </div>
        
        <button
          className = "button is-success has-text-white"
          type = "submit"
          disabled = {isDisabled}
        >
          <TextIcon
            text = "Add Video"
            icon = "bi-play-btn-fill"
          />
        </button>

      </div>
    </form>
  );
};

export default VideoForm;