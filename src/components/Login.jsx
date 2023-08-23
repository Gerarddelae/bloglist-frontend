import PropTypes from 'prop-types'

const Login = ({handleLogin, username, password, setUsername, setPassword}) => (
    <>
    <h2>Log in to application</h2>
    <form onSubmit={handleLogin}>
        <div>
            username
            <input
                id='username'
                type="text"
                value={username}
                name="Username"
                onChange={({ target }) => setUsername(target.value)} />
        </div>
        <div>
            password
            <input
                id='password'
                type="password"
                value={password}
                name="Password"
                onChange={({ target }) => setPassword(target.value)} />
        </div>
        <button id='login-button' type="submit">login</button>
    </form>
    </>      
)

Login.propTypes = {
    handleLogin: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    setUsername: PropTypes.func.isRequired,
    setPassword: PropTypes.func.isRequired
}

export default Login