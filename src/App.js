import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import './App.css'
import NxtwatchContext from './Context/NxtwatchContext'

import ProtectedRoute from './components/ProtectedRoute'
import Login from './components/Login'
import Home from './components/Home'
import Trending from './components/Trending'
import Gaming from './components/Gaming'
import SavedVideos from './components/SavedVideos'
import VideoItemDetails from './components/VideoItemDetails'
import NotFound from './components/NotFound'

// Replace your code here
class App extends Component {
  state = {
    savedVideos: [],
    activeTab: 'Home',
    isDrakTheme: false,
  }
  addSavedVideo = video => {
    const {savedVideos} = this.state
    const index = savedVideos.findIndex(eachVideo => eachVideo.id === video.id)
    if (index === -1) {
      this.setState({savedVideos: [...savedVideos, video]})
    } else {
      savedVideos.splice(index, 1)
      this.setState({savedVideos})
    }
  }

  changeActiveTab = activeTab => {
    this.setState({activeTab: activeTab})
  }
  changeThemeMode = () => {
    this.setState(prevState => ({isDrakTheme: !prevState.isDrakTheme}))
  }

  render() {
    const {savedVideos, activeTab, isDrakTheme} = this.state
    return (
      <NxtwatchContext.Provider
        value={{
          savedVideos,
          addSavedVideo: this.addSavedVideo,
          removeSavedVideo: this.removeSavedVideo,
          changeActiveTab: this.changeActiveTab,
          activeTab,
          changeThemeMode: this.changeThemeMode,
          isDrakTheme,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/trending" component={Trending} />
          <ProtectedRoute exact path="/gaming" component={Gaming} />
          <ProtectedRoute exact path="/saved-videos" component={SavedVideos} />
          <ProtectedRoute
            exact
            path="/videos/:id"
            component={VideoItemDetails}
          />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </NxtwatchContext.Provider>
    )
  }
}

export default App
