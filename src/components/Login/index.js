import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class Login extends Component {
  state = {username: '', pin: '', errState: false, errText: ''}

  inputChange = event => {
    this.setState({username: event.target.value})
  }

  pinChange = event => {
    this.setState({pin: event.target.value})
  }

  btnClickedToSubmit = async event => {
    const {username, pin} = this.state
    event.preventDefault()
    const userDetails = {
      user_id: username,
      pin,
    }
    const url = 'https://apis.ccbp.in/ebank/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)

    if (response.ok) {
      const jsonData = await response.json()
      Cookies.set('jwt_token', jsonData.jwt_token, {expires: 30})
      const {history} = this.props
      history.replace('/')
    } else {
      const jsonData = await response.json()
      this.setState({errState: true, errText: jsonData.error_msg})
    }
  }

  render() {
    const {username, pin, errState, errText} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="bg-main-container">
        <div className="left-and-form-conatiner">
          <img
            className="website-logo"
            src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
            alt="website login"
          />
          <form onSubmit={this.btnClickedToSubmit} className="right-container">
            <h1>Welcome Back</h1>
            <div className="input-and-label-container">
              <label className="label" htmlFor="userid">
                User ID
              </label>
              <input
                value={username}
                onChange={this.inputChange}
                className="input"
                id="userid"
                type="text"
                placeholder="Enter User ID"
              />
            </div>
            <div className="input-and-label-container">
              <label className="label" htmlFor="pin">
                PIN
              </label>
              <input
                value={pin}
                onChange={this.pinChange}
                className="input"
                id="pin"
                type="password"
                placeholder="Enter PIN"
              />
            </div>
            <button type="submit" className="btn-primary">
              Login
            </button>
            {errState && <p className="error-msg">{errText}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
