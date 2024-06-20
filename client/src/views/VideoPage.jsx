import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  VideoComments,
  VideoPlayer,
  TextIcon
} from "../components";
import { editVideo, getSingleVideo } from "../utils/api";
import { AppContext } from "../context";

const VideoPage = () => {
  const {videoId} = useParams();
  const {userId} = useContext(AppContext);
  const [video, setVideo] = useState(null);
  const [inputs, setInputs] = useState(null);
  const [inputErrors, setInputErrors] = useState({title: "", description: ""});
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    getSingleVideo(videoId)
      .then(video => {
        setVideo(video);
        setInputs({
          title: video.title,
          description: video.description
        })
      })
      .catch(e => console.log(e));
  }, [videoId]);

  const handleChange = e => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value
    });
    setInputErrors({
      ...inputErrors,
      [e.target.name]: ""
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if(inputs.title === video.title && inputs.description === video.description){
      return setIsEditing(false);
    }
    editVideo({
      ...inputs,
      id: videoId
    })
      .then(result => {
        if(result.success){
          setVideo(result.video);
          setIsEditing(false);
        }
        else{
          setInputErrors();
        }
      })
      .catch(e => {
        console.log(e);
        setInputErrors({title: "Sorry, something went wrong."});
      });
  };

  return (
    <div className = "container">
      <form onSubmit = {handleSubmit}>
        {video ?
          <>
            <div className = "box has-background-light">
              {isEditing ?
                <div className = "field">
                  <div className = "control">
                    <input
                      className = "input has-text-centered is-large"
                      type = "text"
                      id = "title"
                      name = "title"
                      value = {inputs.title}
                      onChange = {handleChange}
                    />
                  </div>
                  <p className = "help is-danger has-text-centered">
                    {inputErrors.title}
                  </p>
                </div>
                :
                <h2 className = "has-text-centered is-size-2 mb-3">
                  {video ? video.title : "Loading..."}
                </h2>
              }

              <VideoPlayer url={video.videoUrl}/>

              <div className = "has-text-right">
              <a
                href = {video.videoUrl}
                target = "_blank"
                rel = "noopener noreferrer"
                className = "has-text-centered mt-2"
              >
                Open video source
              </a>
              </div>

              <h3 className = "is-size-4 has-text-centered mt-6">
                Description
              </h3>

              {isEditing ?
                <textarea
                  className = "textarea"
                  id = "description"
                  name = "description"
                  value = {inputs.description}
                  onChange = {handleChange}
                />
                :
                <p className = {video.description ? "" : "is-italic"}>
                  {video.description || "(no description included)"}
                </p>
              }

              {video.userId === userId ?
                isEditing ?
                  <div className = "has-text-centered">
                    <button
                      className = "button is-success has-text-white"
                      type = "submit"
                    >
                      <TextIcon
                        text = "Save"
                        icon = "bi-floppy-fill"
                      />
                    </button>
                  </div>
                  :
                  <div className = "has-text-centered">
                    <div
                      className = "button is-warning"
                      type = "button"
                      onClick = {() => setIsEditing(true)}
                    >
                      <TextIcon
                        text = "Edit Video"
                        icon = "bi-pencil-fill"
                      />
                    </div>
                  </div>
                  :
                  <></>
              }
            </div>

            <p>
              <Link to = {`/users/${video.userId}`}>
                <TextIcon
                  icon = "bi-arrow-left"
                  text = {<>Back to all of <span className = "has-text-weight-bold">{video.userId}</span>'s videos</>}
                />
              </Link>
            </p>
          
            <VideoComments
              videoId = {videoId}
            />
          </>
          :
          <h2 className = "has-text-centered is-size-2">
            Loading...
          </h2>
        }
      </form>
    </div>
  );
};

export default VideoPage;