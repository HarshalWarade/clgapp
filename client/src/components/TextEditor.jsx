import React, { useContext, useState } from "react"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"

import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import { DarkModeContext } from "../context/DarkModeContext"

const TextEditor = () => {
  const { isDarkMode } = useContext(DarkModeContext)
  const [title, setTitle] = useState("")
  const [category, setCategory] = useState("")
  const [content, setContent] = useState("")

  const handleTitleChange = (e) => {
    setTitle(e.target.value)
  }

  const handleCategoryChange = (e) => {
    setCategory(e.target.value)
  }

  const handleContentChange = (value) => {
    setContent(value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const token = localStorage.getItem("token")
    try {
      const response = await fetch("http://blogapp-pi-six.vercel.app/api/auth/postblog", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, category, content }),
      })
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
        })
        setTimeout(() => {
          location.reload()
        }, 2000)
      } else {
        toast.error("Cannot post!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      }
    } catch (error) {
      console.error("Error submitting data:", error)
    }
  }

  return (
    <div
      className={`${
        isDarkMode ? "bg-black " : "bg-slate-100"
      } rounded-md shadow-md p-8 fixed w-3/5 h-max`}
      style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
    >
      <h1 className={`flex items-center content-center justify-center text-2xl mb-5 font-semibold ${isDarkMode ? "text-slate-200" : ""}`}>Create a Post</h1>
      <form onSubmit={handleSubmit} className={`flex flex-col gap-5 ${isDarkMode ? "bg-black": "bg-slate-100"}`}>
        <input
          type="text"
          className={`h-10 pl-3 outline-none rounded-md ${isDarkMode ? "text-slate-800 bg-slate-200 outline-none border-none" : ""}`}
          value={title}
          onChange={handleTitleChange}
          placeholder="Title"
          required
        />
        <select
          value={category}
          onChange={handleCategoryChange}
          className={`h-10 pl-3 outline-none rounded-md ${isDarkMode ? "bg-slate-200 text-slate-800 outline-none border-none" : ""}`}
        >
          <option value="wontRank">Choose category</option>
          <option value="Agile Methodologies">Agile Methodologies</option>
          <option value="Agile Project Management Tools">
            Agile Project Management Tools
          </option>
          <option value="Algorithms">Algorithms</option>
          <option value="API Development">API Development</option>
          <option value="Backend Development">Backend Development</option>
          <option value="Big Data">Big Data</option>
          <option value="Blockchain Development">Blockchain Development</option>
          <option value="Cloud Computing">Cloud Computing</option>
          <option value="Code Optimization">Code Optimization</option>
          <option value="Code Refactoring">Code Refactoring</option>
          <option value="Code Review">Code Review</option>
          <option value="Code Versioning Tools">Code Versioning Tools</option>
          <option value="Computer Vision">Computer Vision</option>
          <option value="Containerization">Containerization</option>
          <option value="Continuous Integration/Continuous Deployment (CI/CD)">
            Continuous Integration/Continuous Deployment (CI/CD)
          </option>
          <option value="Cross-Platform Development">
            Cross-Platform Development
          </option>
          <option value="Cybersecurity">Cybersecurity</option>
          <option value="Data Analytics">Data Analytics</option>
          <option value="Data Engineering">Data Engineering</option>
          <option value="Data Governance">Data Governance</option>
          <option value="Data Privacy">Data Privacy</option>
          <option value="Data Science">Data Science</option>
          <option value="Data Structures">Data Structures</option>
          <option value="Data Visualization">Data Visualization</option>
          <option value="Database Management">Database Management</option>
          <option value="Debugging Techniques">Debugging Techniques</option>
          <option value="Deep Learning">Deep Learning</option>
          <option value="DevOps">DevOps</option>
          <option value="Frontend Development">Frontend Development</option>
          <option value="Full Stack Development">Full Stack Development</option>
          <option value="Game Development">Game Development</option>
          <option value="GraphQL">GraphQL</option>
          <option value="HTTP/HTTPS">HTTP/HTTPS</option>
          <option value="IDEs and Editors">IDEs and Editors</option>
          <option value="iOS Development">iOS Development</option>
          <option value="Machine Learning">Machine Learning</option>
          <option value="Microservices">Microservices</option>
          <option value="Mobile App Development">Mobile App Development</option>
          <option value="Mobile-First Development">
            Mobile-First Development
          </option>
          <option value="Natural Language Processing (NLP)">
            Natural Language Processing (NLP)
          </option>
          <option value="Network Programming">Network Programming</option>
          <option value="Networking">Networking</option>
          <option value="Penetration Testing">Penetration Testing</option>
          <option value="Performance Testing">Performance Testing</option>
          <option value="Progressive Web Apps (PWAs)">
            Progressive Web Apps (PWAs)
          </option>
          <option value="React Native">React Native</option>
          <option value="RESTful APIs">RESTful APIs</option>
          <option value="Responsive Web Design">Responsive Web Design</option>
          <option value="Scrum">Scrum</option>
          <option value="Security Best Practices">
            Security Best Practices
          </option>
          <option value="Security Compliance">Security Compliance</option>
          <option value="Security Testing">Security Testing</option>
          <option value="Serverless Architecture">
            Serverless Architecture
          </option>
          <option value="Software Design Patterns">
            Software Design Patterns
          </option>
          <option value="Software Development Best Practices">
            Software Development Best Practices
          </option>
          <option value="Software Engineering">Software Engineering</option>
          <option value="Software Testing Tools">Software Testing Tools</option>
          <option value="Testing & Quality Assurance">
            Testing & Quality Assurance
          </option>
          <option value="Test-Driven Development (TDD)">
            Test-Driven Development (TDD)
          </option>
          <option value="Unity">Unity</option>
          <option value="User Experience (UX) Design">
            User Experience (UX) Design
          </option>
          <option value="User Interface (UI) Design">
            User Interface (UI) Design
          </option>
          <option value="Version Control Systems">
            Version Control Systems
          </option>
          <option value="Virtual Reality (VR)">Virtual Reality (VR)</option>
          <option value="Web Accessibility">Web Accessibility</option>
          <option value="Web Development">Web Development</option>
          <option value="Web Security">Web Security</option>
          <option value="Wireless Technologies">Wireless Technologies</option>
          <option value="Xcode">Xcode</option>
          <option value="Yarn">Yarn</option>
          <option value="Zsh">Zsh</option>
        </select>
        
        <ReactQuill
          value={content}
          onChange={handleContentChange}
          placeholder="If placing a code, make sure to place it in between !!!!your code!!!!"
          className={`border-none outline-none rounded-md ${isDarkMode ? "bg-slate-200 text-slate-800" : "bg-white text-gray-800"}`}
          required
        />
        <button
          className="bg-orange-500 p-2 rounded-md text-white hover:bg-orange-600"
          type="submit"
        >
          Submit
        </button>
      </form>
      <ToastContainer
        position="top-left"
        autoClose={2000}
        hideProgressBar={false}
      />
    </div>
  )
}

export default TextEditor
