import {Component} from 'react'

import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import ThemeContext from '../../Context/ThemeContext'

import './index.css'

class LoginRoute extends Component {
  state = {username: '', password: '', errMsg: ''}

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onClickShowPassword = event => {
    this.setState({showPassword: event.target.checked})
  }

  renderUsername = () => {
    const {username} = this.state
    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDarkTheme} = value

          const textColor = isDarkTheme ? 'black' : 'white'

          return (
            <div className="input-container">
              <label htmlFor="username" className={`label ${textColor}`}>
                USERNAME
              </label>
              <input
                type="text"
                className={`loginInput ${textColor}`}
                id="username"
                value={username}
                onChange={this.onChangeUsername}
                placeholder="Username"
              />
            </div>
          )
        }}
      </ThemeContext.Consumer>
    )
  }

  renderPassword = () => {
    const {password, showPassword} = this.state
    const passwordType = showPassword ? 'text' : 'password'

    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDarkTheme} = value

          const textColor = isDarkTheme ? 'black' : 'white'

          return (
            <div className="input-container">
              <label htmlFor="password" className={`label ${textColor}`}>
                PASSWORD
              </label>
              <input
                type={passwordType}
                className={`loginInput ${textColor}`}
                id="password"
                value={password}
                onChange={this.onChangePassword}
                placeholder="Password"
              />
            </div>
          )
        }}
      </ThemeContext.Consumer>
    )
  }

  renderCheckBox = () => (
    <ThemeContext.Consumer>
      {value => {
        const {isDarkTheme} = value

        const textColor = isDarkTheme ? 'black' : 'white'

        return (
          <div className="input-container">
            <div className="checkBox-container">
              <input
                type="checkbox"
                className="checkBox"
                id="checkbox"
                onClick={this.onClickShowPassword}
              />
              <label htmlFor="checkbox" className={`label ${textColor}`}>
                Show Password
              </label>
            </div>
          </div>
        )
      }}
    </ThemeContext.Consumer>
  )

  onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  onSubmitForm = async event => {
    event.preventDefault()

    const {username, password} = this.state
    const userDetails = {username, password}

    const loginUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(loginUrl, options)
    const data = await response.json()
    console.log(data)

    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.setState({errMsg: data.error_msg})
    }
  }

  render() {
    const {errMsg} = this.state

    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDarkTheme} = value

          const nxtWatchLogo = isDarkTheme
            ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
            : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'

          const CardBgColor = isDarkTheme ? 'dark' : 'light'
          const appBgContainer = isDarkTheme ? 'bgDark' : 'bgLight'

          return (
            <div className={`app-container ${appBgContainer}`}>
              <div className={`login-card-container ${CardBgColor}`}>
                <img
                  src={nxtWatchLogo}
                  alt="website logo"
                  className="logo-image"
                />
                <form className="form-container" onSubmit={this.onSubmitForm}>
                  {this.renderUsername()}
                  {this.renderPassword()}
                  {this.renderCheckBox()}
                  <button className="loginButton" type="submit" color="#ffffff">
                    Login
                  </button>
                  <p className="errMsg">{errMsg}</p>
                </form>
              </div>
            </div>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default LoginRoute
