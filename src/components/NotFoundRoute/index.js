import Header from '../Header'
import SideNavbar from '../SideNavbar'

import './index.css'
import ThemeContext from '../../Context/ThemeContext'

const NotFoundRoute = () => (
  <ThemeContext.Consumer>
    {value => {
      const {isDarkTheme} = value

      const fontColor = isDarkTheme ? 'fontBlack' : 'fontWhite'
      const textColor = isDarkTheme ? 'colorWhite' : 'colorBlack'
      const bgColor = isDarkTheme ? 'bgDark' : 'bgLight'
      const notFoundImage = isDarkTheme
        ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png'
        : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-dark-theme-img.png'
      return (
        <>
          <Header />
          <SideNavbar />
          <div className={`notFound-container ${bgColor}`}>
            <img
              src={notFoundImage}
              alt="not found"
              className="notFound-image"
            />
            <h1 className={textColor}>Page Not Found</h1>
            <p className={`notFound-description ${fontColor}`}>
              we are sorry, the page you requested could not be found.
            </p>
          </div>
        </>
      )
    }}
  </ThemeContext.Consumer>
)

export default NotFoundRoute
