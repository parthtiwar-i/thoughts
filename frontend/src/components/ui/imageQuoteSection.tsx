interface InfoCardProps {
  imageSrc: string;
  leftQuote: string;
  rightQuote: string;
  altText?: string;
}

export default function ImageQuoteCard({
  imageSrc,
  leftQuote,
  rightQuote,
  altText = "Blog image",
}: InfoCardProps) {
  return (
    <div className="w-full mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="flex w-full flex-col md:flex-row items-center justify-between p-6 space-y-4 md:space-y-0">
        <div className="w-full md:w-1/3 text-center md:text-right">
          <p className="text-gray-600 italic">&ldquo;{leftQuote}&rdquo;</p>
        </div>

        <div className="w-full md:w-1/3 flex justify-center items-center">
          <div className="relative">
            <img src={imageSrc} alt={altText} className="rounded-full" />
          </div>
        </div>

        <div className="w-full md:w-1/3 text-center md:text-left">
          <p className="text-gray-600 italic">&ldquo;{rightQuote}&rdquo;</p>
        </div>
      </div>
    </div>
  );
}
