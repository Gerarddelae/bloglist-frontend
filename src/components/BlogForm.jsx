const BlogForm = ({addBlog, newBlog, newAuthor, newUrl, setNewBlog, setNewAuthor, setNewUrl}) => (
    <form onSubmit={addBlog}>
      <div>
      title  
      <input
        required
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
        name="url"
        type="text"
        value={newUrl}
        onChange={({ target }) => setNewUrl(target.value)}
      />
      </div>
      <button type="submit">save</button>
    </form>  
)

export default BlogForm