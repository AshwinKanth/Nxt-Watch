import {Link} from 'react-router-dom'
import {formatDistanceToNow} from 'date-fns'
import ThemeContext from '../../Context/ThemeContext'
import './index.css'

const TrendingVideoCard = props => {
  const {video} = props
  const {title, thumbnailUrl, name, viewCount, publishedAt, id} = video

  return (
    <ThemeContext.Consumer>
      {value => {
        const {isDarkTheme} = value
        const textColor = isDarkTheme ? 'colorWhite' : 'colorBlack'
        const fontColor = isDarkTheme ? 'fontBlack' : 'fontWhite'

        const date = formatDistanceToNow(new Date(publishedAt))

        return (
          <Link to={`/videos/${id}`} className="trendingVideosLink">
            <li className="trendingListItem">
              <img
                src={thumbnailUrl}
                alt="video thumbnail"
                className="thumbnailImage"
              />
              <div className="trendingVideoDetails-container">
                <p className={`cardTitle ${textColor}`}>{title}</p>
                <p className={`name ${fontColor}`}>{name}</p>
                <div className="viewAndTime-container">
                  <p className={`viewsAndTime ${fontColor}`}>{viewCount}</p>
                  <p className={`time ${fontColor}`}>{date}</p>
                </div>
              </div>
            </li>
          </Link>
        )
      }}
    </ThemeContext.Consumer>
  )
}

export default TrendingVideoCard

//  {formatDistanceToNow(new Date(publishedAt))}
