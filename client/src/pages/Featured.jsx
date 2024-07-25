import React, { useContext, useState } from "react";
import { useAuth } from "../store/auth";
import { DarkModeContext } from "../context/DarkModeContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Featured = () => {
  const { isDarkMode } = useContext(DarkModeContext);
  const { token, user } = useAuth();
  const [newFeatured, setNewFeatured] = useState({
    imageUrl: "",
    heading: "",
    content: "",
    visitLink: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewFeatured({ ...newFeatured, [name]: value });
  };

  const handleAddFeatured = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/auth/addfeatured/${user._id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newFeatured),
        }
      );

      if (response.ok) {
        toast.success("Successful!", {
          position: "top-right",
          autoClose: 12000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setTimeout(() => {
            location.reload()
        }, 12000);
      }

      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }

      const data = await response.json();
      console.log("Featured item added successfully:", data);
      setNewFeatured({
        imageUrl: "",
        heading: "",
        content: "",
        visitLink: "",
      });
    } catch (error) {
      console.error("Error adding featured item:", error);
    }
  };

  return (
    <>
      <div
        className={`max-w-md mx-auto ${
          isDarkMode ? "bg-slate-800" : "bg-white"
        } shadow-lg rounded-lg overflow-hidden`}
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <div className="p-4">
          <h3
            className={`mx-auto text-lg font-semibold mb-4 ${
              isDarkMode ? "" : ""
            }`}
          >
            Add New Featured Item
          </h3>
          <input
            type="text"
            name="imageUrl"
            value={newFeatured.imageUrl}
            onChange={handleInputChange}
            placeholder="Image URL"
            className={`${
              isDarkMode
                ? "bg-slate-700 border-none outline-none"
                : "outline-none border"
            } border border-gray-300 rounded-md px-3 py-2 mb-2 w-full`}
          />
          <input
            type="text"
            name="heading"
            value={newFeatured.heading}
            onChange={handleInputChange}
            placeholder="Heading"
            className={`${
              isDarkMode
                ? "bg-slate-700 border-none outline-none"
                : "outline-none border"
            } border border-gray-300 rounded-md px-3 py-2 mb-2 w-full`}
          />
          <textarea
            type="text"
            name="content"
            value={newFeatured.content}
            onChange={handleInputChange}
            placeholder="Content"
            className={`${
              isDarkMode
                ? "bg-slate-700 border-none outline-none"
                : "outline-none border"
            } border border-gray-300 rounded-md px-3 py-2 mb-2 w-full h-28`}
          />
          <input
            type="text"
            name="visitLink"
            value={newFeatured.visitLink}
            onChange={handleInputChange}
            placeholder="Visit Link"
            className={`${
              isDarkMode
                ? "bg-slate-700 border-none outline-none"
                : "outline-none border"
            } border border-gray-300 rounded-md px-3 py-2 mb-2 w-full`}
          />
          <button
            onClick={handleAddFeatured}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Add Featured Item
          </button>
        </div>
      </div>
      <ToastContainer
        position="top-left"
        autoClose={12000}
        hideProgressBar={false}
      />
    </>
  );
};

export default Featured;
