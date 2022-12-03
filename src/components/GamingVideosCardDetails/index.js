import {Link} from 'react-router-dom'

import './index.css'

import ThemeContext from '../../Context/ThemeContext'

const GamingVideosCardDetails = props => {
  const {videoDetails} = props
  const {id, title, thumbnailUrl, viewCount} = videoDetails

  return (
    <ThemeContext.Consumer>
      {value => {
        const {isDarkTheme} = value
        const textColor = isDarkTheme ? 'colorWhite' : 'colorBlack'
        const fontColor = isDarkTheme ? 'fontBlack' : 'fontWhite'

        return (
          <Link to={`/videos/${id}`} className="gamingVideosLink">
            <li className="gamingListItem">
              <img
                src={thumbnailUrl}
                className="GamingThumbnailImage"
                alt="video thumbnail"
              />
              <p className={`GamingTitle ${textColor}`}>{title}</p>
              <p className={`views ${fontColor}`}>
                {viewCount} Watching Worldwide
              </p>
            </li>
          </Link>
        )
      }}
    </ThemeContext.Consumer>
  )
}

export default GamingVideosCardDetails
