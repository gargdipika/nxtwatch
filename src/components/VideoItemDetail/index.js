import {Link} from 'react-router-dom'
import ReactPlayer from 'react-player'
import {IoMdHome} from 'react-icons/io'
import {FaGamepad} from 'react-icons/fa'
import {HiFire} from 'react-icons/hi'
import {AiOutlineLike, AiOutlineDislike} from 'react-icons/ai'
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
  EmptyViewImage,
  HeadingFail,
  RetryButton,
  Reason,
  EmptyViewContainer,
  LoaderContainer,
  VideoItemDetailContainer,
  Title,
  MidContainer,
  Container,
  LikeButton,
  Text,
} from './styledComponent'

const apiUrlStatusConstant = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const sideBarContent = [
  {id: 0, icon: <IoMdHome />, title: 'Home', link: '/'},
  {id: 1, icon: <HiFire />, title: 'Trending', link: '/trending'},
  {id: 2, icon: <FaGamepad />, title: 'Gaming', link: '/gaming'},
  {
    id: 3,
    icon: <MdPlaylistAdd />,
    title: 'Saved Videos',
    link: '/saved-videos',
  },
]

class VideoItemDetail extends Component {
  state = {
    videoDetail: [],
    apiStatus: apiUrlStatusConstant.initial,
    isLike: false,
    isDisLike: false,
  }

  renderSuccess = (isDark, addToSaveVideos) => {
    const {videoDetail, isLike, isDisLike} = this.state
    const timeDifference = formatDistanceToNow(
      new Date(videoDetail.publishedAt),
    )
    const {videoUrl, title} = videoDetail
    const titleColor = isDark ? '#ffffff' : '#212121'
    const textColor = isDark ? '#94a3b8' : '#64748b'

    let LikeColor = ''
    if (isLike) {
      LikeColor = '#4f46e5'
    } else {
      LikeColor = isDark ? '#94a3b8' : '#64748b'
    }

    const onClickLike = () => {
      if (isDisLike === true) {
        this.setState(prevState => ({
          isLike: !prevState.isLike,
          isDisLike: false,
        }))
      } else {
        this.setState(prevState => ({isLike: !prevState.isLike}))
      }
    }

    let DislikeColor = ''
    if (isDisLike) {
      DislikeColor = '#4f46e5'
    } else {
      DislikeColor = isDark ? '#94a3b8' : '#64748b'
    }

    const onClickDisLike = () => {
      if (isLike === true) {
        this.setState(prevState => ({
          isLike: false,
          isDisLike: !prevState.isDisLike,
        }))
      } else {
        this.setState(prevState => ({isDisLike: !prevState.isDisLike}))
      }
    }

    const onClickSave = () => {
      addToSaveVideos(videoDetail)
    }

    return (
      <VideoItemDetailContainer>
        <ReactPlayer url={videoUrl} width={1000} height={500} controls />
        <Title color={titleColor}>{title}</Title>
        <MidContainer>
          <Text color={textColor}>
            {videoDetail.viewCount} views . {timeDifference} ago
          </Text>
          <MidContainer>
            <MidContainer onClick={onClickLike}>
              <AiOutlineLike color={LikeColor} />
              <LikeButton color={LikeColor} type="button">
                Like
              </LikeButton>
            </MidContainer>
            <MidContainer onClick={onClickDisLike}>
              <AiOutlineDislike color={DislikeColor} />
              <LikeButton color={DislikeColor} type="button">
                Dislike
              </LikeButton>
            </MidContainer>
            <MidContainer onClick={onClickSave}>
              <MdPlaylistAdd color={textColor} />
              <LikeButton type="button" color={textColor}>
                Save
              </LikeButton>
            </MidContainer>
          </MidContainer>
        </MidContainer>
      </VideoItemDetailContainer>
    )
  }

  componentDidMount = () => {
    this.getData()
  }

  renderSideContainer = isDark => (
    <SideContainer
      width={20}
      isDark={isDark}
      height={80}
      justifyContent="space-between"
    >
      <nav>
        <UnorderedList>
          {sideBarContent.map(eachContent => {
            const {icon} = eachContent

            return (
              <Link className="link-style" to={eachContent.link}>
                <ListElement key={eachContent.id}>
                  {icon}
                  <ListItem>{eachContent.title}</ListItem>
                </ListElement>
              </Link>
            )
          })}
        </UnorderedList>
      </nav>
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

  getData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    console.log(id)
    this.setState({apiStatus: apiUrlStatusConstant.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const apiVideoItemUrl = `https://apis.ccbp.in/videos/${id}`
    const option = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const fetchedVideoItem = await fetch(apiVideoItemUrl, option)
    const videoItemData = await fetchedVideoItem.json()
    if (fetchedVideoItem.ok) {
      const updatedVideoData = {
        channel: videoItemData.video_details.channel,
        description: videoItemData.video_details.description,
        id: videoItemData.video_details.id,
        publishedAt: videoItemData.video_details.published_at,
        thumbnailUrl: videoItemData.video_details.thumbnail_url,
        viewCount: videoItemData.video_details.view_count,
        title: videoItemData.video_details.title,
        videoUrl: videoItemData.video_details.video_url,
      }
      this.setState({
        videoDetail: updatedVideoData,
        apiStatus: apiUrlStatusConstant.success,
      })
    } else {
      this.setState({
        apiStatus: apiUrlStatusConstant.failure,
      })
    }
  }

  renderLoader = isDark => {
    const color = isDark ? '#ffffff' : '#000000'
    return (
      <LoaderContainer data-testid="loader">
        <Loader type="ThreeDots" color={color} height="50" width="50" />
      </LoaderContainer>
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
        <HeadingFail>Oops! Something Went Wrong</HeadingFail>
        <Reason>
          We are having some trouble to complete your request. Please try again
        </Reason>
        <RetryButton onClick={onClickRetry} type="button">
          Retry
        </RetryButton>
      </EmptyViewContainer>
    )
  }

  renderApiData = (isDark, addToSaveVideos) => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiUrlStatusConstant.success:
        return this.renderSuccess(isDark, addToSaveVideos)
      case apiUrlStatusConstant.failure:
        return this.renderFailure(isDark)
      case apiUrlStatusConstant.inProgress:
        return this.renderLoader(isDark)
      default:
        return null
    }
  }

  render() {
    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDark, addToSaveVideos} = value
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
                  <RightSideBottomContainer
                    data-testid="trending"
                    bgColor={backgroundColor}
                  >
                    {this.renderApiData(isDark, addToSaveVideos)}
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

export default VideoItemDetail
