import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import NxtwatchContext from '../../Context/NxtwatchContext'

import Popup from 'reactjs-popup'
import {BsMoon} from 'react-icons/bs'
import {FiSun} from 'react-icons/fi'
import './index.css'

const Header = props => (
  <NxtwatchContext.Consumer>
    {value => {
      const {changeThemeMode, isDrakTheme} = value
      const {history} = props
      console.log(isDrakTheme)

      const onClickChangeTheme = () => {
        changeThemeMode()
      }

      const onClickLogout = () => {
        Cookies.remove('jwt_token')
        history.replace('/login')
      }

      const darkTheme = isDrakTheme ? 'darkThemeBgColor' : 'null'
      const darkItemColor = isDrakTheme ? '#ffffff' : '#0f0f0f'
      const darkThemeButton = isDrakTheme ? 'dark-logout-btn' : 'null'

      return (
        <nav className={`header-container ${darkTheme}`}>
          <Link to="/">
            <img
              src={
                isDrakTheme
                  ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
                  : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
              }
              className="header-img-logo"
              alt="website logo"
            />
          </Link>
          <div className="profile-details-container">
            <button
              className="theme-btn"
              data-testid="theme"
              onClick={onClickChangeTheme}
              type="button"
            >
              {isDrakTheme ? (
                <FiSun size={25} color={darkItemColor} />
              ) : (
                <BsMoon size={25} color={darkItemColor} />
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
                <button
                  type="button"
                  className={`logout-btn ${darkThemeButton}`}
                >
                  Logout
                </button>
              }
            >
              {close => (
                <div className="popup-container">
                  <p className="popup-text">Are you sure, you want to logout</p>
                  <div>
                    <button
                      type="button"
                      className="cancel-btn"
                      onClick={() => close()}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="confirm-btn"
                      onClick={onClickLogout}
                    >
                      Confirm
                    </button>
                  </div>
                </div>
              )}
            </Popup>
          </div>
        </nav>
      )
    }}
  </NxtwatchContext.Consumer>
)
export default withRouter(Header)
