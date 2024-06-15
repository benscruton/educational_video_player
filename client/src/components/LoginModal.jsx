import { useState } from "react";
import { SearchUserForm } from "../components";

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
          submit = "Log in"
          input = {loginInput}
          setInput = {setLoginInput}
          handleSubmit = {handleLoginSubmit}
          cancelButton = {(
            <a
              className = "button is-danger ml-2"
              onClick = {() => setShowLoginModal(false)}
            >
              Cancel
            </a>
          )}
        />
      </div>
    </div>
  );
};

export default LoginModal;