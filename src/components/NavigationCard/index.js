import NxtwatchContext from '../../Context/NxtwatchContext'
import {Link} from 'react-router-dom'

import {AiFillHome} from 'react-icons/ai'
import {HiFire} from 'react-icons/hi'
import {SiYoutubegaming} from 'react-icons/si'
import {CgPlayListAdd} from 'react-icons/cg'

import './index.css'

const NavigationCard = () => (
  <NxtwatchContext.Consumer>
    {value => {
      const {changeActiveTab, activeTab} = value
      const onClickChangeHomeActiveTab = () => {
        changeActiveTab('Home')
      }
      const onClickChangeTrendingActiveTab = () => {
        changeActiveTab('Trending')
      }
      const onClickChangeGamingActiveTab = () => {
        changeActiveTab('Gaming')
      }
      const onClickChangeSavedVideoActiveTab = () => {
        changeActiveTab('SavedVideo')
      }

      const activeHomeBgColor =
        activeTab === 'Home' ? 'active-list-item' : 'list-item'
      const activeTrendingBgColor =
        activeTab === 'Trending' ? 'active-list-item' : 'list-item'
      const activeGamingBgColor =
        activeTab === 'Gaming' ? 'active-list-item' : 'list-item'
      const activeSavedVideoBgColor =
        activeTab === 'SavedVideo' ? 'active-list-item' : 'list-item'

      const activeHomeText =
        activeTab === 'Home'
          ? 'active-nav-route-name-text'
          : 'nav-route-name-text'
      const activeTrendingText =
        activeTab === 'Trending'
          ? 'active-nav-route-name-text'
          : 'nav-route-name-text'
      const activeGamingText =
        activeTab === 'Gaming'
          ? 'active-nav-route-name-text'
          : 'nav-route-name-text'
      const activeSavedVideoText =
        activeTab === 'SavedVideo'
          ? 'active-nav-route-name-text'
          : 'nav-route-name-text'

      const activeHomeIcon = activeTab === 'Home' ? '#ff0000' : '#909090'
      const activeTrendingIcon =
        activeTab === 'Trending' ? '#ff0000' : '#909090'
      const activeGamingIcon = activeTab === 'Gaming' ? '#ff0000' : '#909090'
      const activeSavedVideoIcon =
        activeTab === 'SavedVideo' ? '#ff0000' : '#909090'

      return (
        <nav className="card-items-container">
          <ul className="nav-route">
            <Link
              to="/"
              className="link-decoration"
              onClick={onClickChangeHomeActiveTab}
            >
              <li className={activeHomeBgColor}>
                <AiFillHome size={30} color={activeHomeIcon} />
                <p className={activeHomeText}>Home</p>
              </li>
            </Link>
            <Link
              to="/trending"
              className="link-decoration"
              onClick={onClickChangeTrendingActiveTab}
            >
              <li className={activeTrendingBgColor}>
                <HiFire size={30} color={activeTrendingIcon} />
                <p className={activeTrendingText}>Trending</p>
              </li>
            </Link>
            <Link
              to="/gaming"
              className="link-decoration"
              onClick={onClickChangeGamingActiveTab}
            >
              <li className={activeGamingBgColor}>
                <SiYoutubegaming size={30} color={activeGamingIcon} />
                <p className={activeGamingText}>Gaming</p>
              </li>
            </Link>
            <Link
              to="/saved-videos"
              className="link-decoration"
              onClick={onClickChangeSavedVideoActiveTab}
            >
              <li className={activeSavedVideoBgColor}>
                <CgPlayListAdd size={30} color={activeSavedVideoIcon} />
                <p className={activeSavedVideoText}>Saved Videos</p>
              </li>
            </Link>
          </ul>
          <div className="contacts-info-container">
            <p className="contacts-heading">CONTACT US</p>
            <div className="contacts-logo-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                alt="facebook logo"
                className="contact-logos"
              />
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
                alt="twitter logo"
                className="contact-logos"
              />
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                alt="linked in logo"
                className="contact-logos"
              />
            </div>
            <p className="contacts-para">
              Enjoy! Now to see your <br />
              channels and <br />
              recommendations!
            </p>
          </div>
        </nav>
      )
    }}
  </NxtwatchContext.Consumer>
)
export default NavigationCard
