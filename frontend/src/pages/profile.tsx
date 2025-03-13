import BlogCard from "../components/ui/BlogCard";
import { useAuth } from "../context";
import { getUserBlog } from "../hooks/useBlogs";

// // interface User {
// //   name: string;
// //   avatar: string;
// //   bio: string;
// //   location: string;
// //   email: string;
// // }

// // interface Blog {
// //   id: number;
// //   title: string;
// //   excerpt: string;
// //   date: string;
// // }

// // interface UserProfileProps {
// //   user: User;
// //   blogs: Blog[];
// // }

// export default function UserProfile() {
//   const { loading, userBlogs } = getUserBlog();
//   const { logout, user } = useAuth();

//   return (
//     <div className="container mx-auto px-4 py-8 bg-orange-50">
//       <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
//         <div className="p-6">
//           <div className="flex flex-col items-center mb-6">
//             <Avatar
//               className="w-32 h-32 rounded-full mb-4 text-center bg-orange-50 flex justify-center items-center"
//               name={user?.name}
//             />
//             {/* <img
//               src={user.avatar}
//               alt={`${user.name}'s avatar`}
//               className="w-32 h-32 rounded-full mb-4"
//             /> */}
//             <h1 className="text-2xl font-bold text-gray-800">{user?.name}</h1>
//           </div>

//           <div className="mb-6">
//             <p className="text-gray-600 text-center mb-4">
//               Random catch phrase about user
//             </p>
//             <div className="flex justify-center space-x-4 text-sm text-gray-500 mb-4">
//               <span>Amsterdam EU</span>
//               <span>{user?.email}</span>
//             </div>
//             <div className="text-center">
//               <button
//                 onClick={() => logout()}
//                 type="button"
//                 className="text-black bg-orange-200 hover:bg-orange-400 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2 me-2 mb-2"
//               >
//                 Logout
//               </button>
//             </div>
//           </div>
//         </div>

//         <div className="border-t border-gray-200">
//           <div className="p-6">
//             <h2 className="text-3xl text-center font-semibold text-gray-800 mb-4">
//               My Blogs
//             </h2>
//             <div className="space-y-6">
//               {loading ? (
//                 <Loader />
//               ) : (
//                 userBlogs.map((blog) => (
//                   <BlogCard
//                     authorName={blog.author.name}
//                     title={blog.title}
//                     content={blog.content}
//                     publishDate={blog.createdAt?.slice(0, 10) || "12 Jan 2024"}
//                     id={blog.id}
//                     published={blog.published}
//                     myBlogs={true}
//                     titleImage={blog.titleImage}
//                   />
//                 ))
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, MapPin, BookOpen, LogOut } from "lucide-react";
import { toast } from "sonner";

export default function UserProfile() {
  const { logout, user } = useAuth();
  const { loading, userBlogs } = getUserBlog();
  const navigate = useNavigate();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  useEffect(() => {
    if (!loading && userBlogs.length > 0) {
      toast.success("Welcome to your ancient library");
    }
  }, [loading, userBlogs]);

  useEffect(() => {
    // Set scroll height for animation
    if (scrollContainerRef.current) {
      const scrolls = scrollContainerRef.current.querySelectorAll(".scroll");
      scrolls.forEach((scroll) => {
        const height = scroll.scrollHeight;
        (scroll as HTMLElement).style.setProperty(
          "--scroll-height",
          `${height}px`
        );
      });
    }
  }, [loading, userBlogs]);

  const handleLogout = () => {
    logout();
    toast.success("Successfully logged out");
    navigate("/");
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-vintage-paper dark:bg-darkVintage-paper relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-16">
        <div className="scroll-container">
          <div className="bg-vintage-parchment dark:bg-darkVintage-parchment rounded-lg p-6 md:p-8 shadow-md border border-vintage-brown/20 dark:border-darkVintage-gold/20">
            <div className="scroll-content">
              <div className="flex flex-col items-center">
                {/* Profile Header */}
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-vintage-accent dark:bg-darkVintage-accent text-white flex items-center justify-center text-3xl md:text-4xl font-playfair font-bold mb-4">
                  {user.name?.charAt(0).toUpperCase() || "A"}
                </div>

                <h1 className="text-2xl md:text-3xl font-playfair font-bold text-vintage-sepia dark:text-darkVintage-gold mb-2">
                  {user.name || "Anonymous Writer"}
                </h1>

                <p className="text-center font-cormorant text-lg text-vintage-ink/80 dark:text-darkVintage-ink/80 italic mb-6">
                  "Collector of tales and keeper of ancient scrolls"
                </p>

                <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-center mb-6">
                  {user.email && (
                    <div className="flex items-center gap-1.5 text-sm text-vintage-brown/70 dark:text-darkVintage-gold/70 font-lora">
                      <Mail className="w-4 h-4" />
                      <span>{user.email}</span>
                    </div>
                  )}

                  <div className="flex items-center gap-1.5 text-sm text-vintage-brown/70 dark:text-darkVintage-gold/70 font-lora">
                    <MapPin className="w-4 h-4" />
                    <span>Amsterdam, EU</span>
                  </div>
                </div>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 bg-vintage-brown dark:bg-darkVintage-gold text-white dark:text-darkVintage-parchment px-5 py-2 rounded-md hover:bg-vintage-accent dark:hover:bg-darkVintage-accent transition-colors duration-300 font-lora text-sm"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* My Blogs Section */}
        <div className="mt-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-playfair font-bold text-vintage-ink dark:text-darkVintage-ink inline-block relative">
              <span className="flex items-center gap-2 justify-center">
                <BookOpen className="w-5 h-5" />
                My Scrolls
              </span>
              <div className="mt-2 w-24 h-1 bg-vintage-accent dark:bg-darkVintage-accent mx-auto"></div>
            </h2>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-16 h-16 border-4 border-vintage-brown dark:border-darkVintage-gold rounded-full border-t-transparent animate-spin"></div>
              <p className="mt-4 font-cormorant text-vintage-ink/80 dark:text-darkVintage-ink/80">
                Searching your library...
              </p>
            </div>
          ) : (
            <div ref={scrollContainerRef} className="space-y-12">
              {userBlogs && userBlogs.length > 0 ? (
                userBlogs.map((blog) => (
                  <BlogCard
                    key={blog.id}
                    authorName={blog.author.name}
                    title={blog.title}
                    content={blog.content}
                    publishDate={blog.createdAt?.slice(0, 10) || "12 Jan 2024"}
                    id={blog.id}
                    published={blog.published}
                    myBlogs={true}
                    titleImage={blog.titleImage}
                  />
                ))
              ) : (
                <div className="text-center py-16">
                  <p className="font-cormorant text-xl text-vintage-ink/80 dark:text-darkVintage-ink/80">
                    You haven't written any scrolls yet.
                  </p>
                  <button
                    onClick={() => navigate("/publish")}
                    className="mt-4 flex items-center gap-2 bg-vintage-brown dark:bg-darkVintage-gold text-white dark:text-darkVintage-parchment px-5 py-2 rounded-md hover:bg-vintage-accent dark:hover:bg-darkVintage-accent transition-colors duration-300 font-lora text-sm mx-auto"
                  >
                    <span>Write your first scroll</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
