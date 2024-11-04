import quote from "../assets/pngegg.png";
const Quote = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="flex justify-center items-center flex-col h-full">
        <div className="bg-orange-100 w-3/4 rounded-md p-14">
          <p className="text-lg relative italic text-orange-800 font-semibold">
            <img src={quote} className="w-8 absolute -top-3 -left-9" alt="" />
            The best blogs are those that focus on the needs of their readers.
            Write about what your audience wants to know, not just what you want
            to tell them.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Quote;
