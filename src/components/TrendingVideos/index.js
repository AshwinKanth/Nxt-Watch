// import {Component} from 'react'
// import Cookies from 'js-cookie'
// import Loader from 'react-loader-spinner'

// import {HiFire} from 'react-icons/hi'

// import Header from '../Header'
// import SideNavbar from '../SideNavbar'
// import ThemeContext from '../../Context/ThemeContext'
// import TrendingVideoCard from '../TrendingVideoCard'

// import {
//   TrendingContainer,
//   TitleIconContainer,
//   TrendingVideoTitle,
//   TrendingVideoList,
//   TrendingText,
//   LoaderContainer,
// } from './StyledComponents'

// const apiStatusConstants = {
//   initial: 'INITIAL',
//   success: 'SUCCESS',
//   failure: 'FAILURE',
//   inProgress: 'IN_PROGRESS',
// }

// class TrendingVideos extends Component {
//   state = {
//     trendingVideos: [],
//     apiStatus: apiStatusConstants.initial,
//   }

//   componentDidMount() {
//     this.getVideos()
//   }

//   getVideos = async () => {
//     this.setState({apiStatus: apiStatusConstants.inProgress})
//     const jwtToken = Cookies.get('jwt_token')
//     const url = `https://apis.ccbp.in/videos/trending`
//     const options = {
//       headers: {
//         Authorization: `Bearer ${jwtToken}`,
//       },
//       method: 'GET',
//     }
//     const response = await fetch(url, options)
//     if (response.ok) {
//       const data = await response.json()
//       const updatedData = data.videos.map(eachVideo => ({
//         id: eachVideo.id,
//         title: eachVideo.title,
//         thumbnailUrl: eachVideo.thumbnail_url,
//         viewCount: eachVideo.view_count,
//         publishedAt: eachVideo.published_at,
//         name: eachVideo.channel.name,
//         profileImageUrl: eachVideo.channel.profile_image_url,
//       }))
//       this.setState({
//         trendingVideos: updatedData,
//         apiStatus: apiStatusConstants.success,
//       })
//     } else {
//       this.setState({apiStatus: apiStatusConstants.failure})
//     }
//   }

//   renderLoadingView = () => (
//     <LoaderContainer data-testid="loader">
//       <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
//     </LoaderContainer>
//   )

//   renderVideosView = () => {
//     const {trendingVideos} = this.state
//     return (
//       <TrendingVideoList>
//         {trendingVideos.map(eachVideo => (
//           <TrendingVideoCard key={eachVideo.id} videoDetails={eachVideo} />
//         ))}
//       </TrendingVideoList>
//     )
//   }

//   onRetry = () => {
//     this.getVideos()
//   }

//   renderTrendingVideos = () => {
//     const {apiStatus} = this.state

//     switch (apiStatus) {
//       case apiStatusConstants.success:
//         return this.renderVideosView()
//       case apiStatusConstants.failure:
//         return this.renderFailureView()
//       case apiStatusConstants.inProgress:
//         return this.renderLoadingView()
//       default:
//         return null
//     }
//   }

//   render() {
//     return (
//       <ThemeContext.Consumer>
//         {value => {
//           const {isDarkTheme} = value

//           const bgColor = isDarkTheme ? '#0f0f0f' : '#f9f9f9'
//           const textColor = isDarkTheme ? '#f9f9f9' : '#231f20'

//           return (
//             <div data-testid="trending">
//               <Header />
//               <SideNavbar />
//               <TrendingContainer data-testid="trending" bgColor={bgColor}>
//                 <TrendingVideoTitle>
//                   <TitleIconContainer>
//                     <HiFire size={35} color="#ff0000" />
//                   </TitleIconContainer>
//                   <TrendingText color={textColor}>Trending</TrendingText>
//                 </TrendingVideoTitle>
//                 {this.renderTrendingVideos()}
//               </TrendingContainer>
//             </div>
//           )
//         }}
//       </ThemeContext.Consumer>
//     )
//   }
// }

// export default TrendingVideos

import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {HiFire} from 'react-icons/hi'
import TrendingVideoCard from '../TrendingVideoCard'

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

class TrendingVideos extends Component {
  state = {trendingVideos: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getTrendingVideos()
  }

  getTrendingVideos = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const trendingUrl = `https://apis.ccbp.in/videos/trending`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(trendingUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const updatedData = data.videos.map(eachVideo => ({
        id: eachVideo.id,
        title: eachVideo.title,
        thumbnailUrl: eachVideo.thumbnail_url,
        name: eachVideo.channel.name,
        viewCount: eachVideo.view_count,
        publishedAt: eachVideo.published_at,
      }))
      this.setState({
        trendingVideos: updatedData,
        apiStatus: apiStatusConstants.success,
      })
      console.log(updatedData)
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
    this.getTrendingVideos()
  }

  renderTrendingVideos = () => {
    const {trendingVideos} = this.state
    return (
      <ul className="trendingVideosList-container">
        {trendingVideos.map(eachItem => (
          <TrendingVideoCard video={eachItem} key={eachItem.id} />
        ))}
      </ul>
    )
  }

  renderTrendingVideosView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderTrendingVideos()
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
          const trendingBgContainer = isDarkTheme ? 'bgDark' : 'bgLight'
          const textColor = isDarkTheme ? 'colorWhite' : 'colorBlack'
          return (
            <>
              <Header />
              <SideNavbar />
              <div
                className={`trendingVideos-container ${trendingBgContainer}`}
              >
                <div className="trendingTitle">
                  <HiFire size={33} color="#ff0000" />
                  <h1 className={`trending ${textColor}`}>Trending</h1>
                </div>
                {this.renderTrendingVideosView()}
              </div>
            </>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default TrendingVideos
