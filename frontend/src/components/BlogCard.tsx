import { Link } from "react-router-dom";
import Avatar from "./userAvatar";

interface BlogsCardProps {
  authorName: string;
  content: string;
  title: string;
  publishDate: string;
  id: string;
  published?: boolean;
  myBlogs?: boolean;
  titleImage?: string;
}
const BlogCard = ({
  authorName,
  title,
  content,
  publishDate,
  id,
  titleImage,
}: // published,
BlogsCardProps) => {
  const countMinutes = (content: string) => {
    const minutes = Math.ceil(content.length / 500); // Assuming 500 words per minute read speed
    if (minutes >= 60) {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      return `${hours} hr${hours > 1 ? "s" : ""}${
        remainingMinutes > 0 ? ` ${remainingMinutes} min` : ""
      } read`;
    }
    return `${minutes} min read`;
  };
  return (
    <Link to={`/blog/${id}`}>
      <div className=" bg-orange-50 flex items-center justify-between px-5 py-7 mb-2 border-b-2 cursor-pointer hover:shadow-2xl rounded-md transition-all duration-300 ease-in-out">
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
          />
          <div className="text-gray-400 text-sm pt-3">
            {countMinutes(content)}
          </div>
        </div>
        <div
          className="w-32 h-32 bg-cover bg-center rounded-md"
          style={{
            backgroundImage: titleImage ? `url(${titleImage})` : "none",
            backgroundColor: !titleImage ? "#f3f4f6" : "transparent",
          }}
        />
      </div>
    </Link>
  );
};

export default BlogCard;
