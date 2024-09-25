import { Link } from "react-router-dom";
import Avatar from "./Avatar";

interface BlogsCardProps {
  authorName: string;
  content: string;
  title: string;
  publishDate: string;
  id: string;
}
const BlogCard = ({
  authorName,
  title,
  content,
  publishDate,
  id,
}: BlogsCardProps) => {
  return (
    <Link to={`/blog/${id}`}>
      <div className=" bg-orange-50 flex items-center justify-evenly px-5 py-7  border-b-2 cursor-pointer">
        <div className="flex flex-col justify-start pr-2">
          <div className="flex items-center gap-2">
            <Avatar name={authorName} />
            <div className="font-medium text-sm">
              {authorName} -
              <span className="font-medium text-sm text-gray-500">
                {publishDate}
              </span>
            </div>
          </div>
          <div className="text-2xl font-semibold py-2">{title}</div>
          <div
            className="font-serif text-gray-600"
            dangerouslySetInnerHTML={{
              __html: content.length >= 100 && content.slice(0, 100) + "...",
            }}
          ></div>
          <div className="text-gray-400 text-sm pt-3">{`${Math.floor(
            content.length / 100
          )} min read`}</div>
        </div>
        <div className="banner">Banner IMage</div>
      </div>
    </Link>
  );
};

export default BlogCard;
