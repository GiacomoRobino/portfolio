import { useRef, useState } from 'react';
import Draggable from 'react-draggable';
import '98.css';
import './App.css';
import Terminal from './components/Terminal';

function App() {
  const nodeRef = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);

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
      <Draggable handle=".title-bar" nodeRef={nodeRef}>
        <div className={`window ${isExpanded ? 'expanded' : ''}`} ref={nodeRef}>
          <div className="title-bar">
            <div className="title-bar-text">Giacomo Robino</div>
            <div className="title-bar-controls">
              <button aria-label="Minimize"></button>
              <button aria-label="Maximize" onClick={handleMaximize}></button>
              <button aria-label="Close"></button>
            </div>
          </div>
          <div className="window-body">
            <p>Welcome to my portfolio!</p>
            {isExpanded && (
              <div className="expanded-content">
                <Terminal />
              </div>
            )}
            <button onClick={handleDownload}>Download CV</button>
          </div>
        </div>
      </Draggable>
    </div>
  );
}

export default App;
