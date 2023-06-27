import { useRouter } from "next/router";
import styles from "./signup.module.css";
import { useState } from "react";
import { setUsername } from "@/redux/slices/username.slice";
import { useDispatch } from "react-redux";

export default function SignUp() {
  const router = useRouter();
  const dispach = useDispatch();
  const [newUsername, setNewUsername] = useState("");

  function handleUsernameChange(event) {
    setNewUsername(event.target.value?.trim());
  }

  async function handleSubmit(event) {
    event.preventDefault();
    dispach(setUsername(newUsername));
    localStorage.setItem("username", newUsername);
  }

  return (
    <div className={styles.main}>
      <div className={styles.central_container}>
        <h3 className={styles.welcome_text}>Welcome to CodeLeap network!</h3>
        <form className="flex_form" onSubmit={handleSubmit}>
          <label htmlFor="username">Please enter your username</label>
          <input
            id="username"
            type="text"
            placeholder="Username"
            onChange={handleUsernameChange}
          />
          <button type="submit" disabled={newUsername == ""}>
            ENTER
          </button>
        </form>
      </div>
    </div>
  );
}
