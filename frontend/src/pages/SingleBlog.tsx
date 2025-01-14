import { SingleBlogCard } from "../components/SingleBlogCard";
import { useBlog } from "../hooks";
import { useParams } from "react-router-dom";

export const SingleBlog = () => {
  const { id } = useParams<{id:string}>();
  const { loading, blog } = useBlog({
    id: id || "",
  });

  if (loading) {
    return <>loading</>;
  }

  if(!blog){
    return <div>Blog not found</div>
  }

  return (
    <div>
      <SingleBlogCard blog={blog} />
    </div>
  );
};
