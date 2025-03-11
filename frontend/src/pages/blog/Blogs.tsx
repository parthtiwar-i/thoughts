import BlogCard from "../../components/ui/BlogCard";
// import { Loader } from "../../components/ui/skeletonLoader";
import { useBlogs } from "../../hooks/useBlogs";

// const Blogs = () => {
//   const { loading, blogs } = useBlogs();
//   if (loading) {
//     return <Loader />;
//   }
//   return (
//     <div className="flex flex-col justify-center items-center bg-orange-50">
//       <div className="w-3/4">
//         {blogs.map((blog) => (
//           <BlogCard
//             authorName={blog.author.name}
//             title={blog.title}
//             content={blog.content}
//             publishDate="12 Jan 2024"
//             id={blog.id}
//             titleImage={blog.titleImage}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Blogs;

import { useEffect, useRef } from "react";
// import BlogCard from "../components/BlogCard";
// import { useBlogs } from "../hooks/useBlogs";
import { Scroll } from "lucide-react";

const Blogs = () => {
  const { loading, blogs } = useBlogs();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Set scroll height for animation
    if (scrollContainerRef.current) {
      const scrolls = scrollContainerRef.current.querySelectorAll(".scroll");
      scrolls.forEach((scroll) => {
        const height = scroll.scrollHeight;
        // Fix: Cast the element to HTMLElement to access the style property
        (scroll as HTMLElement).style.setProperty(
          "--scroll-height",
          `${height}px`
        );
      });
    }
  }, [loading, blogs]);

  return (
    <div className="min-h-screen bg-vintage-paper dark:bg-darkVintage-paper relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-vintage-ink dark:text-darkVintage-ink">
            Ancient Scrolls
          </h1>
          <p className="mt-4 text-xl font-cormorant text-vintage-ink/80 dark:text-darkVintage-ink/80 max-w-3xl mx-auto">
            Discover stories from days past, reflections on literary classics,
            and the beauty of vintage aesthetics.
          </p>
          <div className="mt-6 w-24 h-1 bg-vintage-accent dark:bg-darkVintage-accent mx-auto"></div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Scroll className="w-12 h-12 text-vintage-brown dark:text-darkVintage-gold animate-pulse" />
            <p className="mt-4 font-cormorant text-vintage-ink/80 dark:text-darkVintage-ink/80">
              Unrolling ancient scrolls...
            </p>
          </div>
        ) : (
          <div ref={scrollContainerRef} className="space-y-12">
            {blogs.length > 0 ? (
              blogs.map((blog) => (
                <BlogCard
                  key={blog.id}
                  authorName={blog.author.name}
                  title={blog.title}
                  content={blog.content}
                  publishDate="12 Jan 2024"
                  id={blog.id}
                  titleImage={blog.titleImage}
                />
              ))
            ) : (
              <div className="text-center py-16">
                <p className="font-cormorant text-xl text-vintage-ink/80 dark:text-darkVintage-ink/80">
                  No scrolls found in the ancient library.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Blogs;
