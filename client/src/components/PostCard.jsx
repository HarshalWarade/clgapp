import React, { useContext } from 'react'
import { DarkModeContext } from '../context/DarkModeContext'
const PostCard = (prop) => {
    const {isDarkMode} = useContext(DarkModeContext)
  return (
    <>
        <div>
            <h1>{prop.title}</h1>
            <p>{prop.timing}</p>
            <p>{prop.category}</p>
            <div className={`consolas`} dangerouslySetInnerHTML={{ __html: prop.content }}></div>

        </div>
    </>
  )
}

export default PostCard
