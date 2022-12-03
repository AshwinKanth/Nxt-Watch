import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import ReactPlayer from 'react-player'

import {BiLike, BiDislike} from 'react-icons/bi'
import {MdPlaylistAdd} from 'react-icons/md'

import Header from '../Header'
import SideNavbar from '../SideNavbar'
import ThemeContext from '../../Context/ThemeContext'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'INPROGRESS',
  failure: 'FAILURE',
}

class VideoItemDetails extends Component {
  state = {
    videoDetails: [],
    like: false,
    disLike: false,
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getVideoDetails()
  }

  getVideoDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const apiUrl = `https://apis.ccbp.in/videos/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const updatedData = {
        id: data.video_details.id,
        thumbnailUrl: data.video_details.thumbnail_url,
        videoUrl: data.video_details.video_url,
        title: data.video_details.title,
        viewCount: data.video_details.view_count,
        publishedAt: data.video_details.published_at,
        description: data.video_details.description,
        name: data.video_details.channel.name,
        profileImageUrl: data.video_details.channel.profile_image_url,
        subscriberCount: data.video_details.channel.subscriber_count,
      }
      console.log(updatedData)
      this.setState({
        videoDetails: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
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
            <img src={failureImage} className="failure-image" alt="failure" />
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
    this.getTrendingVideos()
  }

  renderVideosView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderVideos()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  onClickLike = () => {
    this.setState(prevState => ({like: !prevState.like, disLike: false}))
  }

  onClickDislike = () => {
    this.setState(prevState => ({disLike: !prevState.disLike, like: false}))
  }

  renderVideos = () => {
    const {videoDetails, like, disLike} = this.state
    const {
      videoUrl,
      title,
      viewCount,
      publishedAt,
      profileImageUrl,
      name,
      subscriberCount,
      description,
    } = videoDetails
    return (
      <ThemeContext.Consumer>
        {value => {
          const {
            isDarkTheme,
            addSavedVideo,
            removeSavedVideo,
            savedVideos,
          } = value
          const fontColor = isDarkTheme ? 'fontBlack' : 'fontWhite'
          const videoBgContainer = isDarkTheme ? 'bgDark' : 'bgLight'
          const likeIconColor = like ? '#2563eb' : '#64748b'
          const disLikeIconColor = disLike ? '#2563eb' : '#64748b'
          const textColor = isDarkTheme ? 'colorWhite' : 'colorBlack'
          const hrBreak = isDarkTheme ? '#ffffff' : '#000000'

          const isVideoSaved = savedVideos.some(
            each => each.id === videoDetails.id,
          )

          const savedVideo = () => {
            addSavedVideo(videoDetails)
          }

          const removeVideo = () => {
            removeSavedVideo(videoDetails.id)
          }

          return (
            <div className={`videoBgContainer ${videoBgContainer}`}>
              <Header />
              <SideNavbar />
              <div className={`videosDetails-container ${videoBgContainer}`}>
                <div className="reactPlayer-container">
                  <ReactPlayer
                    url={videoUrl}
                    width="100%"
                    controls
                    className="playersm"
                  />
                  <ReactPlayer
                    url={videoUrl}
                    width="100%"
                    height="100%"
                    controls
                    className="playerlg"
                  />
                </div>
                <p className={`cardName ${fontColor}`}>{title}</p>
                <div className="viewsTime-bottom-container">
                  <div className="viewsTime-container">
                    <p className={`views ${fontColor}`}>{viewCount} views</p>
                    <p className={`views ${fontColor}`}>{publishedAt}</p>
                  </div>
                  <div className="likeDislikeSave-container">
                    <div className="like-container">
                      <button
                        className="custom-button"
                        type="button"
                        value={like}
                        onClick={this.onClickLike}
                      >
                        <BiLike size={21} color={likeIconColor} />
                        <p className={`likeTextContent ${textColor}`}>Like</p>
                      </button>
                    </div>
                    <div className="dislike-container">
                      <button
                        className="custom-button"
                        type="button"
                        value={disLike}
                        onClick={this.onClickDislike}
                      >
                        <BiDislike size={21} color={disLikeIconColor} />
                        <p className={`likeTextContent ${textColor}`}>
                          Dislike
                        </p>
                      </button>
                    </div>
                    <div className="save-container">
                      {isVideoSaved ? (
                        <button
                          onClick={removeVideo}
                          type="button"
                          className="savedButton"
                        >
                          <MdPlaylistAdd color={textColor} /> Saved
                        </button>
                      ) : (
                        <button
                          onClick={savedVideo}
                          type="button"
                          className="saveButton"
                        >
                          <MdPlaylistAdd color={textColor} /> Save
                        </button>
                      )}
                    </div>
                  </div>
                </div>
                <hr color={hrBreak} width="100%" />
                <div className="bottom-container">
                  <img
                    src={profileImageUrl}
                    alt="channel logo"
                    className="profileImgUrl"
                  />
                  <div className="channelSubscribersCount-container">
                    <p className={`cardName ${fontColor}`}>{name}</p>
                    <p className={`subscribers ${fontColor}`}>
                      {subscriberCount} subscribers
                    </p>
                    <p className={`card-description ${fontColor}`}>
                      {description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )
        }}
      </ThemeContext.Consumer>
    )
  }

  render() {
    return <>{this.renderVideosView()}</>
  }
}

export default VideoItemDetails
