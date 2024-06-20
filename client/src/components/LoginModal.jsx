import { useState } from "react";
import { SearchUserForm, TextIcon } from "../components";

const LoginModal = ({
  setShowLoginModal,
  setUserId
}) => {
  const [loginInput, setLoginInput] = useState("");

  const handleLoginSubmit = e => {
    e.preventDefault();

    localStorage.setItem("evp_user_id", loginInput);
    setUserId(loginInput);
    setShowLoginModal(false);
  };

  return (
    <div className = "modal is-active">
      <div
        className = "modal-background"
        onClick = {() => setShowLoginModal(false)}
      >
      </div>
      <div className = "modal-content">
        <SearchUserForm
          title = "Log in"
          label = "Your username"
          submit = {<TextIcon text = "Log in" icon = "bi-box-arrow-in-right"/>}
          autoFocus = {true}
          input = {loginInput}
          setInput = {setLoginInput}
          handleSubmit = {handleLoginSubmit}
          cancelButton = {(
            <div
              className = "button is-danger has-text-white ml-2"
              onClick = {() => setShowLoginModal(false)}
            >
              <TextIcon
                text = "Cancel"
                icon = "bi-x-octagon-fill"
              />
            </div>
          )}
        />
      </div>
    </div>
  );
};

export default LoginModal;