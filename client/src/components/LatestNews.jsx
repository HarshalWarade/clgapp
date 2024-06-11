import React, { useState, useEffect, useContext } from 'react';
import ArticleList from './ArticleList';
import { DarkModeContext } from "../context/DarkModeContext";

const LatestNews = () => {
    const {isDarkMode} = useContext(DarkModeContext)
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch('https://newsapi.org/v2/top-headlines?country=in&apiKey=94dd0f461eb847f48857b10460a7595c');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setArticles(data.articles);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className='flex flex-col items-center content-center gap-3'>
      <ArticleList articles={articles} />
    </div>
  );
};

export default LatestNews;
