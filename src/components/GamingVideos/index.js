import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {HiFire} from 'react-icons/hi'
import GamingVideosCardDetails from '../GamingVideosCardDetails'

import Header from '../Header'
import SideNavbar from '../SideNavbar'
import './index.css'
import ThemeContext from '../../Context/ThemeContext'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'INPROGRESS',
  failure: 'FAILURE',
}

class GamingVideos extends Component {
  state = {gamingVideos: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getGamingVideos()
  }

  getGamingVideos = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const gamingUrl = 'https://apis.ccbp.in/videos/gaming'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(gamingUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const updatedData = data.videos.map(eachItem => ({
        id: eachItem.id,
        title: eachItem.title,
        thumbnailUrl: eachItem.thumbnail_url,
        viewCount: eachItem.view_count,
      }))
      this.setState({
        gamingVideos: updatedData,
        apiStatus: apiStatusConstants.success,
      })
      console.log(updatedData)
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderGamingVideos = () => {
    const {gamingVideos} = this.state
    return (
      <ul className="gamingVideosList-container">
        {gamingVideos.map(eachGame => (
          <GamingVideosCardDetails videoDetails={eachGame} key={eachGame.id} />
        ))}
      </ul>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="Puff" color=" #3b82f6" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <ThemeContext.Consumer>
      {value => {
        const {isDarkTheme} = value
        const textColor = isDarkTheme ? 'colorWhite' : 'colorBlack'
        const fontColor = isDarkTheme ? 'fontBlack' : 'fontWhite'
        const failureImage = isDarkTheme
          ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'
          : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
        return (
          <div className="failure-container">
            <img
              src={failureImage}
              className="failure-image"
              alt="failure view"
            />
            <h1 className={textColor}>Oops! Something Went Wrong</h1>
            <p className={fontColor}>
              We are having some trouble to complete your request.Please try
              again
            </p>
            <button
              type="button"
              className="retryButton"
              onClick={this.onClickRetry}
            >
              Retry
            </button>
          </div>
        )
      }}
    </ThemeContext.Consumer>
  )

  onClickRetry = () => {
    this.getGamingVideos()
  }

  renderGamingVideosView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderGamingVideos()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDarkTheme} = value
          const gamingBgContainer = isDarkTheme ? 'bgDark' : 'bgLight'
          const textColor = isDarkTheme ? 'colorWhite' : 'colorBlack'

          return (
            <>
              <Header />
              <SideNavbar />
              <div
                className={`gamingVideos-container ${gamingBgContainer}`}
                data-testid="gaming"
              >
                <div className="gamingTitle">
                  <HiFire size={33} color="#ff0000" />
                  <h1 className={`gaming ${textColor}`}>Gaming</h1>
                </div>
                {this.renderGamingVideosView()}
              </div>
            </>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default GamingVideos
