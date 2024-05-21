import React, { useContext } from 'react'
import { DarkModeContext } from '../context/DarkModeContext'
const PostCard = (prop) => {
  const replaceCodeWithStyled = (content) => {
    const codeRegex = /!!!!(.*?)!!!!/gs;
    return content.replace(codeRegex, (match, code) => {
      return `<code class="consolas">${code}</code>`;
    });
  };
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  const {isDarkMode} = useContext(DarkModeContext)
  return (
    <>
        <div className={`flex h-min p-5 rounded-md ${isDarkMode ? "border border-slate-600" : "bg-white"} flex-col gap-5`}>
            <h1 className={`text-2xl font-semibold ${isDarkMode ? "text-slate-100" : ""}`}>{prop.title}</h1>
            <div
              className={`${isDarkMode ? 'text-slate-300' : 'text-slate-500'}`}
              dangerouslySetInnerHTML={{
                __html: replaceCodeWithStyled(prop.content),
              }}
              style={{ whiteSpace: 'pre-wrap' }}
            />
            <p className={`text-sm font-semibold ${isDarkMode ? "bg-gray-700 text-gray-300" : "bg-gray-200 text-gray-500"} w-max px-2 py-1 rounded-md `}>{prop.category}</p>
            <p className={`text-sm font-semibold ${isDarkMode ? "text-slate-600" : "text-slate-400"}`}>{prop.timing}</p>
            <div id="activites" className={`flex justify-between`}>
                <button onClick={() => console.log("liked")}>Like</button>
                <button onClick={() => console.log("commented!")}>Comment</button>
            </div>
        </div>
    </>
  )
}

export default PostCard
