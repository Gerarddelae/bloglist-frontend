import { useState } from "react"
import PropTypes from 'prop-types'

const Blog = ({ blog, handleLike, handleDelete }) => {
  const [visible, setVisible] = useState(false)
  const updateLikes = () => {
    return handleLike(blog)
  }

  const removeBlog = () => {
    handleDelete(blog)
  }
  
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
  <div style={blogStyle} className="showByDefault">
      {blog.title} {blog.author} <button onClick={toggleVisibility}>view</button>
  </div>
  <div style={showWhenVisible} className="hiddenByDefault">
    <p>{blog.url}</p>
    <p className="likeCounter">likes: {blog.likes} <button onClick={updateLikes} className="likeButton">like</button></p>
    <p>{blog.author}</p>
    <button onClick={removeBlog}>remove</button>
  </div>
  </>  
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleLike: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired
}

export default Blog