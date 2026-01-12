import { useRef, useState } from 'react';
import Draggable from 'react-draggable';
import '98.css';
import './App.css';
import Terminal from './components/Terminal';

function App() {
  // CV Window state
  const nodeRef = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isClosed, setIsClosed] = useState(false);

  // Contacts Window state
  const contactsRef = useRef<HTMLDivElement>(null);
  const [isContactsExpanded, setIsContactsExpanded] = useState(false);
  const [isContactsMinimized, setIsContactsMinimized] = useState(false);
  const [isContactsClosed, setIsContactsClosed] = useState(true);
  const [emailCopied, setEmailCopied] = useState(false);

  // Posts Window state
  const postsRef = useRef<HTMLDivElement>(null);
  const [isPostsExpanded, setIsPostsExpanded] = useState(false);
  const [isPostsMinimized, setIsPostsMinimized] = useState(false);
  const [isPostsClosed, setIsPostsClosed] = useState(true);

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

  const handleContactsMinimize = () => {
    setIsContactsMinimized(true);
  };

  const handleContactsClose = () => {
    setIsContactsClosed(true);
  };

  const handleContactsMaximize = () => {
    setIsContactsExpanded(!isContactsExpanded);
  };

  const handlePostsMinimize = () => {
    setIsPostsMinimized(true);
  };

  const handlePostsClose = () => {
    setIsPostsClosed(true);
  };

  const handlePostsMaximize = () => {
    setIsPostsExpanded(!isPostsExpanded);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('robinogiacomo@gmail.com');
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
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
        <button
          className={`taskbar-item ${!isContactsMinimized && !isContactsClosed ? 'pressed' : ''}`}
          onClick={() => {
            if (isContactsClosed) {
              setIsContactsClosed(false);
            } else {
              setIsContactsMinimized(!isContactsMinimized);
            }
          }}
        >
          Contacts
        </button>
        <button
          className={`taskbar-item ${!isPostsMinimized && !isPostsClosed ? 'pressed' : ''}`}
          onClick={() => {
            if (isPostsClosed) {
              setIsPostsClosed(false);
            } else {
              setIsPostsMinimized(!isPostsMinimized);
            }
          }}
        >
          Posts
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
              {isExpanded ? <p>Here is my CV, you can download it with the download button</p> : <p>Here is my CV! Enlarge this window to see more</p>}
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
      {!isContactsMinimized && !isContactsClosed && (
        <Draggable handle=".title-bar" cancel=".title-bar-controls" nodeRef={contactsRef}>
          <div className={`window ${isContactsExpanded ? 'expanded' : ''}`} ref={contactsRef}>
            <div className="title-bar">
              <div className="title-bar-text">Contacts</div>
              <div className="title-bar-controls">
                <button aria-label="Minimize" onClick={handleContactsMinimize}></button>
                <button aria-label="Maximize" onClick={handleContactsMaximize}></button>
                <button aria-label="Close" onClick={handleContactsClose}></button>
              </div>
            </div>
            <div className="window-body">
              <p>Email: robinogiacomo@gmail.com</p>
              {emailCopied && <p>Email copied!</p>}
              <button onClick={handleCopyEmail}>Copy email to clipboard</button>
              <p>LinkedIn: Giacomo Robino</p>
              <button onClick={() => window.open('https://www.linkedin.com/in/giacomo-robino-4196ba62/', '_blank')}>
                Open LinkedIn profile
              </button>
            </div>
          </div>
        </Draggable>
      )}
      {!isPostsMinimized && !isPostsClosed && (
        <Draggable handle=".title-bar" cancel=".title-bar-controls" nodeRef={postsRef}>
          <div className={`window ${isPostsExpanded ? 'expanded' : ''}`} ref={postsRef}>
            <div className="title-bar">
              <div className="title-bar-text">Posts</div>
              <div className="title-bar-controls">
                <button aria-label="Minimize" onClick={handlePostsMinimize}></button>
                <button aria-label="Maximize" onClick={handlePostsMaximize}></button>
                <button aria-label="Close" onClick={handlePostsClose}></button>
              </div>
            </div>
            <div className="window-body">
              <fieldset>
                <legend>LLamapedia</legend>
                <p>A self-generating wiki framework that uses LLMs to automatically create encyclopedia-style pages, recursively expanding from seed topics.</p>
                <button onClick={() => window.open('https://grobino.substack.com/p/llamapedia', '_blank')}>
                  Read Post
                </button>
              </fieldset>
            </div>
          </div>
        </Draggable>
      )}
    </div>
  );
}

export default App;
