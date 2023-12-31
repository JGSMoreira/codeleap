import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/slices/username.slice";
import styles from "./navbar.module.css";

export default function Navbar() {
  const dispach = useDispatch();

  function handleLogout() {
    dispach(logout());
    localStorage.setItem("username", "");
  }

  return (
    <div className={styles.navbar_body}>
      <span className={styles.platform_name}>CodeLeap Network</span>
      <FontAwesomeIcon
        icon={faRightFromBracket}
        onClick={handleLogout}
        title="Logout"
        className="clickable"
      />
    </div>
  );
}
