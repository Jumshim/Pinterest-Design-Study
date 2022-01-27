/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import React from 'react';
import Header from './components/header';

/** different lvls of abstr.
 * sometimes over abstract
 * can think of everything 1 piece at a time
 */

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

const contentCss = css`
  display: flex;
  flex-direction: column;
  width: 236px;
`

var imgLinks = [
  "https://i.pinimg.com/474x/b1/12/9f/b1129fe005256b5ecce51f00eb380fb5.jpg",
  "https://i.pinimg.com/474x/8a/ca/35/8aca3572037db6ba9e08dd4b8dd2a636.jpg",
  "https://i.pinimg.com/474x/c4/e3/58/c4e358ff46eb99d4e531122024f3b9e3.jpg",
  "https://i.pinimg.com/474x/31/46/06/3146067b6f9b116dcff0a89b16e833d5.jpg",
  "https://i.pinimg.com/474x/92/c4/29/92c4291853b7c174736dba34bfcaa4f6.jpg"
];

const bodyCss = css`
  display: grid;
  grid-area: body;
  grid-template-colmns: subgrid;
`;

const PinColumn = ({url}) => {
  return <img src={url} width="100%"></img>
};

class Content extends React.Component {
  render(){
    return <div>
      <div css={contentCss}>
        {imgLinks.map(link => <PinColumn url={link}/> )}
      </div>
      <div css={contentCss}>
        {imgLinks.map(link => <PinColumn url={link}/> )}
      </div>
      <div css={contentCss}>
        {imgLinks.map(link => <PinColumn url={link}/> )}
      </div>
      <div css={contentCss}>
        {imgLinks.map(link => <PinColumn url={link}/> )}
      </div>
      <div css={contentCss}>
        {imgLinks.map(link => <PinColumn url={link}/> )}
      </div>
    </div>
  }
}

function App() {
  return (
    <div css={mainCss}>
      <Header/>
      <Content/>
    </div>
  );
}

export default App;