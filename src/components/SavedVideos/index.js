import NxtwatchContext from '../../Context/NxtwatchContext'
import Header from '../Header'
import NavigationCard from '../NavigationCard'
import SavedVideoList from '../SavedVideoList'

import {HiFire} from 'react-icons/hi'

import './index.css'

const SavedVideos = () => (
  <NxtwatchContext.Consumer>
    {value => {
      const {savedVideos} = value
      return (
        <>
          <Header />
          <div className="saveVideo-item-details-container">
            <NavigationCard />
            <div
              className="saveVideo-playing-container"
              data-testid="savedVideos"
            >
              <div className="saveVideo-icon-container">
                <div className="saveVideo-logo-container">
                  <HiFire size={30} color="#ff0000" />
                </div>
                <h1 className="saveVideo-text">Saved Videos</h1>
              </div>
              {savedVideos.length > 0 ? (
                <ul className="saveVideo-video-container">
                  {savedVideos.map(eachVideo => (
                    <SavedVideoList
                      key={eachVideo.id}
                      videoDetails={eachVideo}
                    />
                  ))}
                </ul>
              ) : (
                <div className="noVideo-video-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
                    alt="no saved videos"
                    className="noVideo-image"
                  />
                  <h1 className="noVideo-heading">No saved videos found</h1>
                  <p className="noVideo-para">
                    You can save your videos while watching them
                  </p>
                </div>
              )}
            </div>
          </div>
        </>
      )
    }}
  </NxtwatchContext.Consumer>
)

export default SavedVideos
