import { useRef, useState } from 'react';
import Draggable from 'react-draggable';
import '98.css';
import './App.css';
import Terminal from './components/Terminal';

function App() {
  const nodeRef = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isClosed, setIsClosed] = useState(false);

  const handleMinimize = () => {
    setIsMinimized(true);
  };

  const handleClose = () => {
    setIsClosed(true);
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/assets/cv.pdf';
    link.download = 'Giacomo_Robino_CV.pdf';
    link.click();
  };

  const handleMaximize = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="App">
      <div className="header-bar">
        <button
          className={`taskbar-item ${!isMinimized && !isClosed ? 'pressed' : ''}`}
          onClick={() => {
            if (isClosed) {
              setIsClosed(false);
            } else {
              setIsMinimized(!isMinimized);
            }
          }}
        >
          CV - Giacomo Robino
        </button>
      </div>
      {!isMinimized && !isClosed && (
        <Draggable handle=".title-bar" cancel=".title-bar-controls" nodeRef={nodeRef}>
          <div className={`window ${isExpanded ? 'expanded' : ''}`} ref={nodeRef}>
            <div className="title-bar">
              <div className="title-bar-text">Giacomo Robino</div>
              <div className="title-bar-controls">
                <button aria-label="Minimize" onClick={handleMinimize}></button>
                <button aria-label="Maximize" onClick={handleMaximize}></button>
                <button aria-label="Close" onClick={handleClose}></button>
              </div>
            </div>
            <div className="window-body">
              {isExpanded ? <p>Here is my CV, you can query it using the CLI, or download it with the download button</p> : <p>Here is my CV! Enlarge this window to see more</p>}
              {isExpanded && (
                <div className="expanded-content">
                  <Terminal />
                </div>
              )}
              <button onClick={handleDownload}>Download CV</button>
            </div>
          </div>
        </Draggable>
      )}
    </div>
  );
}

export default App;
