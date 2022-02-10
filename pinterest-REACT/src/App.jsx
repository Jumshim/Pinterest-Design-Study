/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import React from 'react';
import Header from './components/Header';
import Content from './components/Content';

//try to do users

const mainCss = css`
  display: grid;
  width: 100%;
  height: 100vh;
  grid-template-areas:
  "head"
  "body";
  grid-template-rows: 80px auto;
  grid-template-columns: 1fr;
  grid-column-gap: 15px;
`;


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {img: []};
    this.updateImages = this.updateImages.bind(this)
  }

  updateImages(images) {
    this.setState({img: images});
  }

  render() {
   return <div css={mainCss}>
      <Header changeImg={this.updateImages}/>
      <Content img={this.state.img} changeImg={this.updateImages}/>
    </div>
  } 
}

export default App;