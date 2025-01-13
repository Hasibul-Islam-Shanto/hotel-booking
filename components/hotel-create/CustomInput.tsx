"use client";
import React, { forwardRef, useState } from "react";
import { FaPen, FaSave } from "react-icons/fa";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string;
  type: string;
  inputValueClassName: string;
}

const CustomInput = forwardRef<HTMLInputElement, InputProps>(
  ({ value, inputValueClassName, type, ...otherProps }, ref) => {
    const [isEditing, setIsEditing] = useState<boolean>(false);

    return (
      <div>
        {!isEditing && (
          <div className="flex items-center justify-start gap-2">
            <h1 className={`${inputValueClassName}`}>{value}</h1>
            <FaPen
              onClick={() => setIsEditing(true)}
              className="text-gray-500 text-sm cursor-pointer"
            />
          </div>
        )}
        {isEditing && (
          <div className="flex items-center justify-start gap-2">
            <input
              type={type || "text"}
              ref={ref}
              {...otherProps}
              className="text-zinc-800 border-[1px] border-gray-400 rounded-md outline-primary px-2 py-1"
            />
            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 bg-primary text-white rounded-lg text-sm ml-4 hover:brightness-90"
            >
              <FaSave />
            </button>
          </div>
        )}
      </div>
    );
  }
);

CustomInput.displayName = "CustomInput";
export default CustomInput;
