import {Link} from 'react-router-dom'
import {IoMdHome} from 'react-icons/io'
import {HiFire} from 'react-icons/hi'
import {MdPlaylistAdd} from 'react-icons/md'

import ThemeContext from '../../context/ThemeContext'

import Header from '../Header'
import './index.css'

const Home = () => (
  <ThemeContext.Consumer>
    {value => {
      const {isDark} = value

      return (
        <>
          <Header />
          <div>
            <div className="left-container">
              <ul className="unordered-list">
                <Link className="link-style" to="/">
                  <li className="list-style">
                    <IoMdHome />
                    <p className="list-item">Home</p>
                  </li>
                </Link>
                <Link className="link-style" to="/trending">
                  <li className="list-style">
                    <HiFire />
                    <p className="list-item">Trending</p>
                  </li>
                </Link>
                <Link className="link-style" to="/gaming">
                  <li className="list-style">
                    <IoMdHome />
                    <p className="list-item">Gaming</p>
                  </li>
                </Link>
                <Link className="link-style" to="/saved-videos">
                  <li className="list-style">
                    <MdPlaylistAdd />
                    <p className="list-item">Saved Videos</p>
                  </li>
                </Link>
              </ul>
            </div>
          </div>
        </>
      )
    }}
  </ThemeContext.Consumer>
)

export default Home
