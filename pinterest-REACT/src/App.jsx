/** @jsxRuntime classic */
/** @jsx jsx */
import {jsx, css} from '@emotion/react';
import React from 'react';
import Header from './components/Header';
import Content from './components/Content';
import {LoginBox, SignupBox} from './Account';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

const mainCss = css`
  display: grid;
  width: 100%;
  height: 100vh;
  grid-template-areas:
    'head'
    'body';
  grid-template-rows: 80px auto;
  grid-template-columns: 1fr;
  grid-column-gap: 15px;
`;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {img: []};
    this.updateImages = this.updateImages.bind(this);
  }

  updateImages(images) {
    this.setState({img: images});
  }

  render() {
    return (
      <BrowserRouter>
        <div css={mainCss}>
          <Header changeImg={this.updateImages} />
          <Routes>
            <Route
              path="/"
              element={<Content img={this.state.img} changeImg={this.updateImages} />}
            />
            <Route path="/login" element={<LoginBox />} />
            <Route path="/signup" element={<SignupBox />}/>
          </Routes>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
