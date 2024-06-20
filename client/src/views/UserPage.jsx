import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  SearchUserForm,
  TextIcon,
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
        <UserVideos profileUserId = {profileUserId}/>
        :
        <></>
      }

      <SearchUserForm
        title = "Search for a user's videos"
        label = "User ID"
        submit = {<TextIcon text = "Search" icon = "bi-search" />}
        input = {searchInput}
        setInput = {setSearchInput}
        handleSubmit = {handleSearchSubmit}
      />
    </div>
  );
};

export default UserPage;