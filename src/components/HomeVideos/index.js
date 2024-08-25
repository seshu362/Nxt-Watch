import {Link} from 'react-router-dom'

import './index.css'
import {BsDot} from 'react-icons/bs'
import {formatDistanceToNow} from 'date-fns'

const HomeVideos = props => {
  const {videosDetails} = props
  const {
    id,
    title,
    publishedAt,
    thumbnailUrl,
    viewCount,
    name,
    profileImageUrl,
  } = videosDetails

  const year = formatDistanceToNow(new Date(publishedAt))
  const exactYear = year.split(' ')
  const resultYear = exactYear[1]

  return (
    <Link to={`/videos/${id}`} className="list-link-video">
      <li>
        <img
          src={thumbnailUrl}
          alt="video thumbnail"
          className="thumbnail-img"
        />
        <div className="video-details-container">
          <img
            src={profileImageUrl}
            alt="channel logo"
            className="channel-logo"
          />
          <div className="video-text-container">
            <p className="title">{title}</p>
            <p className="name">{name}</p>
            <div className="view-year-container">
              <p className="view-text-data">{viewCount}</p>
              <p className="view-text">views</p>
              <p className="dot">
                <BsDot />
              </p>
              <p className="view-text-data">{resultYear}</p>
              <p className="view-text">years ago</p>
            </div>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default HomeVideos
