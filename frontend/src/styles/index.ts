import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    color: #fff;
    background: #ebf2f5;
  }

  body, input, button, textarea {
    font: 600 18px Nunito, sans-serif;
  }

  .transition-enter {
    transform: translateX(100vh);
   z-index: 1;
  }

  .transition-enter.transition-enter-active {
    transform: translateX(0vh);
    transition: transform 600ms ease-out ;
  }
`;
