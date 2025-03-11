import axios from "axios";
import { useAuth } from "../../context";
import type { Blog } from "../../hooks/useBlogs";
// import Avatar from "./userAvatar";
import { BACKEND_URL } from "../../config";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

// export const BlogPage = ({ blog }: { blog: Blog }) => {
//   const { user, jwt } = useAuth();
//   const navigate = useNavigate();

//   const deleteBlog = async () => {
//     try {
//       const response = await axios.delete(`${BACKEND_URL}/blog/${blog.id}`, {
//         headers: {
//           Authorization: `Bearer ${jwt}`,
//         },
//       });
//       if (response) {
//         toast.success("Blog deleted successfully");
//         navigate("/profile");
//       }
//     } catch (error) {
//       toast.error("Unable to delete blog");
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto px-2 py-2 sm:py-8">
//       <div className="relative mb-8 sm:mb-12">
//         <div className="w-full h-48 sm:h-64 overflow-hidden rounded-lg shadow-lg">
//           <img
//             src={blog.titleImage || "/placeholder.svg?height=256&width=768"}
//             alt={blog.title}
//             className="w-full h-full object-cover"
//           />
//         </div>
//         <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white via-white to-transparent pt-12 sm:pt-16 pb-4 sm:pb-8 px-4 sm:px-6">
//           <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-serif leading-tight text-gray-900">
//             {blog.title}
//           </h1>
//           <div className="text-xs sm:text-sm text-gray-500 mt-2">
//             Posted on 25 August 2025
//           </div>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
//         <div className="md:col-span-3">
//           <div
//             className="text-base sm:text-lg tracking-wide leading-7 sm:leading-9 text-gray-800 tiptap"
//             dangerouslySetInnerHTML={{ __html: blog.content }}
//           ></div>
//         </div>

//         <div className="md:col-span-1">
//           <div className="shadow-sm rounded-lg p-4 sm:p-6 sticky top-8">
//             <h2 className=" text-center text-lg sm:text-xl font-semibold mb-4">
//               About Author
//             </h2>
//             <div className="flex items-center mb-4">
//               <div className="mr-3 sm:mr-4">
//                 <Avatar name={blog.author.name} />
//               </div>
//               <div>
//                 <div className="text-base sm:text-lg font-bold">
//                   {blog.author.name}
//                 </div>
//                 <div className="text-xs sm:text-sm text-gray-600">
//                   Passionate writer and storyteller
//                 </div>
//               </div>
//             </div>
//             {user?.id === blog.author.id && (
//               <div className="flex flex-col space-y-2 mt-4 sm:mt-6">
//                 <button
//                   onClick={() => navigate(`/update/${blog.id}`)}
//                   className="w-full rounded-md text-black bg-orange-200 hover:bg-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 font-medium text-xs sm:text-sm px-3 sm:px-5 py-2 sm:py-2.5 transition duration-150 ease-in-out"
//                 >
//                   Update Blog
//                 </button>
//                 <button
//                   onClick={deleteBlog}
//                   className="w-full rounded-md text-red-600 bg-orange-200 hover:bg-orange-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 font-medium text-xs sm:text-sm px-3 sm:px-5 py-2 sm:py-2.5 transition duration-150 ease-in-out"
//                 >
//                   Delete Blog
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

import { User, Calendar, Clock, Edit, Trash } from "lucide-react";
export const BlogPage = ({ blog }: { blog: Blog }) => {
  const { user, jwt } = useAuth();
  const navigate = useNavigate();

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

  const deleteBlog = async () => {
    try {
      const response = await axios.delete(`${BACKEND_URL}/blog/${blog.id}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      if (response) {
        toast.success("Blog deleted successfully");
        navigate("/profile");
      }
    } catch (error) {
      toast.error("Unable to delete blog");
    }
  };

  return (
    <div className="min-h-screen bg-vintage-paper dark:bg-darkVintage-paper pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Hero section */}
        <div className="relative mb-12">
          <div className="w-full h-64 md:h-80 overflow-hidden rounded-lg shadow-md">
            <img
              src={blog.titleImage || "/placeholder.svg?height=256&width=768"}
              alt={blog.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-vintage-ink/40 dark:from-darkVintage-brown/60 to-transparent"></div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 transform translate-y-1/2 px-6">
            <div className="bg-vintage-cream dark:bg-darkVintage-brown bg-opacity-90 dark:bg-opacity-80 p-6 rounded-lg shadow-md border border-vintage-brown/20 dark:border-darkVintage-gold/20 backdrop-blur-sm">
              <h1 className="text-3xl md:text-4xl font-playfair font-bold text-vintage-sepia dark:text-darkVintage-gold">
                {blog.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 mt-4 text-sm font-lora">
                <div className="flex items-center text-vintage-accent dark:text-darkVintage-accent">
                  <User className="w-4 h-4 mr-1" />
                  <span>{blog.author.name}</span>
                </div>
                <div className="flex items-center text-vintage-brown/70 dark:text-darkVintage-gold/70">
                  <Calendar className="w-4 h-4 mr-1" />
                  <span>Posted on 25 August 2025</span>
                </div>
                <div className="flex items-center text-vintage-brown/70 dark:text-darkVintage-gold/70">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>{countMinutes(blog.content)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content section */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-3">
            <div className="scroll-container">
              <div className=" bg-vintage-parchment dark:bg-darkVintage-parchment rounded-lg p-8">
                <div className="scroll-content">
                  <div
                    className="font-cormorant text-lg text-start text-vintage-ink dark:text-darkVintage-ink leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: blog.content }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-1">
            <div className="sticky top-24 bg-vintage-cream dark:bg-darkVintage-brown bg-opacity-70 dark:bg-opacity-30 rounded-lg p-6 border border-vintage-brown/10 dark:border-darkVintage-gold/10">
              <h2 className="text-center text-xl font-playfair font-semibold text-vintage-sepia dark:text-darkVintage-gold mb-4">
                About the Author
              </h2>

              <div className="flex flex-col items-center mb-6">
                <div className="w-16 h-16 rounded-full flex items-center justify-center bg-vintage-accent dark:bg-darkVintage-accent text-white text-xl font-semibold mb-3">
                  {blog.author.name.charAt(0).toUpperCase()}
                </div>
                <div className="text-center">
                  <div className="text-lg font-medium font-lora text-vintage-ink dark:text-darkVintage-ink">
                    {blog.author.name}
                  </div>
                  <div className="text-sm text-vintage-brown/70 dark:text-darkVintage-gold/70 font-cormorant">
                    Passionate writer and storyteller
                  </div>
                </div>
              </div>

              {user?.id === blog.author.id && (
                <div className="flex flex-col space-y-3 mt-6 border-t border-vintage-brown/10 dark:border-darkVintage-gold/10 pt-4">
                  <button
                    onClick={() => navigate(`/update/${blog.id}`)}
                    className="w-full rounded-md flex items-center justify-center gap-2 bg-vintage-brown dark:bg-darkVintage-gold text-white dark:text-darkVintage-parchment py-2 hover:bg-vintage-accent dark:hover:bg-darkVintage-accent transition-colors font-medium text-sm"
                  >
                    <Edit className="w-4 h-4" />
                    <span>Update Blog</span>
                  </button>
                  <button
                    onClick={deleteBlog}
                    className="w-full rounded-md flex items-center justify-center gap-2 bg-vintage-brown/20 dark:bg-darkVintage-brown/40 text-vintage-accent dark:text-darkVintage-accent py-2 hover:bg-vintage-accent/20 dark:hover:bg-darkVintage-accent/30 transition-colors font-medium text-sm"
                  >
                    <Trash className="w-4 h-4" />
                    <span>Delete Blog</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
