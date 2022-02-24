import {Component} from 'react'
import {Switch, Route} from 'react-router-dom'
import ThemeContext from './context/ThemeContext'

import Login from './components/Login'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './components/Home'
import Trending from './components/Trending'
import Gaming from './components/Gaming'
import SavedVideos from './components/SavedVideos'
import VideoItemDetail from './components/VideoItemDetail'
import './App.css'

// Replace your code here
class App extends Component {
  state = {isDark: false, savedVideosList: []}

  changeTheme = () => {
    this.setState(prevState => ({isDark: !prevState.isDark}))
  }

  addToSaveVideos = videoDetail => {
    this.setState(prevState => ({
      savedVideosList: [...prevState.savedVideosList, videoDetail],
    }))
  }

  render() {
    const {isDark, savedVideosList} = this.state
    console.log(savedVideosList)

    return (
      <ThemeContext.Provider
        value={{
          isDark,
          changeTheme: this.changeTheme,
          savedVideosList,
          addToSaveVideos: this.addToSaveVideos,
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
            component={VideoItemDetail}
          />
        </Switch>
      </ThemeContext.Provider>
    )
  }
}

export default App
