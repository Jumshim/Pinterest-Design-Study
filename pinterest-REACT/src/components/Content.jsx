/** @jsxRuntime classic */
/** @jsx jsx */
import {jsx, css} from '@emotion/react';
import React from 'react';
import BASE_URL from '../utils';

const pinColumnCss = css`
  display: flex;
  flex-direction: column;
  width: 236px;
  margin: 0px 8px;
`;

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

const appFetch = (url, options) => {
  return fetch(url, {credentials: "include", ...options});
}

const PinColumn = ({url}) => {
  return <img src={url} css={imgCss}></img>;
};

class Content extends React.Component {
  handleScroll = async (e) => {
    const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom) {
      let imgId = 0;
      console.log(this.props.img);
      for (let i = 0; i < this.props.img.length; i++) {
        if (imgId < this.props.img[i].img_id) {
          imgId = this.props.img[i].img_id;
        }
      }
      console.log(imgId);
      fetch(`${BASE_URL}/images?imgId=${imgId}`, { credentials: "include" })
        .then((data) => data.json())
        .then((images) => {
          this.props.changeImg([...this.props.img, ...images]);
        });
    }
  };

  componentDidMount() {
    console.log('component did mount');
    //do this for every single fetch; should make a function for fetch that always includes credentials
    //every fetch you have should catch the 302 response
    //use libraries like axios so that whenever a 302 error happens, redo lines 62-65

    //302 is done server side, when you want to return all of the code it just rerenders. usually you get an unauthorized
    fetch(`${BASE_URL}/images`, { credentials: "include" })
      .then((response) => {
        console.log(`response.status = ${response.status}`);
        if(response.status === 401) {
          response.json().then((resp) => {
            window.location.href = resp.url;
          })
        }
        return response.json()
      })
      .then((imgLinks) => this.props.changeImg(imgLinks))
      .then((imgArray) => console.log(imgArray))
  }

  render() {
    let columns = [];
    for (let i = 0; i < 5; i++) {
      columns.push(
        <div css={pinColumnCss}>
          {this.props.img
            .filter((img, index) => index % 5 === i)
            .map((link) => (
              <PinColumn url={link.URL} key={link.title} />
            ))}
        </div>,
      );
    }
    return (
      <div css={bodyCss} onScroll={this.handleScroll}>
        {columns}
      </div>
    );
  }
}

export default Content;
