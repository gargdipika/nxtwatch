import styled from 'styled-components/macro'

export const HomeContainer = styled.div`
  display: flex;
  background-image: url(${props => props.bgImage});
  background-size: 100% 100%;
  justify-content: ${props => props.justifyContent};
  align-items: ${props => props.alignItem};
`

export const MediaLogo = styled.img`
  height: 35px;
  width: 35px;
  margin-left: 20px;
`

export const SideBarPara = styled.p`
  color: ${props => (props.isDark === true ? '#f4f4f4' : '#231f20')};
  font-weight: bold;
  margin-bottom: 30px;
  font-size: 20px;
  padding-left: 20px;
`
export const SideContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: ${props => props.justifyContent};
  min-height: ${props => props.height}vw;
  padding-top: 20px;
  padding-right: 0;
  width: ${props => props.width}vw;
  padding-top: 0;
  background-color: ${props => (props.isDark === true ? '#181818' : '#ffffff')};
  position: sticky;
`
export const UnorderedList = styled.ul`
  padding-left: 0;
  margin-left: 0;
`

export const ListElement = styled.li`
  display: flex;
  list-style: none;
  align-items: center;
  padding-left: 20px;
  background-color: ${props => props.bgColor};
`

export const ListItem = styled.p`
  margin-left: 20px;
  font-weight: ${props => props.fontWeight};
  color: ${props => (props.isDark === true ? '#ffffff' : '#383838')};
`
export const BannerTitle = styled.p`
  padding-left: 20px;
`
export const BannerLogo = styled.img`
  height: 35px;
  width: 150px;
  margin-top: 40px;
  padding-left: 20px;
`
export const BannerButton = styled.button`
  border: solid black 1px;
  color: black;
  background-color: transparent;
  height: 36px;
  width: 120px;
  margin-left: 20px;
  font-weight: bold;
  margin-bottom: 40px;
`
export const CloseButton = styled.button`
  border: none;
  background-color: transparent;
  align-self: flex-start;
  margin: 20px;
  margin-top: 40px;
  cursor: pointer;
`
export const RightSideBottomContainer = styled.div`
  width: 75vw;
  min-height: 100vh;
  background-color: ${props => props.bgColor};
  padding-left: 20px;
`
export const SearchBar = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
  height: 36px;
`
export const SearchInput = styled.input`
  height: 36px;
  outline: none;
  width: 30vw;
  border: solid 1px #d7dfe9;
  padding: 10px;
`

export const SearchButton = styled.button`
  height: 36px;
  width: 65px;
  background-color: transparent;
  border: solid 1px #d7dfe9;
  color: #909090;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
`
export const VideoListItem = styled.li`
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 20px;
  margin-top: 15px;
  width: 312px;
  height: 300px;
`

export const VideoThumbNail = styled.img`
  height: 150px;
  width: 312px;
`
export const VideoUnorderedList = styled.div`
  display: flex;
  flex-wrap: wrap;
`
export const DetailContainer = styled.div`
  display: flex;
`
export const Logo = styled.img`
  height: 40px;
  width: 40px;
  margin-top: 20px;
`
export const TextContainer = styled.div`
  margin-left: 20px;
  margin-top: 5px;
`
export const Title = styled.p`
  color: ${props => props.color};
  margin-top: 5px;
  margin-bottom: 5px;
`
