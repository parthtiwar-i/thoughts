// import { Link } from "react-router-dom";
// import Avatar from "./userAvatar";

// interface BlogsCardProps {
//   authorName: string;
//   content: string;
//   title: string;
//   publishDate: string;
//   id: string;
//   published?: boolean;
//   myBlogs?: boolean;
//   titleImage?: string;
// }
// const BlogCard = ({
//   authorName,
//   title,
//   content,
//   publishDate,
//   id,
//   titleImage,
// }: // published,
// BlogsCardProps) => {
//   const countMinutes = (content: string) => {
//     const minutes = Math.ceil(content.length / 500); // Assuming 500 words per minute read speed
//     if (minutes >= 60) {
//       const hours = Math.floor(minutes / 60);
//       const remainingMinutes = minutes % 60;
//       return `${hours} hr${hours > 1 ? "s" : ""}${
//         remainingMinutes > 0 ? ` ${remainingMinutes} min` : ""
//       } read`;
//     }
//     return `${minutes} min read`;
//   };
//   return (
//     <Link to={`/blog/${id}`}>
//       <div className=" bg-orange-50 flex items-center justify-between px-5 py-7 mb-2 border-b-2 cursor-pointer hover:shadow-2xl rounded-md transition-all duration-300 ease-in-out">
//         <div className="flex flex-col justify-start pr-2">
//           <div className="flex items-center gap-2">
//             <Avatar name={authorName} />
//             <div className="font-medium text-sm">
//               {authorName} -
//               <span className="font-medium text-sm text-gray-500">
//                 {publishDate}
//               </span>
//             </div>
//           </div>
//           <div className="text-2xl font-semibold py-2">{title}</div>
//           <div
//             className="font-serif text-gray-600"
//             dangerouslySetInnerHTML={{
//               __html: content.length >= 100 && content.slice(0, 100) + "...",
//             }}
//           />
//           <div className="text-gray-400 text-sm pt-3">
//             {countMinutes(content)}
//           </div>
//         </div>
//         <div
//           className="w-32 h-32 bg-cover bg-center rounded-md"
//           style={{
//             backgroundImage: titleImage ? `url(${titleImage})` : "none",
//             backgroundColor: !titleImage ? "#f3f4f6" : "transparent",
//           }}
//         />
//       </div>
//     </Link>
//   );
// };

// export default BlogCard;

import { Link } from "react-router-dom";
import { ScrollText, Clock, User } from "lucide-react";

interface BlogCardProps {
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
}: BlogCardProps) => {
  const countMinutes = (content: string) => {
    const minutes = Math.ceil(content.length / 500);
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
    <Link to={`/blog/${id}`} className="block">
      <div className="scroll-container relative z-10">
        <div className=" bg-vintage-parchment dark:bg-darkVintage-parchment rounded-lg p-6 shadow-md border border-vintage-brown/20 dark:border-darkVintage-gold/20 transition-all duration-300 ease-in-out hover:shadow-lg">
          <div className="scroll-content grid grid-cols-1 md:grid-cols-3 gap-6">
            {titleImage && (
              <div className="md:col-span-1">
                <div className="relative h-48 md:h-full overflow-hidden rounded border-2 border-vintage-brown/20 dark:border-darkVintage-gold/20">
                  <img
                    src={titleImage}
                    alt={title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-vintage-ink/20 to-transparent"></div>
                </div>
              </div>
            )}

            <div
              className={`${
                titleImage ? "md:col-span-2" : "md:col-span-3"
              } flex flex-col justify-between`}
            >
              <div>
                <div className="flex items-center gap-2 mb-3 text-vintage-accent dark:text-darkVintage-accent">
                  <User className="w-4 h-4" />
                  <span className="font-lora text-sm">{authorName}</span>
                  <span className="text-vintage-brown/60 dark:text-darkVintage-gold/60">
                    •
                  </span>
                  <span className="font-lora text-sm text-vintage-brown/60 dark:text-darkVintage-gold/60">
                    {publishDate}
                  </span>
                </div>

                <h3 className="text-xl md:text-2xl font-playfair font-semibold text-vintage-sepia dark:text-darkVintage-gold mb-3">
                  {title}
                </h3>

                <div
                  className="font-cormorant text-vintage-ink/90 dark:text-darkVintage-ink/90"
                  dangerouslySetInnerHTML={{
                    __html:
                      content.length >= 150
                        ? content.slice(0, 150) + "..."
                        : content,
                  }}
                />
              </div>

              <div className="flex justify-between items-center mt-4 pt-3 border-t border-vintage-brown/10 dark:border-darkVintage-gold/10">
                <div className="flex items-center text-vintage-brown/70 dark:text-darkVintage-gold/70 text-sm">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>{countMinutes(content)}</span>
                </div>

                <div className="text-vintage-accent dark:text-darkVintage-accent flex items-center gap-1 text-sm font-medium">
                  <span>Read more</span>
                  <ScrollText className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
