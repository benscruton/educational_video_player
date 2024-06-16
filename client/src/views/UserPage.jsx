import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  SearchUserForm,
  UserVideos
} from "../components";

const UserPage = () => {
  const navigate = useNavigate();
  const {profileUserId} = useParams();
  const [searchInput, setSearchInput] = useState("");

  const handleSearchSubmit = e => {
    e.preventDefault();
    setSearchInput("");
    navigate(`/users/${searchInput}`);
  };

  return (
    <div className = "container">
      {profileUserId ?
        <UserVideos userId = {profileUserId}/>
        :
        <></>
      }

      <SearchUserForm
        title = "Search for a user's videos"
        label = "User ID"
        submit = "Search"
        input = {searchInput}
        setInput = {setSearchInput}
        handleSubmit = {handleSearchSubmit}
      />
    </div>
  );
};

export default UserPage;