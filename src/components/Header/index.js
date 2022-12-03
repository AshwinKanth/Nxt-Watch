import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Popup from 'reactjs-popup'
import {BsMoon, BsBrightnessHigh} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'

import ThemeContext from '../../Context/ThemeContext'

import './index.css'

const Header = props => (
  <ThemeContext.Consumer>
    {value => {
      const {isDarkTheme, toggleTheme} = value

      const onClickChangeTheme = () => {
        toggleTheme()
      }

      const onClickLogout = () => {
        Cookies.remove('jwt_token')
        const {history} = props
        history.replace('/login')
      }

      const bgColor = isDarkTheme ? 'dark' : 'light'
      const color = isDarkTheme ? '#ffffff' : '#00306e'

      const headerNxtWatchLogo = isDarkTheme
        ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
        : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'

      return (
        <nav className={`navbar-container ${bgColor}`}>
          <div className="navbar-responsive-container">
            <Link className="website-logo" to="/">
              <img
                src={headerNxtWatchLogo}
                alt="website logo"
                className="website-logo"
              />
            </Link>
            <div className="navItems-container">
              <button
                data-testid="theme"
                className="themeButton"
                type="button"
                onClick={onClickChangeTheme}
              >
                {isDarkTheme ? (
                  <BsBrightnessHigh color="#ffffff" size={30} />
                ) : (
                  <BsMoon size={30} />
                )}
              </button>
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                alt="profile"
                className="profile-img"
              />
              <Popup
                modal
                trigger={
                  <button className="logout-button" type="button">
                    Logout
                  </button>
                }
                className="popup-content"
              >
                {close => (
                  <div className="modal-container">
                    <p className="warning-text">
                      Are you sure, you want to logout?
                    </p>
                    <button
                      className="cancel-button"
                      type="button"
                      onClick={() => close()}
                    >
                      Cancel
                    </button>
                    <button
                      className="conform-button"
                      type="button"
                      onClick={onClickLogout}
                    >
                      Conform
                    </button>
                  </div>
                )}
              </Popup>
              <Popup
                modal
                trigger={
                  <button type="button" className="logOutIcon">
                    <FiLogOut size={25} color={color} />
                  </button>
                }
                className="popup-content"
              >
                {close => (
                  <div className="modal-container">
                    <p className="warning-text">
                      Are you sure, you want to logout?
                    </p>
                    <button
                      className="cancel-button"
                      type="button"
                      onClick={() => close()}
                    >
                      Cancel
                    </button>
                    <button
                      className="conform-button"
                      type="button"
                      onClick={onClickLogout}
                    >
                      Confirm
                    </button>
                  </div>
                )}
              </Popup>
            </div>
          </div>
        </nav>
      )
    }}
  </ThemeContext.Consumer>
)
export default withRouter(Header)
