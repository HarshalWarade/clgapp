import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { DarkModeContext } from '../context/DarkModeContext'
const ImgCard = (prop) => {
    const {isDarkMode} = useContext(DarkModeContext)
  return (
    <>
      <div className={`flex items-center content-center gap-5 ${isDarkMode ? "border border-gray-700" : "bg-white"} rounded-md p-5`}>
        <div className={`flex flex-col items-center content-center gap-5`}>
            <img className={`flex items-center content-center w-1/2 h-auto rounded-md`} src={prop.img} alt="" />
            <h2 className={`text-2xl font-semibold ${isDarkMode ? "text-slate-100" : "text-slate-800"}`}>{prop.heading}</h2>
            <p className={`text-justify ${isDarkMode ? "text-slate-300/85" : "text-slate-500"}`}>{prop.content}</p>
            {prop.link ? <NavLink to={`${prop.link}`} className={`bg-orange-400 w-min px-3 py-2 text-white rounded-md hover:bg-orange-500`}>Visit</NavLink> : ""}
        </div>
      </div>
    </>
  )
}

export default ImgCard
