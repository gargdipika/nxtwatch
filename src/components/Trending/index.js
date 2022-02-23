import {Link} from 'react-router-dom'
import {IoMdHome} from 'react-icons/io'
import {HiFire} from 'react-icons/hi'
import {MdPlaylistAdd} from 'react-icons/md'
import {formatDistanceToNow} from 'date-fns'

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
  RightSideBottomContainer,
  VideoUnorderedList,
  VideoThumbNail,
  VideoListItem,
  TextContainer,
  Title,
  Text,
  EmptyViewImage,
  HeadingFail,
  RetryButton,
  Reason,
  EmptyViewContainer,
  TopContainer,
  LogoElement,
} from './styledComponent'

const apiUrlStatusConstant = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Trending extends Component {
  state = {
    videoList: [],
    apiStatus: apiUrlStatusConstant.initial,
  }

  componentDidMount = () => {
    this.getData()
  }

  renderSideContainer = isDark => {
    console.log(isDark)
    const color = isDark ? '#606060' : '#383838'
    const bgColorForListElement = isDark ? '#424242' : '#f1f5f9'

    return (
      <SideContainer
        width={20}
        isDark={isDark}
        height={80}
        justifyContent="space-between"
      >
        <UnorderedList>
          <Link className="link-style" to="/">
            <ListElement>
              <IoMdHome color={color} />
              <ListItem isDark={isDark}>Home</ListItem>
            </ListElement>
          </Link>
          <Link className="link-style" to="/trending">
            <ListElement bgColor={bgColorForListElement}>
              <HiFire color="red" />
              <ListItem isDark={isDark} fontWeight="bold">
                Trending
              </ListItem>
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

  getData = async () => {
    this.setState({apiStatus: apiUrlStatusConstant.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/videos/trending'
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

  renderEmptyView = isDark => {
    const onClickRetry = () => {
      this.setState({apiStatus: apiUrlStatusConstant.inProgress}, this.getData)
    }
    return (
      <EmptyViewContainer>
        <EmptyViewImage
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
          alt="no videos"
        />
        <HeadingFail>No Search results found</HeadingFail>
        <Reason>Try different key words or remove search filter</Reason>
        <RetryButton onClick={onClickRetry} type="button">
          Retry
        </RetryButton>
      </EmptyViewContainer>
    )
  }

  renderFailure = isDark => {
    const onClickRetry = () => {
      this.setState({apiStatus: apiUrlStatusConstant.inProgress}, this.getData)
    }
    const url = isDark
      ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'
    return (
      <EmptyViewContainer>
        <EmptyViewImage src={url} alt="failure view" />
        <HeadingFail>Oops! Something Wen Wrong</HeadingFail>
        <Reason>
          We are having some trouble to complete your request. Please try again
        </Reason>
        <RetryButton onClick={onClickRetry} type="button">
          Retry
        </RetryButton>
      </EmptyViewContainer>
    )
  }

  renderSuccess = isDark => {
    const {videoList} = this.state
    const isEmpty = videoList.length === 0

    return (
      <VideoUnorderedList>
        {isEmpty
          ? this.renderEmptyView(isDark)
          : videoList.map(eachVideo => {
              const timeDifference = formatDistanceToNow(
                new Date(eachVideo.publishedAt),
              )
              const {id} = eachVideo
              const titleColor = isDark ? '#ffffff' : '#212121'
              const textColor = isDark ? '#94a3b8' : '#64748b'

              return (
                <Link className="link-style" to={`/videos/${id}`}>
                  <VideoListItem key={eachVideo.id}>
                    <VideoThumbNail
                      src={eachVideo.thumbnailUrl}
                      alt="video thumbnail"
                    />
                    <TextContainer>
                      <Title color={titleColor}>{eachVideo.title}</Title>
                      <Text color={textColor}>{eachVideo.channel.name}</Text>
                      <Text color={textColor}>
                        {eachVideo.viewCount} views {timeDifference} ago
                      </Text>
                    </TextContainer>
                  </VideoListItem>
                </Link>
              )
            })}
      </VideoUnorderedList>
    )
  }

  renderApiData = isDark => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiUrlStatusConstant.success:
        return this.renderSuccess(isDark)
      case apiUrlStatusConstant.failure:
        return this.renderFailure(isDark)
      case apiUrlStatusConstant.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  renderTop = isDark => {
    const backgroundColor = isDark ? '#0f0f0f' : '#f8fafc'
    return (
      <TopContainer>
        <LogoElement>
          <HiFire />
        </LogoElement>
      </TopContainer>
    )
  }

  render() {
    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDark} = value
          const backgroundColor = isDark ? '#0f0f0f' : '#f8fafc'
          return (
            <>
              <Header />
              <HomeContainer alignItem="flex-start">
                {this.renderSideContainer(isDark)}
                <SideContainer
                  justifyContent="flex-start"
                  width={80}
                  height={80}
                >
                  {this.renderTop(isDark)}
                  <RightSideBottomContainer bgColor={backgroundColor}>
                    {this.renderApiData(isDark)}
                  </RightSideBottomContainer>
                </SideContainer>
              </HomeContainer>
            </>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default Trending
