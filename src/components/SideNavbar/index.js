import {Component} from 'react'
import {Link} from 'react-router-dom'

import {AiFillHome} from 'react-icons/ai'
import {HiFire} from 'react-icons/hi'
import {SiYoutubegaming} from 'react-icons/si'
import {CgPlayListAdd} from 'react-icons/cg'

import ThemeContext from '../../Context/ThemeContext'

import {
  TextItemContainer,
  ItemText,
  BottomText,
  NavLink,
} from './StyledComponents'

import './index.css'

class SideNavbar extends Component {
  render() {
    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDarkTheme, activeTabItem, activeTab} = value
          const navBgColor = isDarkTheme ? 'textBlack' : 'textWhite'
          const text = isDarkTheme ? '#181818' : '#f9f9f9'
          const textColor = isDarkTheme ? '#f9f9f9' : '#0f0f0f'

          const onClickHomeTabItem = () => {
            activeTabItem('HOME')
          }
          const onClickTrendingTabItem = () => {
            activeTabItem('TRENDING')
          }

          const onClickGamingTabItem = () => {
            activeTabItem('GAMING')
          }

          const onClickSavedVideosTabItem = () => {
            activeTabItem('SAVED VIDEOS')
          }

          const bgColor = isDarkTheme ? '#ffffff' : '#000000'

          return (
            <nav className="sideNavbar-container">
              <div className={`sideNavItemsLg-container ${navBgColor}`}>
                <ul className="sideNavItems-container">
                  <TextItemContainer
                    isActive={activeTab === 'HOME' ? '#cbd5e1' : 'transparent'}
                    isActiveColor={bgColor}
                    onClick={onClickHomeTabItem}
                  >
                    <NavLink
                      to="/"
                      color={activeTab === 'HOME' ? ' #ff0000' : {bgColor}}
                    >
                      <AiFillHome size={25} />
                      <ItemText
                        color={activeTab === 'HOME' ? ' #0f0f0f' : {textColor}}
                      >
                        Home
                      </ItemText>
                    </NavLink>
                  </TextItemContainer>
                  <TextItemContainer
                    isActive={
                      activeTab === 'TRENDING' ? '#cbd5e1' : 'transparent'
                    }
                    onClick={onClickTrendingTabItem}
                  >
                    <NavLink
                      to="/trending"
                      color={activeTab === 'TRENDING' ? '#ff0000' : {textColor}}
                    >
                      <HiFire size={25} />
                      <ItemText
                        color={activeTab === 'TRENDING' ? '#0f0f0f' : {bgColor}}
                      >
                        Trending
                      </ItemText>
                    </NavLink>
                  </TextItemContainer>
                  <TextItemContainer
                    isActive={
                      activeTab === 'GAMING' ? '#cbd5e1' : 'transparent'
                    }
                    onClick={onClickGamingTabItem}
                  >
                    <NavLink
                      to="/gaming"
                      color={activeTab === 'GAMING' ? '#ff0000' : {textColor}}
                    >
                      <SiYoutubegaming size={25} />
                      <ItemText
                        color={activeTab === 'GAMING' ? '#0f0f0f' : {bgColor}}
                      >
                        Gaming
                      </ItemText>
                    </NavLink>
                  </TextItemContainer>
                  <TextItemContainer
                    isActive={
                      activeTab === 'SAVED VIDEOS' ? '#cbd5e1' : 'transparent'
                    }
                    onClick={onClickSavedVideosTabItem}
                  >
                    <NavLink
                      to="/saved-videos"
                      color={
                        activeTab === 'SAVED VIDEOS' ? '#ff0000' : {textColor}
                      }
                    >
                      <CgPlayListAdd size={25} />
                      <ItemText
                        color={
                          activeTab === 'SAVED VIDEOS' ? '#0f0f0f' : {bgColor}
                        }
                      >
                        Saved videos
                      </ItemText>
                    </NavLink>
                  </TextItemContainer>
                </ul>
                <div className="contact-info-container">
                  <BottomText color={textColor}>CONTACT US</BottomText>
                  <div className="logs-container">
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                      alt="facebook logo"
                      className="contact-logos"
                    />
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
                      alt="twitter logo"
                      className="contact-logos"
                    />
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                      alt="linked in logo"
                      className="contact-logos"
                    />
                  </div>
                  <p className={`contact ${text}`}>
                    Enjoy! Now to see your channels and recommendations!
                  </p>
                </div>
              </div>
              <div className="navbarMobileView-container">
                <Link to="/">
                  <li className="nav-item">
                    {isDarkTheme ? (
                      <AiFillHome color="#616e7c" size={30} />
                    ) : (
                      <AiFillHome color="#ff0000" size={30} />
                    )}
                  </li>
                </Link>
                <Link to="/trending">
                  <li className="nav-item">
                    {isDarkTheme ? (
                      <HiFire color="#616e7c" size={30} />
                    ) : (
                      <HiFire color="#ff0000" size={30} />
                    )}
                  </li>
                </Link>
                <Link to="/gaming">
                  <li className="nav-item">
                    {isDarkTheme ? (
                      <SiYoutubegaming color="#616e7c" size={30} />
                    ) : (
                      <SiYoutubegaming color="#ff0000" size={30} />
                    )}
                  </li>
                </Link>
                <Link to="/saved-videos">
                  <li className="nav-item">
                    {isDarkTheme ? (
                      <CgPlayListAdd color="#616e7c" size={30} />
                    ) : (
                      <CgPlayListAdd color="#ff0000" size={30} />
                    )}
                  </li>
                </Link>
              </div>
            </nav>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default SideNavbar
