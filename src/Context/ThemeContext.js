import React from 'react'

const ThemeContext = React.createContext({
  isDarkTheme: false,
  toggleTheme: () => {},
  savedVideos: [],
  addSavedVideo: () => {},
  removeSavedVideo: () => {},
  activeTabItem: () => {},
  activeTab: '',
})

export default ThemeContext
