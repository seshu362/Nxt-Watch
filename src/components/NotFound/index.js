import Header from '../Header'
import NavigationCard from '../NavigationCard'

import './index.css'

const NotFound = () => (
  <>
    <Header />
    <div className="notFound-bg-container">
      <NavigationCard />
      <div className="notFound-video-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png"
          alt="not found"
          className="notFound-image"
        />
        <h1 className="notFound-heading">Page Not Found</h1>
        <p className="notFound-para">
          we are sorry, the page you requested could not be found.
        </p>
      </div>
    </div>
  </>
)

export default NotFound
