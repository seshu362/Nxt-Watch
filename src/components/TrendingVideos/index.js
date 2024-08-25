import {Link} from 'react-router-dom'
import {BsDot} from 'react-icons/bs'
import {formatDistanceToNow} from 'date-fns'

import './index.css'

const TrendingVideos = props => {
  const {TrendingVideosDetails} = props
  const {id, title, publishedAt, thumbnailUrl, viewCount, name} =
    TrendingVideosDetails

  const year = formatDistanceToNow(new Date(publishedAt))
  const exactYear = year.split(' ')
  const resultYear = exactYear[1]
  return (
    <>
      <Link to={`/videos/${id}`} className="trending-link-decoration">
        <li className="trending-list-videos">
          <img
            src={thumbnailUrl}
            alt="video thumbnail"
            className="thumbnail-url-img"
          />
          <div className="trending-details-container">
            <p className="trending-title">{title}</p>
            <p className="trending-view-text">{name}</p>
            <div className="trending-view-year-container">
              <p className="trending-view-text-data">{viewCount}</p>
              <p className="trending-view-text">views</p>
              <p className="trending-dot">
                <BsDot />
              </p>
              <p className="trending-view-text-data">{resultYear}</p>
              <p className="trending-view-text">years ago</p>
            </div>
          </div>
        </li>
      </Link>
    </>
  )
}

export default TrendingVideos
