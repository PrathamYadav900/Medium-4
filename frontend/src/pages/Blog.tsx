import { Appbar } from "../components/Appbar";
import { BlogCard } from "../components/BlogCard";
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useBlogs } from "../hooks";

export const Blog = () => {
  const { loading, blogs } = useBlogs();

  if (loading) {
    return <div>
      <BlogSkeleton/>
    </div>;
  }
  return (
    <>
      <Appbar />
      <div className="flex justify-center">
        <div className="max-w-xl">
          {blogs.map((Posts) => (
            <BlogCard
              id={Posts.id}
              title={Posts.title}
              content={Posts.content}
              publishedDate={"10 august"}
              authorName={Posts.author.name || "Unknown"}
            />
          ))}
        </div>
      </div>
    </>
  );
};
