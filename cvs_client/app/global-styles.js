import { injectGlobal } from 'styled-components';

/* eslint no-unused-expressions: 0 */
injectGlobal`
  html,
  @font-face { 
    font-family: 'NanumBarunGothic'; 
    src: url('./NanumBarunGothic.otf'); 
    font-weight: medium;
  } 
  
  @font-face { 
    font-family: 'NanumBarunGothic'; 
    src: url('./NanumBarunGothicBold.otf'); 
    font-weight: bold;
  } 
  
  @font-face { 
    font-family: 'NanumBarunGothic'; 
    src: url('./NanumBarunGothicLight.otf'); 
    font-weight: lighter;
  } 
  
  @font-face { 
    font-family: 'NanumBarunGothic'; 
    src: url('./NanumBarunGothicUltraLight.otf'); 
    font-weight: 100;
  } 
   
  body {
    height: 100%;
    width: 100%;
  }

  body {
    font-family: Helvetica, 'NanumBarunGothic';
  }

  body.fontLoaded {
    font-family: Helvetica, 'NanumBarunGothic';
  }

  #app {
    background-color: #fafafa;
    min-height: 100%;
    min-width: 100%;
  }

  p,
  label {
    font-family: 'NanumBarunGothic';
  }
`;
