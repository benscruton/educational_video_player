import styles from "../static/css/VideoPlayer.module.css";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  VideoComments,
  VideoPlayerContainer,
  TextIcon
} from "../components";
import { editVideo, getSingleVideo } from "../utils/api";
import { AppContext } from "../context";

const VideoPage = () => {
  const {videoId, videoUserId} = useParams();
  const {userId, serverUrl} = useContext(AppContext);
  const [video, setVideo] = useState(null);
  const [inputs, setInputs] = useState(null);
  const [inputErrors, setInputErrors] = useState({title: "", description: ""});
  const [isEditing, setIsEditing] = useState(false);


  useEffect(() => {
    getSingleVideo(videoId, serverUrl)
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
    editVideo(
      {
        ...inputs,
        id: videoId
      },
      serverUrl
    )
      .then(result => {
        if(result.success){
          setVideo({
            ...video,
            title: result.video.title,
            description: result.video.description 
          });
          setIsEditing(false);
        }
        else{
          setInputErrors({
            title: result.error,
            description: ""
          });
        }
      })
      .catch(e => {
        console.log(e);
        setInputErrors({title: "Sorry, something went wrong."});
      });
  };

  const cancelEditing = () => {
    setIsEditing(false);
    setInputs({
      title: video.title,
      description: video.description
    });
  };

  return (
    <div className = "container px-1">
  
      {!video ?
        <h2 className = "has-text-centered is-size-2">
          Loading...
        </h2>
        :
        <form
          className = "box has-background-light"
          onSubmit = {handleSubmit}
        >
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

          <VideoPlayerContainer
            url={video.videoUrl}
          />

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
              <div className = "has-text-centered mt-5">
                <button
                  className = "button is-success has-text-white mx-3"
                  type = "submit"
                >
                  <TextIcon
                    text = "Save"
                    icon = "bi-floppy-fill"
                  />
                </button>

                <button
                  className = "button is-danger has-text-white mx-3"
                  type = "button"
                  onClick = {cancelEditing}
                >
                  <TextIcon
                    text = "Cancel"
                    icon = "bi-x-octagon-fill"
                  />
                </button>
              </div>
              :
              <div className = "has-text-centered mt-5">
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
        </form>
      }

      <p>
        <Link to = {`/users/${videoUserId}`}>
          <TextIcon
            icon = "bi-arrow-left"
            text = {<>Back to all of <span className = "has-text-weight-bold">{videoUserId}</span>'s videos</>}
          />
        </Link>
      </p>
      
      <hr />

      <VideoComments
        videoId = {videoId}
      />
    </div>
  );
};

export default VideoPage;