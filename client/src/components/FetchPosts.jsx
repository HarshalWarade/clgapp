import React, { useState, useEffect, useContext } from 'react';
import { useAuth } from '../store/auth';
import { DarkModeContext } from '../context/DarkModeContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Comment from '../pages/Comment';

const FetchPosts = () => {
  const { isDarkMode } = useContext(DarkModeContext);
  const { token } = useAuth();
  const [blogs, setBlogs] = useState([]);
  const [editingBlogId, setEditingBlogId] = useState(null);
  const [editedContent, setEditedContent] = useState('');

  const formatDate = (dateString) => {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    };
    const formattedDate = new Date(dateString).toLocaleDateString('en-US', options);
    return formattedDate;
  };

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

  useEffect(() => {
    fetchBlogs();
  }, [token]);

  const handleEdit = async (blogId) => {
    setEditingBlogId(blogId);
    try {
      const response = await fetch(`http://localhost:3000/api/auth/getblog/${blogId}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setEditedContent(data.blog.content);
      } else {
        console.error('Failed to fetch blog for editing.');
      }
    } catch (error) {
      console.error('Error fetching blog for editing:', error);
    }
  };

  const handleSaveEdit = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/auth/editblog/${editingBlogId}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: editedContent }),
      });

      if (response.ok) {
        setEditingBlogId(null);
        fetchBlogs();
        console.log('Blog edited successfully.');
      } else {
        console.error('Failed to edit blog.');
      }
    } catch (error) {
      console.error('Error editing blog:', error);
    }
  };

  const handleDelete = async (blogId) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        const response = await fetch(`http://localhost:3000/api/auth/deleteblog/${blogId}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== blogId));
          toast.success('Post deleted successfully!', {
            position: 'top-right',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        } else {
          const responseData = await response.text();
          console.error('Failed to delete blog:', responseData);
        }
      } catch (error) {
        console.error('Error deleting blog:', error);
      }
    }
  };

  return (
    <>
      <ToastContainer position="top-left" autoClose={2000} hideProgressBar={false} />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap gap-5">
          {blogs.length > 0 ? (
            blogs.map((blog) => (
              <div
                key={blog._id}
                className={`h-min overflow-x-auto flex flex-col gap-5 ${
                  isDarkMode ? 'border border-gray-700' : 'border border-gray-200'
                } rounded-lg p-6`}
              >
                <h2 className={`text-xl font-semibold mb-2 ${isDarkMode ? '' : 'text-slate-700'}`}>
                  {blog.title}
                </h2>
                {editingBlogId === blog._id ? (
                  <div>
                    <textarea
                      value={editedContent}
                      onChange={(e) => setEditedContent(e.target.value)}
                      className="w-full h-40 border border-gray-300 rounded-md p-2"
                    />
                    <button
                      onClick={handleSaveEdit}
                      className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded mt-2"
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <>
                    <div
                      className={`consolas ${isDarkMode ? '' : 'text-slate-500'}`}
                      dangerouslySetInnerHTML={{ __html: blog.content }}
                      style={{ whiteSpace: 'pre-wrap' }}
                    />
                    <p className="text-gray-500 text-sm">{blog.category}</p>
                    <p className="text-gray-500 text-sm">{formatDate(blog.blogCreatedAt)}</p>
                  </>
                )}
                <div className="flex justify-between items-center">
                  {/* <div>
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
                      onClick={() => handleEdit(blog._id)}
                    >
                      Edit
                    </button>
                  </div> */}
                  <div className='flex items-center w-full justify-between'>
                    <button
                      className="text-red-500"
                      onClick={() => handleDelete(blog._id)}
                    >
                      <i className="fa-solid fa-trash-list"></i>
                    </button>
                    <button
                      className="text-slate-400"
                    >
                      <i className="fa-solid fa-comment"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No blogs found.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default FetchPosts;
