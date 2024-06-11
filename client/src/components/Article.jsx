import React, { useContext } from 'react';
import { DarkModeContext } from '../context/DarkModeContext';
const Article = ({ article }) => {
    const {isDarkMode} = useContext(DarkModeContext)
  return (
    <div className={`mb-5 flex flex-col gap-2 content-center w-full p-5 rounded-md ${isDarkMode ? "" : ""} `}
    style={
        isDarkMode ? { background: "#1B1F23" } : { background: "#fff" }
      }
    >
      <h2 className={`font-semibold`}>{article.title}</h2>
      <p><strong>Author:</strong> {article.author}</p>
      <p><strong>Source:</strong> {article.source.name}</p>
      <p>{article.description}</p>
      <img className='rounded-md' src={article.urlToImage} alt={article.title} style={{ width: '100%' }} />
      <p><a href={article.url} target="_blank" rel="noopener noreferrer">Read more</a></p>
      <p><small>{new Date(article.publishedAt).toLocaleString()}</small></p>
    </div>
  );
};

export default Article;
