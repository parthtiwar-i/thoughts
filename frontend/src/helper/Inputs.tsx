import { ChangeEvent } from "react";

interface LabelInput {
  label: string;
  placeholder: string;
  onchange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}
const Inputs = ({ label, placeholder, onchange, type }: LabelInput) => {
  return (
    <div>
      <label className="block mb-2 text-sm font-medium text-gray-900 ">
        {label}
      </label>
      <input
        type={type ? type : "text"}
        id={label}
        className="bg-orange-100 border border-gray-300 text-gray-950 text-sm rounded-lg focus-within:ring-orange-400 focus-within:border-orange-300 focus:outline-none  block w-full p-2.5"
        placeholder={placeholder}
        required
        onChange={onchange}
      />
    </div>
  );
};

export default Inputs;
