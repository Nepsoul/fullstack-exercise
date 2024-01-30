const LoginForm=({username,password,handleUsernameChange,handlePasswordChange,loginHanle})=>{
return(<div>
    <form onSubmit={loginHanle}>
        <div>
          username{" "}
          <input
            type="text"
            value={username}
            name="Username"
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          password{" "}
          <input
            type="text"
            value={password}
            password="Password"
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit">login</button>
      </form>
</div>)
}
export default LoginForm