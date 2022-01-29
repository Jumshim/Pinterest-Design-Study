/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react'
import React from 'react';


const pinColumnCss = css`
  display: flex;
  flex-direction: column;
  width: 236px;
  margin: 0px 8px;
`

//put img links in express
//use fetch to see client vs server rendering and fetching

var imgLinks = [
  "https://i.pinimg.com/474x/b1/12/9f/b1129fe005256b5ecce51f00eb380fb5.jpg",
  "https://i.pinimg.com/474x/8a/ca/35/8aca3572037db6ba9e08dd4b8dd2a636.jpg",
  "https://i.pinimg.com/474x/c4/e3/58/c4e358ff46eb99d4e531122024f3b9e3.jpg",
  "https://i.pinimg.com/474x/31/46/06/3146067b6f9b116dcff0a89b16e833d5.jpg",
  "https://i.pinimg.com/474x/92/c4/29/92c4291853b7c174736dba34bfcaa4f6.jpg",
  "https://i.pinimg.com/474x/62/f6/7a/62f67abaf7f0f053af3db1c95389e8a8.jpg",
  "https://i.pinimg.com/474x/ab/27/0a/ab270a58e640248eaec63aaadd1f8d00.jpg",
  "https://i.pinimg.com/474x/8c/c9/cf/8cc9cfc58e0e9be8b8a1b2896bf7b2f5.jpg",
  "https://i.pinimg.com/474x/8f/9a/90/8f9a9047663d56abce4ab24f1869fdf4.jpg",
  "https://i.pinimg.com/474x/e1/a9/0e/e1a90e08fd8da9272aefbe7a8b7cd454.jpg",
  "https://i.pinimg.com/474x/dc/23/72/dc237292b4a7309efa0f163440464728.jpg",
  "https://i.pinimg.com/474x/9a/72/63/9a726355c84f1454657add71896a033c.jpg",
  "https://i.pinimg.com/474x/53/4f/a1/534fa148f0462a1a635ff9a266b15504.jpg",
  "https://i.pinimg.com/474x/a0/f5/5e/a0f55e5afaec5bc5d7e176e35e684260.jpg",
  "https://i.pinimg.com/474x/47/5b/00/475b0002bc687ec5adda7aceb8976068.jpg",
  "https://i.pinimg.com/736x/47/44/ce/4744cef700d5af33b3c6cf7d76f79040.jpg",
  "https://i.pinimg.com/474x/7a/e4/4b/7ae44b3de6fff971dd4a19f0753300ac.jpg",
  "https://i.pinimg.com/474x/ed/ef/8e/edef8e4744e189a2fd3d63bf965b4617.jpg",
  "https://i.pinimg.com/474x/30/82/a4/3082a47fa032a13b4a3891fca20704cf.jpg",
  "https://i.pinimg.com/474x/64/36/42/6436420c3d5fb7bd2491db81ded48d93.jpg",
  "https://i.pinimg.com/474x/16/e4/58/16e45850e26560028434af7b60cc0d3f.jpg",
  "https://i.pinimg.com/474x/8e/a3/6d/8ea36d7f7b6d88a236918a4735472054.jpg",
  "https://i.pinimg.com/474x/a0/14/48/a01448646c1f01b5e7a26e75511a7ac7.jpg"
];


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
  render(){
    return <div css={bodyCss}>
      <div css={pinColumnCss}>
        {imgLinks.slice(0, 5).map(link => <PinColumn url={link}/> )}
      </div>
      <div css={pinColumnCss}>
        {imgLinks.slice(5, 10).map(link => <PinColumn url={link}/> )}
      </div>
      <div css={pinColumnCss}>
        {imgLinks.slice(10, 15).map(link => <PinColumn url={link}/> )}
      </div>
      <div css={pinColumnCss}>
        {imgLinks.slice(15, 20).map(link => <PinColumn url={link}/> )}
      </div>
      <div css={pinColumnCss}>
        {imgLinks.slice(20, 25).map(link => <PinColumn url={link}/> )}
      </div>
    </div>
  }
}

export default Content;