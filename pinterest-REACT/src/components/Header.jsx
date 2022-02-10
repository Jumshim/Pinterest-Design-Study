/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react'
import React from 'react';
import BASE_URL from '../utils';

//Make personal pinterest board for website

const headerDivCss = css`
  display: flex;
  align-items: center;
  padding: 20px;
`;

const pinterestIconCss = css`
 border-radius: 50%;
 padding: 5px;
 &:hover { 
   background-color: #f0f0f0;
 }
`;

const buttonCss = css`
 padding: 15px 18px;
 text-align: center;
 border-radius: 30px;
 text-decoration: none;
 font-weight: 520;
`;

const homeButtonCss = css`
 ${buttonCss}
 background-color: black;
 color: white;
`;

const todayButtonCss = css`
 ${buttonCss}
 color: black;
 &:hover {
   background-color: #f0f0f0;
 }
`;

const searchBarContainerCss = css`
 display: flex;
 flex: 1;
 align-items: center;
`;

const searchBarCss = css` 
  background-color: #f0f0f0;
  border: none;
  padding: 15px 50px;
  text-align: left;
  border-radius: 30px;
  width: 100%;
  background-image: url("https://www.pngall.com/wp-content/uploads/8/Vector-Search-PNG-Free-Download.png");
  background-repeat: no-repeat;
  background-position: left center;
  background-size: 20px 20px;
  background-position-x: 15px;
`;

const profileButtonsCss = css`
  border-radius: 50%;
  padding: 7px 9px;
  margin: 0px 2px;
  &:hover {
    background-color: #f0f0f0;
  }
`;

const NavigationButtons = ({nav}) => {
  return <div css={headerDivCss}> 
    <a href="/temp">
      <img src="https://i.pinimg.com/originals/d3/d1/75/d3d175e560ae133f1ed5cd4ec173751a.png" height="35" width="35" css={pinterestIconCss}></img>
    </a>
    <a href="/temp" css={homeButtonCss}>
      <span> Home </span>
    </a>
    <a href="/temp" css={todayButtonCss}>
      <span> Today </span>
    </a>
  </div>
};

//debouncing but with wait(3000) so you're not spamming

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    fetch(`${BASE_URL}/images?searchQuery=${this.state.value}`)
      .then(data => data.json()) 
      .then(searchedImages => {
        this.props.changeImg(searchedImages);
      });
    event.preventDefault();
  }

  render() {
    return <form onSubmit={this.handleSubmit} css={searchBarContainerCss}>
        <input type="text" value={this.state.value} onChange={this.handleChange} id="searchBar" placeholder="Search" css={searchBarCss}></input>
      </form>
  }
}

const ProfileButtons = ({prof}) => {
  return <div css={headerDivCss}>
    <a href="/temp" css={profileButtonsCss}>
      <img src="https://icon-library.com/images/notification-bell-icon/notification-bell-icon-6.jpg" height="25" width="25"></img>
    </a>
    <a href="/temp" css={profileButtonsCss}>
      <img src="https://cdn2.iconfinder.com/data/icons/gaming-and-beyond-part-2-1/80/Message_gray-512.png" height="25" width="25"></img>
    </a>
    <a href="/temp" css={profileButtonsCss}>
      <img src = "https://i.pinimg.com/originals/5f/64/17/5f6417000d38033f6443f0bc3d1c67c8.jpg" width="25" height="25" css={{borderRadius: "50%"}}></img>
    </a>
    <a href="/temp" css={profileButtonsCss}>
      <img src = "https://cdn1.iconfinder.com/data/icons/general-ui-outlined-thick/24/chevron-down-512.png" width="15" height="15"></img>
    </a>
  </div>
};

const headerCss = css`
  background-color: white;
  width: 100%;
  height: 80px;
  display: flex;
  grid-area: head;
  position: sticky;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 8px 8px -8px;
  transition: box-shadow: 300ms ease-in-out 0s;
`

/**
 * TODO: Find out when scroll, add drop shadow when scroll
 */
class Header extends React.Component {
  render(){
    return <div css={headerCss}>
      <NavigationButtons/>
      <SearchBar changeImg={this.props.changeImg}/>
      <ProfileButtons/>
    </div>
  }
}

export default Header;