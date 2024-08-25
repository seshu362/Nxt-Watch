import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'
import {MdClear} from 'react-icons/md'
import {AiOutlineSearch} from 'react-icons/ai'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import NavigationCard from '../NavigationCard'
import HomeVideos from '../HomeVideos'

const apiStatusContants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  in_progress: 'INPROGRESS',
}

class Home extends Component {
  state = {
    homeVideosList: [],
    isShowBanner: true,
    search: '',
    apiStatus: apiStatusContants.initial,
  }

  componentDidMount() {
    this.getHomeVideos()
  }

  getHomeVideos = async () => {
    this.setState({apiStatus: apiStatusContants.in_progress})
    const {search} = this.state
    const url = `https://apis.ccbp.in/videos/all?search=${search}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {Authorization: `Bearer ${jwtToken}`},
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.videos.map(eachVideo => ({
        id: eachVideo.id,
        title: eachVideo.title,
        publishedAt: eachVideo.published_at,
        thumbnailUrl: eachVideo.thumbnail_url,
        viewCount: eachVideo.view_count,
        name: eachVideo.channel.name,
        profileImageUrl: eachVideo.channel.profile_image_url,
      }))
      this.setState({
        homeVideosList: updatedData,
        apiStatus: apiStatusContants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusContants.failure})
    }
  }

  onClickRetryNosearch = () => {
    this.setState({search: ''}, this.getHomeVideos)
  }

  onClickRetrybutton = () => {
    this.getHomeVideos()
  }

  getSearchResults = () => {
    this.getHomeVideos()
  }

  renderHomePage = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusContants.success:
        return this.renderHomeVideosView()
      case apiStatusContants.failure:
        return this.renderHomefailure()
      case apiStatusContants.in_progress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  renderHomeVideosView = () => {
    const {homeVideosList} = this.state
    const homeVideosLength = homeVideosList.length

    return homeVideosLength > 0 ? (
      <ul className="video-container">
        {homeVideosList.map(eachVideo => (
          <HomeVideos videosDetails={eachVideo} key={eachVideo.id} />
        ))}
      </ul>
    ) : (
      <div className="no-search-video-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
          alt="no videos"
          className="no-search-image"
        />
        <h1 className="no-search-heading">No Search results found</h1>
        <p className="no-search-para">
          Try different key words or remove search filter
        </p>
        <button
          type="button"
          className="no-search-retry-btn"
          onClick={this.onClickRetryNosearch}
        >
          Retry
        </button>
      </div>
    )
  }

  renderHomefailure = () => (
    <div className="home-failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
        className="failure-img"
        alt="failure view"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-para">
        We are having some trouble to complete your request.
        <br />
        Please try again.
      </p>
      <button
        type="button"
        className="retry-btn"
        onClick={this.onClickRetrybutton}
      >
        Retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  onDeleteBanner = () => {
    this.setState({isShowBanner: false})
  }

  onChangeSearch = event => {
    this.setState({search: event.target.value}, this.getHomeVideos)
  }

  renderNxtWatchPremium = () => (
    <div className="banner-container" data-testid="banner">
      <div className="banner-left-container" data-testid="banner">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
          alt="nxt watch logo"
          className="banner-nxt-watch-logo"
        />
        <p className="banner-text">
          Buy Nxt Watch Premium prepaid plans with <br />
          UPI
        </p>
        <button type="button" className="get-it-btn">
          GET IT NOW
        </button>
      </div>
      <div className="banner-right-container">
        <button
          className="close-btn"
          type="button"
          onClick={this.onDeleteBanner}
          data-testid="close"
          aria-label="submitForm"
        >
          <MdClear color="#212121" size={30} />
        </button>
      </div>
    </div>
  )

  render() {
    const {isShowBanner, search} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }
    return (
      <>
        <Header />
        <div className="home-bg-container">
          <NavigationCard />
          <div data-testid="home" className="home-video-container">
            {isShowBanner ? this.renderNxtWatchPremium() : null}
            <div className="searchContainer">
              <input
                type="search"
                placeholder="Search"
                className="searchInput"
                value={search}
                onChange={this.onChangeSearch}
              />
              <button
                className="search-icon-button"
                type="button"
                data-testid="searchButton"
                onClick={this.getSearchResults}
                aria-label="submitForm"
              >
                <AiOutlineSearch size={25} color="#909090" />
              </button>
            </div>
            {this.renderHomePage()}
          </div>
        </div>
      </>
    )
  }
}

export default Home
