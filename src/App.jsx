import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)

  const handleLogin = (event) => {
    event.preventDefault()
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  return (
    <>
      <Login 
      handleLogin={handleLogin}
      username={user}
      password={password}
      setUser={setUser}
      setPassword={setPassword}
      />
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </>
  )
}

export default App