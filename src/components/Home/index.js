import Cookies from 'js-cookie'
import {Component} from 'react'
import {Redirect} from 'react-router-dom'

import './index.css'

class Home extends Component {
  logoutBtnClicked = () => {
    Cookies.remove('jwt_token')
    const {history} = this.props
    history.replace('/ebank/login')
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken === undefined) {
      return <Redirect to="/ebank/login" />
    }

    return (
      <div className="bg-container">
        <nav className="nav">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ebank-logo-img.png"
            alt="website logo"
          />
          <button
            onClick={this.logoutBtnClicked}
            type="button"
            className="button-logout"
          >
            Logout
          </button>
        </nav>
        <div className="card-head-container">
          <h1 className="head-text">Your flexibility, Our Excellence</h1>
          <img
            className="card-img"
            src="https://assets.ccbp.in/frontend/react-js/ebank-digital-card-img.png"
            alt="digital card"
          />
        </div>
      </div>
    )
  }
}
export default Home
