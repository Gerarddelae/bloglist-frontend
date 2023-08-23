import { useState, useEffect, useRef } from 'react'
import './index.css'
import Blog from './components/Blog'
import Login from './components/Login'
import Error from './components/Error'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [password, setPassword] = useState('') 
  const [username, setUsername] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [newBlog, setNewBlog] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const blogFormRef = useRef()

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogOut = () => {
    window.localStorage.removeItem('loggedNoteappUser')
    setUser(null)
    blogService.setToken(null)
  }

  const handleLike = async (blog) => {
    const blogToUpdate = {
      user: blog.user.id,
      id: blog.id,
      title: blog.title,
      likes: blog.likes + 1,
      author: blog.author,
      url: blog.url
    }
    
    await blogService.update(blog.id, blogToUpdate)
    setBlogs(blogs.map((blog) => (blog.id !== blogToUpdate.id ? blog : blogToUpdate )))
  }

  const handleDelete = async (blog) => {
    await blogService.remove(blog.id)
    setBlogs(blogs.filter((b) => b.id !== blog.id))

  }

  const addBlog = async (event) => {
    event.preventDefault()
    
    try {
      const blog = await blogService.create({
        title: newBlog,
        author: newAuthor,
        url: newUrl}
      )
      setBlogs(blogs.concat(blog))
      setNewAuthor('')
      setNewBlog('')
      setNewUrl('')
      blogFormRef.current.toggleVisibility()
      setMessage(`a new blog ${blog.title} by ${blog.author} added`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (error) {
      setErrorMessage(error.message)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  return (
    <>
      {user === null 
      &&
      <>
        <Notification message={message} />
        <Error message={errorMessage} />
          <Login 
          handleLogin={handleLogin}
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
          />
      </>}
      {user !== null && 
      <>
      <h2>blogs</h2>
      <Notification message={message} />
      <Error message={errorMessage} />
      <p>{user.username} logged in <button onClick={handleLogOut}>log out</button></p> 
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm
        addBlog={addBlog}
        newAuthor={newAuthor}
        newBlog={newBlog}
        newUrl={newUrl}
        setNewAuthor={setNewAuthor}
        setNewBlog={setNewBlog}
        setNewUrl={setNewUrl}
        />
      </Togglable>
      {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
        <Blog key={blog.id} blog={blog} handleLike={handleLike} handleDelete={handleDelete}/>
      )}
      </>
      }
    </>
  )
}

export default App