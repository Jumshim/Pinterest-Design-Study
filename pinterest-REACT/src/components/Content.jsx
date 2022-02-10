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
    img: []
  };

  //derive state
  /**
   * 
   */
  handleScroll = async (e) => {
    const bottom = (e.target.scrollHeight - e.target.scrollTop) === e.target.clientHeight;
    if(bottom) {
        let imgId = 0;
        console.log(this.state.img);
        for(let i = 0; i < this.state.img.length; i++) {
          if(imgId < this.state.img[i].img_id) {
            imgId = this.state.img[i].img_id;
          }
        }
        console.log(imgId);
        fetch(`${BASE_URL}/images?imgId=${imgId}`)
          .then(data => data.json())
          .then(images => {
            this.setState({ img: [...this.state.img, ...images] })
          });
    }
  }

  componentDidMount() {
    console.log('component did mount');
    fetch(`${BASE_URL}/images`)
      .then(data => data.json())
      .then(imgLinks => this.setState({ img: imgLinks })) // fix
      .then(imgArray => console.log(imgArray));
  }
  // five nines - represent 99.999%
  // the uptime that you want during the year. Servers are not resilient to network faults
  // problems with scaling upwards or horizontally

  render(){
    let columns = [];
    for(let i = 0; i < 5; i++) {
      columns.push(
        <div css={pinColumnCss}>
          {this.state.img.filter((img, index) => index%5===i).map(link => <PinColumn url={link.URL} key={link.title}/> )}
        </div>
      )
    }
    return <div css={bodyCss} onScroll={this.handleScroll}>
      {columns};
    </div>
  }
}

export default Content;