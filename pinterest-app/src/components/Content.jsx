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
    img: []
  };

  componentDidMount() {
    console.log('component did mount');
    fetch(`${BASE_URL}/images`)
      .then(data => data.json())
      .then(imgLinks => this.setState({ img: imgLinks }));
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
  render(){
    console.log(this.state.img);
    return <div css={bodyCss}>
      <div css={pinColumnCss}>
        {this.state.img.slice(0, 5).map(link => <PinColumn url={link} key={link}/> )}
      </div>
      <div css={pinColumnCss}>
        {this.state.img.slice(5, 10).map(link => <PinColumn url={link} key={link}/> )}
      </div>
      <div css={pinColumnCss}>
        {this.state.img.slice(10, 15).map(link => <PinColumn url={link} key={link}/> )}
      </div>
      <div css={pinColumnCss}>
        {this.state.img.slice(15, 20).map(link => <PinColumn url={link} key={link}/> )}
      </div>
      <div css={pinColumnCss}>
        {this.state.img.slice(20, 25).map(link => <PinColumn url={link} key={link}/> )}
      </div>
    </div>
  }
}

export default Content;