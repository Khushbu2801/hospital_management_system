import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLoggedOut } from "../context/LoginContext";
import "../assets/css/dashboard.css";
import logo from "../assets/imgs/user-icon.png";
const UserNavbar = () => {
  const { isLoggedIn } = useSelector((state) => state.login);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand nav-head" to="/">
          HMS
        </Link>

        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <Link className="nav-link" to="/">
              
            </Link>
            {isLoggedIn && (
              <Link
                to=""
                className="nav-link"
                onClick={() => {
                  localStorage.removeItem("jwt");
                  dispatch(userLoggedOut());
                  navigate("/", { replace: true });
                }}
              >
                Logout
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default UserNavbar;