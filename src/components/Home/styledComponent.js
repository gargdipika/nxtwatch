import styled from 'styled-components/macro'

export const HomeContainer = styled.div`
  display: flex;
  background-image: url(${props => props.bgImage});
  background-size: 100% 100%;
  justify-content: ${props => props.justifyContent};
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
  padding-left: 20px;
`
export const SideContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: ${props => props.height}vw;
  padding-top: 20px;
  padding-right: 0;
  width: ${props => props.width}vw;
  padding-top: 0;
  background-color: ${props => (props.isDark === true ? '#181818' : '#ffffff')};
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
  margin-top: 20px;
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
`
export const CloseButton = styled.button`
  border: none;
  background-color: transparent;
  align-self: flex-start;
  margin: 20px;
  cursor: pointer;
`
