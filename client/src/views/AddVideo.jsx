import { useContext, useState } from "react";

import { VideoForm } from "../components";
import { createVideo } from "../utils/api";
import { AppContext } from "../context";
import { useNavigate } from "react-router-dom";

const AddVideo = () => {
  const {userId} = useContext(AppContext);
  const navigate = useNavigate();
  const emptyFields = {
    title: "",
    videoUrl: "",
    description: ""
  };

  const [inputs, setInputs] = useState(emptyFields);
  const [inputErrors, setInputErrors] = useState(emptyFields);

  const handleSubmit = e => {
    e.preventDefault();

    createVideo({
      user_id: userId,
      title: inputs.title,
      video_url: inputs.videoUrl,
      description: inputs.description
    })
      .then(result => {
        if(!result.success){
          return setInputErrors(result.errors);
        }
        navigate(`/videos/${result.video.id}`);
      })
      .catch(e => console.log("whoops", e));
  };

  return (
    <div className = "container">
      <VideoForm
        inputs = {inputs}
        setInputs = {setInputs}
        errors = {inputErrors}
        setErrors = {setInputErrors}
        handleSubmit = {handleSubmit}
      />
    </div>
  );
};

export default AddVideo;