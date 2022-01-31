/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react'
import React from 'react';
import BASE_URL from '../utils';

const pinColumnCss = css`
  display: flex;
  flex-direction: column;
  width: 236px;
  margin: 0px 8px;
`

//put img links in express
//use fetch to see client vs server rendering and fetching

const bodyCss = css`
  display: flex;
  grid-area: body;
  flex-direction: row;
  margin: 0px 80px;
  justify-content: center;
  overflow: scroll;
  scrollbar-width: none;
`;

const imgCss = css`
  border-radius: 15px;
  margin-bottom: 10px;
  width: 100%;
`;

const PinColumn = ({url}) => {
  return <img src={url} css={imgCss}></img>
};

class Content extends React.Component {
  state = {
    img: [],
    page: 2
  };

  handleScroll = async (e) => {
    const bottom = (e.target.scrollHeight - e.target.scrollTop) === e.target.clientHeight;
    if(bottom) {
        fetch(`${BASE_URL}/images?tagID=${this.state.page}`)
          .then(data => data.json())
          .then(imgLinks => {
            this.setState({ img: [...this.state.img, ...imgLinks], page: this.state.page + 1 })
          });
    }
  }

  componentDidMount() {
    console.log('component did mount');
    fetch(`${BASE_URL}/images`)
      .then(data => data.json())
      .then(imgLinks => this.setState({ img: imgLinks }))
      .then(imgArray => console.log(imgArray));
  }
  // five nines - represent 99.999%
  // the uptime that you want during the year. Servers are not resilient to network faults
  // problems with scaling upwards or horizontally
  /**
   * TODO
   * can you make this more generic? A function, a better for loop, etc... a lot of repeated stuff, but we want to be
   * good coders :)
   * "dry" - don't repeat yourself
   * common term in computer science / industry
   * "you want to dry up your code after making it"
   */

  /**
   * images in a sqlite server and get data from that
   * research pagination more
   * how to implement pagination in this server?
   * whatever we find interesting, we will do that :)
   * @returns 
   */

  /**
   * TODO: Pagination in a SQL query
   * Reuse table design from last time
   * Run the table schema by herk b4 implementing
   * for credit: cursor based
   * @returns 
   */
  render(){
    return <div css={bodyCss} onScroll={this.handleScroll}>
      <div css={pinColumnCss}>
        {this.state.img.filter((img, index) => index%5===0).map(link => <PinColumn url={link.URL} key={link.URL}/> )}
      </div>
      <div css={pinColumnCss}>
        {this.state.img.filter((img, index) => index%5===1).map(link => <PinColumn url={link.URL} key={link.URL}/> )}
      </div>
      <div css={pinColumnCss}>
        {this.state.img.filter((img, index) => index%5===2).map(link => <PinColumn url={link.URL} key={link.URL}/> )}
      </div>
      <div css={pinColumnCss}>
        {this.state.img.filter((img, index) => index%5===3).map(link => <PinColumn url={link.URL} key={link.URL}/> )}
      </div>
      <div css={pinColumnCss}>
        {this.state.img.filter((img, index) => index%5===4).map(link => <PinColumn url={link.URL} key={link.URL}/> )}
      </div>
    </div>
  }
}

export default Content;