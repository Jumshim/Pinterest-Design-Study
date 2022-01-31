/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import React from 'react';
import Header from './components/Header';
import Content from './components/Content';

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

function App() {
  
  return (
    <div css={mainCss}>
      <Header/>
      <Content/>
    </div>
  );
}

export default App;