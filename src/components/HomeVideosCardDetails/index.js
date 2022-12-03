import {formatDistanceToNow} from 'date-fns'
import {Link} from 'react-router-dom'

import ThemeContext from '../../Context/ThemeContext'

import './index.css'

const HomeVideosCardDetails = props => {
  const {videos} = props
  const {
    id,
    title,
    thumbnailUrl,
    name,
    profileImageUrl,
    viewCount,
    publishedAt,
  } = videos

  return (
    <ThemeContext.Consumer>
      {value => {
        const {isDarkTheme} = value
        const textColor = isDarkTheme ? 'colorWhite' : 'colorBlack'
        const fontColor = isDarkTheme ? 'fontBlack' : 'fontWhite'
        return (
          <Link to={`/videos/${id}`} className="cardDetails">
            <li className="homeVideoCardDetails">
              <img
                src={thumbnailUrl}
                className="thumbnailImage"
                alt="video thumbnail"
              />
              <div className="video-details">
                <img
                  src={profileImageUrl}
                  className="profileImgUrl"
                  alt="channel logo"
                />
                <div className="details-section">
                  <p className={`title ${textColor}`}>{title}</p>
                  <div className="mobileView">
                    <p className={`name ${fontColor}`}>{name}</p>
                    <p className={`viewsAndTime ${fontColor}`}>
                      {`${viewCount} views`}
                      <span className="time">
                        {formatDistanceToNow(new Date(publishedAt))}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </li>
          </Link>
        )
      }}
    </ThemeContext.Consumer>
  )
}

export default HomeVideosCardDetails
