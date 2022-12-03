import {HiFire} from 'react-icons/hi'
import Header from '../Header'
import SideNavbar from '../SideNavbar'
import ThemeContext from '../../Context/ThemeContext'
import TrendingVideoCard from '../TrendingVideoCard'
import './index.css'

const renderSavedVideos = savedVideos => {
  if (savedVideos.length === 0) {
    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDarkTheme} = value
          const fontColor = isDarkTheme ? 'fontBlack' : 'fontWhite'
          const textColor = isDarkTheme ? 'colorWhite' : 'colorBlack'

          return (
            <div className="saved-container">
              <img
                alt="no saved videos"
                className="noSaved_image"
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
              />
              <h1 className={`saveHeading ${textColor}`}>
                No saved videos found
              </h1>
              <p className={`saveDescription ${fontColor}`}>
                Save your videos by clicking a button
              </p>
            </div>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
  return (
    <ThemeContext.Consumer>
      {value => {
        const {isDarkTheme} = value
        const textColor = isDarkTheme ? 'colorWhite' : 'colorBlack'
        return (
          <div className="savedList-container">
            <div className="saveHeading-container">
              <HiFire color="#ff0000" className="fireIcon" />
              <h1 className={`saveHeading ${textColor}`}>Saved Videos</h1>
            </div>

            {savedVideos.map(each => (
              <TrendingVideoCard video={each} key={each.id} />
            ))}
          </div>
        )
      }}
    </ThemeContext.Consumer>
  )
}

const SavedVideos = () => (
  <ThemeContext.Consumer>
    {value => {
      const {savedVideos, isDarkTheme} = value
      const bgColor = isDarkTheme ? 'bgDark' : 'bgLight'
      return (
        <div data-testid="savedVideos">
          <Header />
          <SideNavbar />
          <div className={`savedVideos-container ${bgColor}`}>
            {renderSavedVideos(savedVideos)}
          </div>
        </div>
      )
    }}
  </ThemeContext.Consumer>
)

export default SavedVideos
