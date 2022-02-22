import {Link} from 'react-router-dom'
import {IoMdHome} from 'react-icons/io'
import {HiFire} from 'react-icons/hi'
import {MdPlaylistAdd} from 'react-icons/md'
import {AiOutlineClose} from 'react-icons/ai'
import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import ThemeContext from '../../context/ThemeContext'

import Header from '../Header'
import {
  MediaLogo,
  SideBarPara,
  HomeContainer,
  SideContainer,
  UnorderedList,
  ListElement,
  ListItem,
  BannerTitle,
  BannerLogo,
  BannerButton,
  CloseButton,
} from './styledComponent'
import './index.css'

const apiUrlStatusConstant = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {
    searchInput: '',
    videoList: [],
    apiStatus: apiUrlStatusConstant.initial,
    showBanner: true,
  }

  componentDidMount = () => {
    this.getData()
  }

  removeBanner = () => {
    this.setState({showBanner: false})
  }

  getData = async () => {
    this.setState({apiStatus: apiUrlStatusConstant.inProgress})
    const {searchInput} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/videos/all?search=${searchInput}`
    const option = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const fetchedData = await fetch(apiUrl, option)
    const data = await fetchedData.json()
    if (fetchedData.ok) {
      const updatedData = data.videos.map(eachVideo => ({
        channel: eachVideo.channel,
        id: eachVideo.id,
        publishedAt: eachVideo.published_at,
        thumbnailUrl: eachVideo.thumbnail_url,
        viewCount: eachVideo.view_count,
        title: eachVideo.title,
      }))
      console.log(updatedData)
      this.setState({
        videoList: updatedData,
        apiStatus: apiUrlStatusConstant.success,
      })
    } else {
      this.setState({
        apiStatus: apiUrlStatusConstant.failure,
      })
    }
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderApiData = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiUrlStatusConstant.success:
        return this.renderSuccess()
      case apiUrlStatusConstant.failure:
        return this.renderFailure()
      case apiUrlStatusConstant.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  renderSideContainer = isDark => {
    console.log(isDark)
    const color = isDark ? '#606060' : '#383838'
    const bgColorForListElement = isDark ? '#424242' : '#f1f5f9'

    return (
      <SideContainer width={25} isDark={isDark} height={80}>
        <UnorderedList>
          <Link className="link-style" to="/">
            <ListElement bgColor={bgColorForListElement}>
              <IoMdHome color="red" />
              <ListItem isDark={isDark} fontWeight="bold">
                Home
              </ListItem>
            </ListElement>
          </Link>
          <Link className="link-style" to="/trending">
            <ListElement>
              <HiFire color={color} />
              <ListItem isDark={isDark}>Trending</ListItem>
            </ListElement>
          </Link>
          <Link className="link-style" to="/gaming">
            <ListElement>
              <IoMdHome color={color} />
              <ListItem isDark={isDark}>Gaming</ListItem>
            </ListElement>
          </Link>
          <Link className="link-style" to="/saved-videos">
            <ListElement>
              <MdPlaylistAdd color={color} />
              <ListItem isDark={isDark}>Saved Videos</ListItem>
            </ListElement>
          </Link>
        </UnorderedList>
        <div>
          <SideBarPara isDark={isDark} className="contact-us">
            CONTACT US
          </SideBarPara>
          <div>
            <MediaLogo
              className="media-logo"
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
              alt="facebook logo"
            />
            <MediaLogo
              className="media-logo"
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
              alt="twitter logo"
            />
            <MediaLogo
              className="media-logo"
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
              alt="linked in logo"
            />
          </div>
          <SideBarPara isDark={isDark} className="contact-us">
            Enjoy! Now to see your channels and recommendations!
          </SideBarPara>
        </div>
      </SideContainer>
    )
  }

  renderBanner = isDark => {
    const bannerImage =
      'https://assets.ccbp.in/frontend/react-js/nxt-watch-banner-bg.png'
    const bannerLogo = isDark
      ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'

    return (
      <SideContainer width={75} height={80}>
        <HomeContainer justifyContent="space-between" bgImage={bannerImage}>
          <div>
            <BannerLogo src={bannerLogo} alt="nxt watch logo" />
            <BannerTitle>
              Buy Nxt Watch Premium prepaid plans with <br /> UPI
            </BannerTitle>
            <BannerButton type="button">GET IT NOW</BannerButton>
          </div>
          <CloseButton
            data-testid="close"
            onClick={this.removeBanner}
            type="button"
          >
            <AiOutlineClose />
          </CloseButton>
        </HomeContainer>
      </SideContainer>
    )
  }

  render() {
    const {showBanner} = this.state
    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDark} = value

          return (
            <>
              <Header />
              <HomeContainer>
                {this.renderSideContainer(isDark)}
                {showBanner && this.renderBanner()}
              </HomeContainer>
            </>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default Home
