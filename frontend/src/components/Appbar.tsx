import { Link } from "react-router-dom";
import { Avatar } from "./BlogCard";

export const Appbar = () => {
  return (
    <div className="boder-b flex justify-between px-10 ">
      <Link to={"/"}>
      <div className="flex flex-col justify-center cursor-pointer">Medium</div>
      </Link>
      <div>
        <Link to={"/publish"}>
      <button type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 mr-4 ">New</button>
      </Link>
        <Avatar name="Pratham" size={"big"} />
      </div>
    </div>
  );
};
