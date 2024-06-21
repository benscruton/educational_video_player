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
      ...inputs,
      userId: userId
    })
      .then(result => {
        if(!result.success){
          return setInputErrors(result.errors);
        }
        navigate(`/videos/${userId}/${result.video.id}`);
      })
      .catch(e => console.log("whoops", e));
  };

  return (
    <div className = "container px-1">
      <VideoForm
        inputs = {inputs}
        setInputs = {setInputs}
        errors = {inputErrors}
        setErrors = {setInputErrors}
        handleSubmit = {handleSubmit}
        isDisabled = {!userId}
      />
    </div>
  );
};

export default AddVideo;