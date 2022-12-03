import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {AiOutlineClose, AiOutlineSearch} from 'react-icons/ai'

import Header from '../Header'
import Sidebar from '../SideNavbar'
import HomeVideos from '../HomeVideos'
import ThemeContext from '../../Context/ThemeContext'

import './index.css'

import {BannerContainer} from './styledComponents'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'INPROGRESS',
  failure: 'FAILURE',
}

class HomeRoute extends Component {
  state = {
    homeVideos: [],
    bannerDisplay: 'flex',
    userInput: '',
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getHomeVideos()
  }

  getHomeVideos = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {userInput} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/videos/all?search=${userInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const updatedData = data.videos.map(each => ({
        id: each.id,
        publishedAt: each.published_at,
        thumbnailUrl: each.thumbnail_url,
        title: each.title,
        viewCount: each.view_count,
        name: each.channel.name,
        profileImageUrl: each.channel.profile_image_url,
      }))
      this.setState({
        homeVideos: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderHomeVideos = () => (
    <ThemeContext.Consumer>
      {value => {
        const {isDarkTheme} = value
        const {homeVideos} = this.state
        const homeBgContainer = isDarkTheme ? 'bgDark' : 'bgLight'
        return homeVideos.length > 0 ? (
          <div className={`homeVideos-container ${homeBgContainer}`}>
            <HomeVideos homeVideos={homeVideos} />
          </div>
        ) : (
          this.renderSearchFailureView()
        )
      }}
    </ThemeContext.Consumer>
  )

  onCloseBanner = () => {
    this.setState({bannerDisplay: 'none'})
  }

  onChangeInput = event => {
    this.setState({userInput: event.target.value})
  }

  onClickSearchInput = () => {
    this.getHomeVideos()
  }

  onEnterKeydown = event => {
    if (event.key === 'Enter') {
      this.getHomeVideos()
    }
  }

  renderLoadingView = () => (
    <div className="homeLoader-container" data-testid="loader">
      <Loader type="Puff" color=" #3b82f6" height="50" width="50" />
    </div>
  )

  onClickRetry = () => {
    this.getHomeVideos()
  }

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

  renderSearchFailureView = () => (
    <ThemeContext.Consumer>
      {value => {
        const {isDarkTheme} = value
        const fontColor = isDarkTheme ? 'fontBlack' : 'fontWhite'
        const textColor = isDarkTheme ? 'colorWhite' : 'colorBlack'

        return (
          <div className="searchFailure-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
              className="searchFailure-img"
              alt="no videos"
            />
            <h1 className={`noSearch-heading ${textColor}`}>
              No Search results found
            </h1>
            <p className={fontColor}>
              Try different key words or remove search filter
            </p>
            <button
              className="retryButton"
              type="button"
              onClick={this.onClickRetry}
            >
              Retry
            </button>
          </div>
        )
      }}
    </ThemeContext.Consumer>
  )

  renderHomeVideosView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderHomeVideos()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    const {bannerDisplay, userInput} = this.state
    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDarkTheme} = value
          const display = bannerDisplay === 'flex' ? 'flex' : 'none'
          const searchBgContainer = isDarkTheme ? 'black' : 'white'
          const fontColor = isDarkTheme ? 'fontBlack' : 'fontWhite'
          const homeBgContainer = isDarkTheme ? 'bgDark' : 'bgLight'
          return (
            <>
              <Header />
              <Sidebar />
              <div className={`home-container ${homeBgContainer}`}>
                <BannerContainer
                  className="banner-container"
                  display={display}
                  data-testid="banner"
                >
                  <div className="bannerLeftPart">
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                      className="logo"
                      alt="nxt watch logo"
                    />
                    <p className="premium-description">
                      Buy Nxt Watch Premium prepaid plans with UPI
                    </p>
                    <button
                      className="GetNow-button"
                      type="button"
                      data-testid="close"
                    >
                      GET IT NOW
                    </button>
                  </div>
                  <div className="bannerRightPart">
                    <button
                      className="closeButton"
                      type="button"
                      onClick={this.onCloseBanner}
                    >
                      <AiOutlineClose size={25} />
                    </button>
                  </div>
                </BannerContainer>
                <div className={`search-container ${searchBgContainer}`}>
                  <input
                    type="search"
                    className={`input ${searchBgContainer}`}
                    placeholder="Search"
                    data-testid="searchButton"
                    value={userInput}
                    onChange={this.onChangeInput}
                    onKeyDown={this.onEnterKeydown}
                  />
                  <AiOutlineSearch
                    className={`searchIcon ${fontColor}`}
                    onClick={this.onClickSearchInput}
                  />
                </div>
                {this.renderHomeVideosView()}
              </div>
            </>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default HomeRoute
