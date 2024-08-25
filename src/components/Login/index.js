
import {Redirect} from 'react-router-dom'

import {Component} from 'react'
import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {
    showPassword: false,
    username: '',
    password: '',
    isShownError: false,
    errorMsg: '',
  }

  onSubmitFailure = errorMsg => {
    this.setState({isShownError: true, errorMsg: errorMsg})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const option = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, option)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  onClickCheckBtnType = () => {
    this.setState(prevState => ({showPassword: !prevState.showPassword}))
  }

  onChangeUserName = event => {
    this.setState({username: event.target.value})
  }

  onChangePassWord = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {showPassword, username, password, isShownError, errorMsg} =
      this.state

    const inputType = showPassword ? 'text' : 'password'
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-bg-container">
        <form className="form-container" onSubmit={this.onSubmitForm}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
            className="logo-img"
            alt="website logo"
          />

          <label className="labelName" htmlFor="USERNAME">
            USERNAME
          </label>
          <input
            className="input"
            type="text"
            id="USERNAME"
            placeholder="Username"
            value={username}
            onChange={this.onChangeUserName}
          />
          <label className="labelName" htmlFor="PASSWORD">
            PASSWORD
          </label>
          <input
            className="input"
            type={inputType}
            id="PASSWORD"
            placeholder="Password"
            value={password}
            onChange={this.onChangePassWord}
          />
          <div className="checkbox-container">
            <input
              className="input-checkbox"
              type="checkbox"
              id="checkbox"
              placeholder="Password"
              onClick={this.onClickCheckBtnType}
            />
            <label className="CheckBoxlabelName" htmlFor="PASSWORD">
              Show Password
            </label>
          </div>
          <button className="login-btn" type="submit">
            Login
          </button>
          {isShownError && <p className="error-msg">{`*${errorMsg}`}</p>}
        </form>
      </div>
    )
  }
}

export default Login
