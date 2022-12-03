import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import ThemeContext from './Context/ThemeContext'
import LoginRoute from './components/LoginRoute'
import HomeRoute from './components/HomeRoute'
import VideoItemDetails from './components/VideoItemDetailsRoute'
import TrendingVideos from './components/TrendingVideos'
import GamingVideos from './components/GamingVideos'
import SavedVideos from './components/SavedVideos'
import ProtectedRoute from './components/ProtectedRoute'
import NotFoundRoute from './components/NotFoundRoute'

import './App.css'

class App extends Component {
  state = {isDarkTheme: false, savedVideos: [], activeTab: 'HOME'}

  toggleTheme = () => {
    this.setState(prevState => ({isDarkTheme: !prevState.isDarkTheme}))
  }

  activeTabItem = item => {
    this.setState({activeTab: item})
  }

  addSavedVideo = video => {
    const {savedVideos} = this.state
    this.setState({
      savedVideos: [...savedVideos, video],
    })
  }

  removeSavedVideo = id => {
    const {savedVideos} = this.state
    this.setState({
      savedVideos: savedVideos.filter(each => each.id !== id),
    })
  }

  render() {
    const {isDarkTheme, savedVideos, activeTab} = this.state
    return (
      <ThemeContext.Provider
        value={{
          isDarkTheme,
          savedVideos,
          toggleTheme: this.toggleTheme,
          addSavedVideo: this.addSavedVideo,
          removeSavedVideo: this.removeSavedVideo,
          activeTabItem: this.activeTabItem,
          activeTab,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginRoute} />
          <ProtectedRoute exact path="/" component={HomeRoute} />
          <ProtectedRoute
            exact
            path="/videos/:id"
            component={VideoItemDetails}
          />
          <ProtectedRoute exact path="/trending" component={TrendingVideos} />
          <ProtectedRoute exact path="/gaming" component={GamingVideos} />
          <ProtectedRoute exact path="/saved-videos" component={SavedVideos} />
          <Route path="/not-found" component={NotFoundRoute} />
          <Redirect to="/not-found" />
        </Switch>
      </ThemeContext.Provider>
    )
  }
}

export default App
