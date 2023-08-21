import { useState } from "react"

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)
  
  const showWhenVisible = { 
    display: visible ? '' : 'none',
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  
  const toggleVisibility = () => {
    setVisible(!visible)
  }
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  return (
  <>
  <div style={blogStyle}>
      {blog.title} <button onClick={toggleVisibility}>view</button>
  </div>
  <div style={showWhenVisible}>
    <p>{blog.url}</p>
    <p>{blog.likes}</p>
    <p>{blog.author}</p>
  </div>
  </>  
  )
}

export default Blog