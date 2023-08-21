const Login = ({handleLogin, user, password, setUser, setPassword}) => (
    <>
    <h2>Log in to application</h2>
    <form onSubmit={handleLogin}>
        <div>
            username
            <input
                type="text"
                value={user}
                name="Username"
                onChange={({ target }) => setUser(target.value)} />
        </div>
        <div>
            password
            <input
                type="password"
                value={password}
                name="Password"
                onChange={({ target }) => setPassword(target.value)} />
        </div>
        <button type="submit">login</button>
    </form>
    </>      
)

export default Login