import HomeVideosCardDetails from '../HomeVideosCardDetails'

import './index.css'

const HomeVideos = props => {
  const {homeVideos} = props
  return (
    <ul className="homeVideosList-container">
      {homeVideos.map(eachVideo => (
        <HomeVideosCardDetails videos={eachVideo} key={eachVideo.id} />
      ))}
    </ul>
  )
}

export default HomeVideos
