import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  SearchUserForm,
  UserVideos
} from "../components";
import ReactPlayer from "react-player";

const UserPage = () => {
  const navigate = useNavigate();
  const {userId} = useParams();
  const [searchInput, setSearchInput] = useState("");

  const handleSearchSubmit = e => {
    e.preventDefault();
    setSearchInput("");
    navigate(`/users/${searchInput}`);
  };

  return (
    <div className = "container">
      <SearchUserForm
        title = "Search for a user's videos"
        label = "User ID"
        submit = "Search"
        input = {searchInput}
        setInput = {setSearchInput}
        handleSubmit = {handleSearchSubmit}
      />

      {userId ?
        <UserVideos userId = {userId}/>
        :
        <></>
      }
    </div>
  );
};

export default UserPage;