import React, { useState, useEffect, useContext } from 'react';
import { useAuth } from '../store/auth';

import { DarkModeContext } from "../context/DarkModeContext";

const FetchPosts = () => {
    const {isDarkMode} = useContext(DarkModeContext)
    const { token } = useAuth();
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/auth/getblogs', {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setBlogs(data.blogs);
                } else {
                    console.error('Failed to fetch blogs.');
                }
            } catch (error) {
                console.error('Error fetching blogs:', error);
            }
        };

        fetchBlogs();
    }, [token]); // Include token in the dependency array

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4">Blog Posts</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {blogs.length > 0 ? (
                    blogs.map((blog) => (
                        <div key={blog._id} className={`flex flex-col gap-5 ${isDarkMode ? "border border-gray-700" : "bg-white"} rounded-lg shadow-md p-6`}>
                            <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
                            <div dangerouslySetInnerHTML={{ __html: blog.content }}
                            style={{whiteSpace: 'pre-wrap'}}
                            />
                            {/* <p className="text-gray-500 text-sm">Author: {blog.author}</p> */}
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">No blogs found.</p>
                )}
            </div>
        </div>
    );
};

export default FetchPosts;
