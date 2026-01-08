import React from 'react';
import '98.css';
import './App.css';

function App() {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/assets/cv.pdf';
    link.download = 'Giacomo_Robino_CV.pdf';
    link.click();
  };

  return (
    <div className="App">
      <div className="window">
        <div className="title-bar">
          <div className="title-bar-text">Giacomo Robino</div>
          <div className="title-bar-controls">
            <button aria-label="Minimize"></button>
            <button aria-label="Maximize"></button>
            <button aria-label="Close"></button>
          </div>
        </div>
        <div className="window-body">
          <p>Welcome to my portfolio!</p>
          <button onClick={handleDownload}>Download CV</button>
        </div>
      </div>
    </div>
  );
}

export default App;
