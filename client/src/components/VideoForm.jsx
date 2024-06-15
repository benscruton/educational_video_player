const VideoForm = ({inputs, setInputs, handleSubmit}) => {
  const handleChange = e => {
    setInputs({...inputs,
      [e.target.name]: e.target.value
    });
  };
  
  return (
    <form
      className = "card"
      onSubmit = {handleSubmit}
    >
      <div className = "card-header has-text-centered has-background-info">
        <h2 className = "card-header-title is-centered">
          Add a new video
        </h2>
      </div>

      <div className = "card-content has-background-light">

        <div className = "field">
          <label
            className = "label"
            htmlFor = "title"
          >
              Title
          </label>
          <input
            className = "input"
            type = "text"
            id = "title"
            name = "title"
            value = {inputs.title}
            onChange = {handleChange}
          />
        </div>

        <div className = "field">
          <label
            className = "label"
            htmlFor = "videoUrl"
          >
              Video URL
          </label>
          <input
            className = "input"
            type = "text"
            id = "videoUrl"
            name = "videoUrl"
            value = {inputs.videoUrl}
            onChange = {handleChange}
          />
        </div>

        <div className = "field">
          <label
            className = "label"
            htmlFor = "description"
          >
              Description
          </label>
          <input
            className = "input"
            type = "text"
            id = "description"
            name = "description"
            value = {inputs.description}
            onChange = {handleChange}
          />
        </div>
        
        <button
          className = "button is-success"
          type = "submit"
        >
          Add Video
        </button>

      </div>
    </form>
  );
};

export default VideoForm;