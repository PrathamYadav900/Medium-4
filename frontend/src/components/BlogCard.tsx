import { Link } from "react-router-dom";

interface BlogCardProps {
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
  id: number;
}

export const BlogCard = ({
  id,
  authorName,
  title,
  content,
  publishedDate,
}: BlogCardProps) => {
  return (
    <Link to={`/${id}`}>
      <div className="p-4 border-b border-slate-200 pb-4 w-screen max-w-screen-md cursor-pointer">
        <div className="flex flex-col">
          <div className="flex ">
            <div>
              <Avatar name={authorName} size="small" />
            </div>
            <div
              className="font-extralight pl-2 text-sm
          justify-center flex-col"
            >
              {authorName}
            </div>

            <div className="pl-2 font-thin text-slate-500 text-sm justify-center flex-col">
              {publishedDate}
            </div>
          </div>
          <div className="text-xl font-semibold">{title}</div>
          <div className="text-xl font-normal">
            {content.length > 200 ? content.slice(0, 200) + "..." : content}
          </div>
          <div className="text-slate-500 text-sm font-thin">{`${Math.ceil(content.length / 100)}minutes`}</div>
          <div className="bg-slate-200 h-1 w-full"></div>
        </div>
      </div>
    </Link>
  );
};

export const Avatar = ({
  name,
  size = "small",
}: {
  name: string;
  size: "small" | "big";
}) => {
  return (
    <>
      <div
        className={`relative inline-flex items-center justify-center

          ${size === "small" ? "w-6 h-6 " : "w-10 h-10"} overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600`}
      >
        <span
          className={`${size === "small" ? "text-xs" : "text-md"}font-medium text-gray-600 dark:text-gray-300`}
        >
          {name[0]}
        </span>
      </div>
    </>
  );
};
