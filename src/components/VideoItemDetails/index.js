import {Component} from 'react'
import ReactPlayer from 'react-player'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {BsDot} from 'react-icons/bs'
import {AiOutlineLike, AiOutlineDislike} from 'react-icons/ai'
import {BiListPlus} from 'react-icons/bi'

import NxtwatchContext from '../../Context/NxtwatchContext'

import {formatDistanceToNow} from 'date-fns'

import './index.css'

import Header from '../Header'
import NavigationCard from '../NavigationCard'

const apiStatusContants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  in_progress: 'INPROGRESS',
}

class VideoItemDetails extends Component {
  state = {
    videoData: {},
    apiStatus: apiStatusContants.initial,
    isLiked: false,
    isDisliked: false,
  }

  componentDidMount() {
    this.getvideoItemDetail()
  }

  getvideoItemDetail = async () => {
    this.setState({apiStatus: apiStatusContants.in_progress})

    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')

    const url = `https://apis.ccbp.in/videos/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)

    if (response.ok === true) {
      const data = await response.json()
      const updatedData = {
        id: data.video_details.id,
        description: data.video_details.description,
        publishedAt: data.video_details.published_at,
        thumbnailUrl: data.video_details.thumbnail_url,
        title: data.video_details.title,
        videoUrl: data.video_details.video_url,
        viewCount: data.video_details.view_count,
        name: data.video_details.channel.name,
        profileImageUrl: data.video_details.channel.profile_image_url,
        subscriberCount: data.video_details.channel.subscriber_count,
      }
      this.setState({
        videoData: updatedData,
        apiStatus: apiStatusContants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusContants.failure})
    }
  }
  renderVideoView = () => (
    <NxtwatchContext.Consumer>
      {value => {
        const {addSavedVideo, savedVideos} = value
        const {videoData, isLiked, isDisliked} = this.state
        const {
          description,
          publishedAt,
          title,
          videoUrl,
          viewCount,
          name,
          profileImageUrl,
          subscriberCount,
        } = videoData
        const year = formatDistanceToNow(new Date(publishedAt))
        const exactYear = year.split(' ')
        const resultYear = exactYear[1]

        const onClickSaveVideo = () => addSavedVideo({...videoData})

        let videoIsSavedStatus
        const index = savedVideos.findIndex(
          eachVideo => eachVideo.id === videoData.id,
        )
        if (index === -1) {
          videoIsSavedStatus = false
        } else {
          videoIsSavedStatus = true
        }

        const onclickLiked = () =>
          this.setState(prevState => ({
            isLiked: !prevState.isLiked,
            isDisliked: false,
          }))
        const onclickDisliked = () => {
          this.setState(prevState => ({
            isDisliked: !prevState.isDisliked,
            isLiked: false,
          }))
        }

        const saveBtnStatus = videoIsSavedStatus
          ? 'active-save-button'
          : 'save-button'
        const saveTextStatus = videoIsSavedStatus ? 'Saved' : 'Save'
        const likeBtnStatus = isLiked ? 'active-button' : 'button'
        const disLikeBtnStatus = isDisliked ? 'active-button' : 'button'
        return (
          <>
            <ReactPlayer url={videoUrl} controls width="100%" />
            <p className="video-title">{title}</p>
            <div className="video-views-like-save-container">
              <div className="video-view-year-container">
                <p className="video-view-text-data">{viewCount}</p>
                <p className="video-view-text">views</p>
                <p className="video-dot">
                  <BsDot />
                </p>
                <p className="video-view-text-data">{resultYear}</p>
                <p className="video-view-text">years ago</p>
              </div>
              <div className="button-container">
                <button
                  type="button"
                  className={likeBtnStatus}
                  onClick={onclickLiked}
                >
                  <AiOutlineLike size={30} />
                  <span className="span-text">Like</span>
                </button>

                <button
                  type="button"
                  className={disLikeBtnStatus}
                  onClick={onclickDisliked}
                >
                  <AiOutlineDislike size={30} />
                  <span className="span-text">Dislike</span>
                </button>

                <button
                  type="button"
                  className={saveBtnStatus}
                  onClick={onClickSaveVideo}
                >
                  <BiListPlus size={30} />
                  <span className="span-text">{saveTextStatus}</span>
                </button>
              </div>
            </div>
            <hr className="horizontal-line" />
            <div className="description-profile-container">
              <img
                src={profileImageUrl}
                alt="channel logo"
                className="profile-logo"
              />
              <div className="description-container">
                <p className="video-name">{name}</p>
                <p className="video-subscriber-text">
                  {subscriberCount} subscriber
                </p>
                <p className="video-description">{description}</p>
              </div>
            </div>
          </>
        )
      }}
    </NxtwatchContext.Consumer>
  )

  renderVideofailure = () => (
    <div className="video-failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
        className="video-failure-img"
        alt="failure view"
      />
      <h1 className="video-failure-heading">Oops! Something Went Wrong</h1>
      <p className="video-failure-para">
        We are having some trouble to complete your request. Please try again.
        <br />
        Please try again.
      </p>
      <button type="button" className="video-retry-btn">
        Retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderVideoHomePage = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusContants.success:
        return this.renderVideoView()
      case apiStatusContants.failure:
        return this.renderVideofailure()
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
        <div className="Video-item-details-container">
          <NavigationCard />
          <div className="Video-playing-container">
            {this.renderVideoHomePage()}
          </div>
        </div>
      </>
    )
  }
}

export default VideoItemDetails
