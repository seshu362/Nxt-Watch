import React from 'react'

const NxtwatchContext = React.createContext({
  savedVideos: [],
  addSavedVideo: () => {},
  activeTab: 'Home',
  changeActiveTab: () => {},
  changeThemeMode: () => {},
})

export default NxtwatchContext
