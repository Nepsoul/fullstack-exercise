import PropTypes from "prop-types"; //use for defining type of props

const LoginForm = ({
  username,
  password,
  handleUsernameChange,
  handlePasswordChange,
  loginHanle,
}) => {
  return (
    <div>
      <form onSubmit={loginHanle}>
        <div>
          username{" "}
          <input
          id="username"
            type="text"
            value={username}
            name="Username"
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          password{" "}
          <input
          id="password"
            type="text"
            value={password}
            password="Password"
            onChange={handlePasswordChange}
          />
        </div>
        <button id ="login-button" type="submit">login</button>
      </form>
    </div>
  );
};

LoginForm.propTypes = {
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  loginHanle: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
};

export default LoginForm;
