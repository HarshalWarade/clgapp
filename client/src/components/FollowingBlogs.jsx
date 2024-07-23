import React, { useEffect, useState, useRef, useCallback } from "react";
import { useAuth } from "../store/auth";
import PostCard from "./PostCard";

const FollowingBlogs = () => {
  const { token } = useAuth();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();

  const fetchBlogs = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://blogapp-pi-six.vercel.app/api/auth/followingblogs?page=${page}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      setBlogs(prevBlogs => {
        const newBlogs = result.data.filter(
          newBlog => !prevBlogs.some(existingBlog => existingBlog._id === newBlog._id)
        );
        const combinedBlogs = [...prevBlogs, ...newBlogs];
        combinedBlogs.sort((a, b) => new Date(b.blogCreatedAt) - new Date(a.blogCreatedAt));
        return combinedBlogs;
      });
      setHasMore(result.data.length > 0);
    } catch (err) {
      setError("Error fetching blogs, please try again later.");
    }
    setLoading(false);
  }, [page, token]);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  const lastBlogElementRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPage => prevPage + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  return (
    <div>
      {blogs.length > 0 ? (
        <ul>
          {blogs.map((blog, index) => (
            <div key={blog._id} ref={index === blogs.length - 1 ? lastBlogElementRef : null}>
              <PostCard 
                postId={blog._id}
                title={blog.title}
                category={blog.category}
                timing={formatDate(blog.blogCreatedAt)}
                content={blog.content}
                author={blog.author}
              />
            </div>
          ))}
        </ul>
      ) : (
        <p>You are not following any users with blogs.</p>
      )}
      {loading && <div>Loading...</div>}
      {error && <div>{error}</div>}
    </div>
  );
};

export default FollowingBlogs;
