import { useState, useEffect } from "react";

interface PageTurnerProps {
  isLoading: boolean;
  onLoadingComplete: () => void;
}

const PageTurner = ({ isLoading, onLoadingComplete }: PageTurnerProps) => {
  const [visible, setVisible] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 3;

  useEffect(() => {
    let timer: any;

    if (isLoading) {
      // If still loading, continue turning pages
      const interval = setInterval(() => {
        setCurrentPage((prev) => {
          if (prev < totalPages) return prev + 1;
          // Reset to first page if we've gone through all pages
          return 1;
        });
      }, 1500);

      return () => clearInterval(interval);
    } else {
      // When loading is complete, finish the animation and hide
      timer = setTimeout(() => {
        setVisible(false);
        setTimeout(() => onLoadingComplete(), 500);
      }, 1000);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isLoading, onLoadingComplete]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-vintage-paper dark:bg-darkVintage-paper z-50 transition-opacity duration-500">
      <div className="w-72 h-96 md:w-80 md:h-112 relative perspective-1000 overflow-hidden rounded-lg shadow-xl">
        {/* Static background page */}
        <div className="page absolute inset-0 bg-vintage-cream dark:bg-darkVintage-brown rounded-r-lg border-r border-vintage-brown/20 dark:border-darkVintage-gold/20">
          <div className="page-content">
            <div className="text-center">
              <h2 className="text-2xl font-playfair font-semibold">
                Thoughts ...
              </h2>
              <p className="mt-2 font-cormorant italic">
                A journey through different thoughts...
              </p>
            </div>
          </div>
        </div>

        {/* Animated turning pages */}
        {[1, 2, 3].map((page) => (
          <div
            key={page}
            className={`page ${
              currentPage === page ? "animate-page-turn" : "opacity-0"
            }`}
            style={{
              animationDelay: `${(page - 1) * 0.2}s`,
              zIndex: 10 + page,
            }}
          >
            <div className="page-content">
              {page === 1 && (
                <div>
                  <h2 className="text-2xl font-playfair">Chapter I</h2>
                  <p className="mt-4 font-cormorant italic">Beginnings</p>
                </div>
              )}
              {page === 2 && (
                <div>
                  <h2 className="text-2xl font-playfair">Chapter II</h2>
                  <p className="mt-4 font-cormorant italic">Discovery</p>
                </div>
              )}
              {page === 3 && (
                <div>
                  <h2 className="text-2xl font-playfair">Chapter III</h2>
                  <p className="mt-4 font-cormorant italic">Journey</p>
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Book binding */}
        <div className="absolute left-0 top-0 h-full w-3 bg-vintage-brown dark:bg-darkVintage-gold rounded-l-sm"></div>
      </div>
    </div>
  );
};

export default PageTurner;
