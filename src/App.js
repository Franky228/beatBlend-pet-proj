import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Merch from './pages/Merch';
import Vynil from './pages/Vynil';
import CDs from './pages/CDs';
import Artist from './pages/Artist';
import Album from './pages/Album';

import './scss/app.scss';

import Header from './components/Header';
import AudioPlayer from './components/AudioPlayer';

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/merch" element={<Merch />} />
          <Route path="/vynil" element={<Vynil />} />
          <Route path="/cds" element={<CDs />} />
          <Route path="/artist/*" element={<Artist />} />
          <Route path="/album/*" element={<Album />} />
        </Routes>
      </div>
      {/* <div className="about-us"></div> */}
      <AudioPlayer />
    </div>
  );
}

export default App;
