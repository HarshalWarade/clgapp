import React, { useContext, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import { DarkModeContext } from "../context/DarkModeContext";


const TextEditor = () => {
  const {isDarkMode} = useContext(DarkModeContext)
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [content, setContent] = useState('');

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleContentChange = (value) => {
    setContent(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const token = localStorage.getItem('token')
    try {
      const response = await fetch('http://localhost:3000/api/auth/postblog', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",          
        },
        body: JSON.stringify({ title, category, content }),
      });
      console.log(response)

      if (response.ok) {
        toast.success("Post uploaded successfully!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setTimeout(() => {
          location.reload()
        }, 2000);
      } else {
        toast.error("Cannot post!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        // Handle error accordingly (show error message, etc.)
      }
    } catch (error) {
      console.error('Error submitting data:', error);
      // Handle error accordingly (show error message, etc.)
    }
  };

  return (
    <div className={`${isDarkMode ? "bg-gray-200 border border-gray-300" : "bg-white"} rounded-md shadow-md p-5 fixed w-3/5 h-max`}
      style={{top: "50%", left: "50%", transform: "translate(-50%, -50%)"}}
    >
      <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
        
        <input type="text" className='h-10 pl-3 outline-none border rounded-md' value={title} onChange={handleTitleChange} placeholder="Title" required />
        <select value={category} onChange={handleCategoryChange} className='h-10 pl-3 outline-none border rounded-md'>
          <option value="wontRank">Choose category</option>
          <option value="Category 1">Category 1</option>
          <option value="Category 2">Category 2</option>
          <option value="Category 3">Category 3</option>
          <option value="Category 4">Category 4</option>
          <option value="Category 5">Category 5</option>
        </select>
        <ReactQuill value={content} onChange={handleContentChange} placeholder="Content" required />
        <button className='bg-orange-500 p-2 rounded-md text-white hover:bg-orange-600' type="submit">Submit</button>
      </form>
      <ToastContainer
        position="top-left"
        autoClose={2000}
        hideProgressBar={false}
      />
    </div>
  );
};

export default TextEditor;
