import {Component} from 'react'
import Cookies from 'js-cookie'
import {HiFire} from 'react-icons/hi'
import Loader from 'react-loader-spinner'

import './index.css'

import Header from '../Header'
import NavigationCard from '../NavigationCard'
import TrendingVideos from '../TrendingVideos'

const apiStatusContants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  in_progress: 'INPROGRESS',
}

class Trending extends Component {
  state = {
    trendingVideosList: [],
    apiStatus: apiStatusContants.success,
  }

  componentDidMount() {
    this.getTrendingVideos()
  }

  getTrendingVideos = async () => {
    this.setState({apiStatus: apiStatusContants.in_progress})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/videos/trending'
    const options = {
      headers: {Authorization: `Bearer ${jwtToken}`},
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedTrendingData = data.videos.map(eachVideo => ({
        id: eachVideo.id,
        title: eachVideo.title,
        publishedAt: eachVideo.published_at,
        thumbnailUrl: eachVideo.thumbnail_url,
        viewCount: eachVideo.view_count,
        name: eachVideo.channel.name,
        profileImageUrl: eachVideo.channel.profile_image_url,
      }))

      this.setState({
        trendingVideosList: updatedTrendingData,
        apiStatus: apiStatusContants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusContants.failure})
    }
  }

  renderTrendingVideosView = () => {
    const {trendingVideosList} = this.state
    return (
      <ul className="trending-video-container">
        {trendingVideosList.map(eachTrendingVideo => (
          <TrendingVideos
            TrendingVideosDetails={eachTrendingVideo}
            key={eachTrendingVideo.id}
          />
        ))}
      </ul>
    )
  }

  renderTrendingfailure = () => (
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

  renderTrendingPage = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusContants.success:
        return this.renderTrendingVideosView()
      case apiStatusContants.failure:
        return this.renderTrendingfailure()
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
        <div className="trending-item-details-container">
          <NavigationCard />
          <div className="trending-playing-container" data-testid="trending">
            <div className="trending-icon-container">
              <div className="logo-container">
                <HiFire size={30} color="#ff0000" />
              </div>
              <h1 className="trending-text">Trending</h1>
            </div>
            {this.renderTrendingPage()}
          </div>
        </div>
      </>
    )
  }
}

export default Trending
