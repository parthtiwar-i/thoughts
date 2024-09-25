import { Link } from "react-router-dom";
import Avatar from "./Avatar";

const NavBar = () => {
  return (
    <div className="flex p-5 justify-between bg-orange-200">
      <div className="flex gap-2">
        <Link
          className="cursor-pointer italic font-semibold text-lg"
          to={"/blogs"}
        >
          Thoughts
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
        <div className="cursor-pointer">
          <Avatar name="Parth Tiwari" />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
