import { Appbar } from "./Appbar";
import { Blog } from "../hooks";
import { Avatar } from "./BlogCard";

export const SingleBlogCard = ({ blog }: { blog: Blog }) => {
  return (
    <div>
      <Appbar />
      <div className="flex justify-center">
        <div className="grid grid-cols-12 px-10 w-full pt-200 max-w-screen-2xl pt-12">
          <div className=" col-span-8 ">
            <div className="text-3xl font-extrabold">Hey{blog.title}</div>
            <div className="text-slate-500 pt-2">Posted on 2 August 2024</div>
            <div className="col-span-4">{blog.content}</div>
            </div>
            <div className="col-span-4">
              Author
              <div className="flex w-full">
                <div className="pr-5 flex flex-col justify-center">
              <Avatar size="big" name={blog.author.name||"Anonymous"} />
              </div> 
              </div>
              <div className="text-xl font-bold">
                {blog.author.name || "Anonymous"}
              </div>
              <div className="pt-2 text-slate-500">
              Random catch phrase about the author's ability to grab the user's attention</div>
            </div>
         
          
        </div>
      </div>
    </div>
  );
};

