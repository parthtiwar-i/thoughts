import { Link } from "react-router-dom";
import Avatar from "./userAvatar";
import { useAuth } from "../context";

const NavBar = () => {
  const { user } = useAuth();
  return (
    <div className="flex p-5 sticky top-0 z-10 justify-between bg-orange-200 font-mono">
      <div className="flex gap-4">
        <Link className="cursor-pointer  font-semibold text-lg" to={"/"}>
          Thoughts
        </Link>
        <Link className="cursor-pointer font-semibold text-lg" to={"/blogs"}>
          Blogs
        </Link>
      </div>
      <div className="flex gap-2">
        <Link to={"/publish"}>
          <button
            type="button"
            className="text-white bg-gradient-to-r from-orange-900 via-orange-900 to-orange-950 hover:bg-gradient-to-br focus:outline-none font-medium rounded-lg text-sm px-5 py-1.5 text-center"
          >
            Publish
          </button>
        </Link>
        {user ? (
          <Link to={"/profile"}>
            <div className="cursor-pointer">
              <Avatar name={user?.name} />
            </div>
          </Link>
        ) : (
          <Link to={"/login"}>Login</Link>
        )}
      </div>
    </div>
  );
};

export default NavBar;
