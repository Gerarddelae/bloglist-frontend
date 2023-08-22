import PropTypes from 'prop-types'

const BlogForm = ({addBlog, newBlog, newAuthor, newUrl, setNewBlog, setNewAuthor, setNewUrl}) => (
    <form onSubmit={addBlog}>
      <div>
      title  
      <input
        required
        id='title'
        name="title"
        type="text"
        value={newBlog}
        onChange={({ target }) => setNewBlog(target.value)}
      />
      </div>
      <div>
      author  
      <input
        required
        id='author'
        name="author"
        type="text"
        value={newAuthor}
        onChange={({ target }) => setNewAuthor(target.value)}
      />
      </div>
      <div>
      url 
      <input
        required
        id='url'
        name="url"
        type="text"
        value={newUrl}
        onChange={({ target }) => setNewUrl(target.value)}
      />
      </div>
      <button type="submit">save</button>
    </form>  
)

BlogForm.propTypes = {
  addBlog: PropTypes.func.isRequired,
  newBlog: PropTypes.string.isRequired,
  newAuthor: PropTypes.string.isRequired,
  newUrl: PropTypes.string.isRequired,
  setNewBlog: PropTypes.func.isRequired,
  setNewAuthor: PropTypes.func.isRequired,
  setNewUrl: PropTypes.func.isRequired
}

export default BlogForm