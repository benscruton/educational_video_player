import { useContext, useState } from "react";

import { VideoForm } from "../components";
import { createVideo } from "../utils/api";
import { AppContext } from "../context";

const AddVideo = () => {
  const {userId} = useContext(AppContext);
  const emptyInputs = {
    title: "",
    videoUrl: "",
    description: ""
  };

  const [inputs, setInputs] = useState(emptyInputs);

  const handleSubmit = e => {
    e.preventDefault();

    const result = createVideo({
      user_id: userId,
      title: inputs.title,
      video_url: inputs.videoUrl,
      description: inputs.description
    });

    if(!result.success) console.log("whoops");

    console.log(result);
  };

  return (
    <div className = "container">
      <VideoForm
        inputs = {inputs}
        setInputs = {setInputs}
        handleSubmit = {handleSubmit}
      />
    </div>
  );
};

export default AddVideo;