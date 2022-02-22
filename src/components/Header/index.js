import {BsBrightnessHigh} from 'react-icons/bs'
import {withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {FaMoon} from 'react-icons/fa'
import ThemeContext from '../../context/ThemeContext'
import './index.css'

const Header = props => (
  <ThemeContext.Consumer>
    {value => {
      const {isDark, changeTheme} = value
      const logoUrl = isDark
        ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
        : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'

      const onLogout = () => {
        const {history} = props
        Cookies.remove('jwt_token')
        history.replace('/login')
      }

      const onChangeTheme = () => {
        changeTheme()
      }
      const backgroundColor = isDark ? 'dark-back' : ''
      const color = isDark ? 'white' : ''
      const themeIcon = isDark ? (
        <BsBrightnessHigh className={`icons-header ${color}`} />
      ) : (
        <FaMoon className={`icons-header ${color}`} />
      )
      const logoutButton = isDark ? 'logout-button-dark' : 'logout-button-light'
      return (
        <nav className={`navbar-container ${backgroundColor}`}>
          <img className="header-logo" src={logoUrl} alt="website logo" />
          <div className="navbar-container">
            <button
              className="button"
              data-testid="theme"
              onClick={onChangeTheme}
              type="button"
            >
              {themeIcon}
            </button>
            <img
              className="profile-logo"
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
              alt="profile"
            />
            <button onClick={onLogout} className={logoutButton} type="button">
              Logout
            </button>
          </div>
        </nav>
      )
    }}
  </ThemeContext.Consumer>
)

export default withRouter(Header)
