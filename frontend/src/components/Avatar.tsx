const Avatar = ({ name, className }: { name: string; className?: string }) => {
  function getFirstTwoChars(str: string) {
    return str
      .split(" ")
      .map((word) => word.slice(0, 1))
      .join("");
  }
  return (
    <div>
      <div
        className={`${
          className
            ? className
            : "relative inline-flex items-center justify-center h-7 w-7 overflow-hidden bg-gray-300 rounded-full"
        }`}
      >
        <span
          className={` ${
            className
              ? "font-semibold text-5xl text-gray-800 "
              : "font-semibold text-sm text-gray-800 "
          }`}
        >
          {getFirstTwoChars(name)}
        </span>
      </div>
    </div>
  );
};

export default Avatar;
