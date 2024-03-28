import React, { useContext } from 'react'
import { DarkModeContext } from '../context/DarkModeContext'
const PostCard = (prop) => {
    const {isDarkMode} = useContext(DarkModeContext)
  return (
    <>
        <div className={`flex h-min p-5 rounded-md ${isDarkMode ? "border border-slate-600" : "bg-white"} flex-col gap-5`}>
            <h1 className={`text-2xl font-semibold ${isDarkMode ? "text-slate-100" : ""}`}>{prop.title}</h1>
            <div className={`consolas overflow-x-auto ${isDarkMode ? "text-slate-300" : "text-slate-700"}`} dangerouslySetInnerHTML={{ __html: prop.content }}></div>
            <p className={`text-sm font-semibold ${isDarkMode ? "text-slate-600" : "text-slate-400"}`}>Category: {prop.category}</p>
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
