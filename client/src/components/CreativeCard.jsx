import React from "react";

const CreativeCard = (prop) => {
  return (
    <div className="w-auto rounded overflow-hidden shadow-lg bg-white p-2">
      <div className="px-6 py-4">
        <div className="font-semibold text-slate-700 text-xl mb-2">
          {prop.title} {prop.icon}
        </div>
        <p className="text-gray-500 text-base text-justify">{prop.body}</p>
      </div>
    </div>
  );
};

export default CreativeCard;
