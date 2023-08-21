import { useState, useEffect } from 'react'
import './index.css'
import Blog from './components/Blog'
import Login from './components/Login'
import Error from './components/Error'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
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
        <h2>Log in to application</h2>
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
      <BlogForm
      addBlog={addBlog}
      newAuthor={newAuthor}
      newBlog={newBlog}
      newUrl={newUrl}
      setNewAuthor={setNewAuthor}
      setNewBlog={setNewBlog}
      setNewUrl={setNewUrl}
      />
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
      </>
      }
    </>
  )
}

export default App