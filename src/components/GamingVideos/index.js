import {Link} from 'react-router-dom'
import './index.css'

const GamingVideos = props => {
  const {eachGameDetails} = props
  const {id, thumbnailUrl, title, viewCount} = eachGameDetails
  return (
    <>
      <Link to={`/videos/${id}`} className="game-link-decoration">
        <li className="game-list-item">
          <img src={thumbnailUrl} alt="video thumbnail" className="game-img" />
          <p className="game-title">{title}</p>
          <p className="game-views">{viewCount}</p>
        </li>
      </Link>
    </>
  )
}
export default GamingVideos
