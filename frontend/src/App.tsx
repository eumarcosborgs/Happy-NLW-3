import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Routes from './routes';

import 'leaflet/dist/leaflet.css';
import GlobalStyle from './styles';


const App: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
      <GlobalStyle />
    </>
  );
}

export default App;
