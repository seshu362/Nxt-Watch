import {Component} from 'react'
import Cookies from 'js-cookie'
import {SiYoutubegaming} from 'react-icons/si'
import Loader from 'react-loader-spinner'

import './index.css'

import Header from '../Header'
import NavigationCard from '../NavigationCard'
import GamingVideos from '../GamingVideos'

const apiStatusContants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  in_progress: 'INPROGRESS',
}

class Gaming extends Component {
  state = {
    gamingVideosList: [],
    apiStatus: apiStatusContants.success,
  }

  componentDidMount() {
    this.getGameVideos()
  }

  getGameVideos = async () => {
    this.setState({apiStatus: apiStatusContants.in_progress})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/videos/gaming'
    const options = {
      headers: {Authorization: `Bearer ${jwtToken}`},
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.videos.map(eachGame => ({
        id: eachGame.id,
        thumbnailUrl: eachGame.thumbnail_url,
        title: eachGame.title,
        viewCount: eachGame.view_count,
      }))
      this.setState({
        gamingVideosList: updatedData,
        apiStatus: apiStatusContants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusContants.failure})
    }
  }

  renderGameVideosView = () => {
    const {gamingVideosList} = this.state
    return (
      <ul className="game-video-container">
        {gamingVideosList.map(eachGame => (
          <GamingVideos eachGameDetails={eachGame} key={eachGame.id} />
        ))}
      </ul>
    )
  }

  renderGamefailure = () => (
    <div className="trending-failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
        className="failure-img"
        alt="failure view"
      />
      <h1 className="failure-heading">Opps! Something Went Wrong</h1>
      <p className="failure-para">
        We are having some trouble to complete your request.
        <br />
        Please try again.
      </p>
      <button type="button" className="retry-btn">
        Retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderGamePage = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusContants.success:
        return this.renderGameVideosView()
      case apiStatusContants.failure:
        return this.renderGamefailure()
      case apiStatusContants.in_progress:
        return this.renderLoadingView()
      default:
        return null
    }
  }
  render() {
    return (
      <>
        <Header />
        <div className="game-item-details-container">
          <NavigationCard />
          <div className="game-playing-container" data-testid="gaming">
            <div className="game-icon-container">
              <div className="game-logo-container ">
                <SiYoutubegaming size={30} color="#ff0000" />
              </div>
              <h1 className="game-text">Gaming</h1>
            </div>
            {this.renderGamePage()}
          </div>
        </div>
      </>
    )
  }
}

export default Gaming
