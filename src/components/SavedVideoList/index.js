import './index.css'
import {Link} from 'react-router-dom'
import {BsDot} from 'react-icons/bs'
import {formatDistanceToNow} from 'date-fns'

const SavedVideoList = props => {
  const {videoDetails} = props
  const {
    id,
    name,
    publishedAt,
    thumbnailUrl,
    title,
    viewCount,
  } = videoDetails

  const year = formatDistanceToNow(new Date(publishedAt))
  const exactYear = year.split(' ')
  const resultYear = exactYear[1]

  return (
    <>
      <Link to={`/videos/${id}`} className="saved-video-link-decoration">
        <li className="saved-video-list-videos">
          <img
            src={thumbnailUrl}
            className="saved-video-thumbnail-url-img"
            alt="video thumbnail"
          />
          <div className="saved-video-details-container">
            <p className="saved-video-title">{title}</p>
            <p className="saved-video-view-text">{name}</p>
            <div className="saved-video-view-year-container">
              <p className="saved-video-view-text-data">{viewCount}</p>
              <p className="saved-video-view-text">views</p>
              <p className="saved-video-dot">
                <BsDot />
              </p>
              <p className="saved-video-view-text-data">{resultYear}</p>
              <p className="saved-video-view-text">years ago</p>
            </div>
          </div>
        </li>
      </Link>
    </>
  )
}

export default SavedVideoList
